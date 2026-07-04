"use client";

import { useEffect, useRef, useState } from "react";
import { MotionValue, useMotionValueEvent, motion, useVelocity, useSpring, useTransform } from "framer-motion";
import { FLAVORS, Flavor } from "@/config/flavors";
import BubbleWatermarkMask from "./BubbleWatermarkMask";

interface BobaTeaHeroProps {
  selectedFlavor: Flavor;
  scrollYProgress: MotionValue<number>;
}

export default function BobaTeaHero({ selectedFlavor, scrollYProgress }: BobaTeaHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const firstFrameImgRef = useRef<HTMLImageElement | null>(null);

  // Crossfade transition refs
  const lastDrawnImageRef = useRef<HTMLImageElement | null>(null);
  const crossfadeSourceRef = useRef<HTMLImageElement | null>(null);
  const crossfadeProgressRef = useRef<number>(1.0);

  const [isLoading, setIsLoading] = useState(true);
  const [loadPercentage, setLoadPercentage] = useState(0);
  const [isPreloaded, setIsPreloaded] = useState(false);

  // Scroll Velocity to drive Spring Tilt and Jiggle physics
  const scrollVelocity = useVelocity(scrollYProgress);
  
  // Spring parameters to smooth the velocity reaction
  const springVelocity = useSpring(scrollVelocity, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001
  });

  // Map velocity to rotation and horizontal translation for ripple/tilt effect
  const jiggleY = useTransform(springVelocity, [-0.5, 0.5], [-20, 20]);
  const tiltRotate = useTransform(springVelocity, [-0.5, 0.5], [-3, 3]);

  // Fade out canvas cup when scrolling into the Ending Screen (progress 0.94 to 0.96)
  const canvasOpacity = useTransform(scrollYProgress, [0.94, 0.96], [1, 0]);

  // Draw Specific Image on Canvas with COVER scaling
  const drawSpecificImage = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas || !img || !img.complete) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Get source dimensions dynamically
    const imgWidth = img.naturalWidth || img.width || 1280;
    const imgHeight = img.naturalHeight || img.height || 720;

    const clientWidth = canvas.width / (window.devicePixelRatio || 1);
    const clientHeight = canvas.height / (window.devicePixelRatio || 1);

    // Cover scaling calculation based on source dimensions
    const scale = Math.max(clientWidth / imgWidth, clientHeight / imgHeight);
    const drawWidth = imgWidth * scale;
    const drawHeight = imgHeight * scale;

    // Center offsets
    const dx = (clientWidth - drawWidth) / 2;
    const dy = (clientHeight - drawHeight) / 2;

    const dpr = window.devicePixelRatio || 1;

    // Implement cinematic crossfade between previous loaded flavor and current flavor
    if (crossfadeSourceRef.current && crossfadeProgressRef.current < 1.0) {
      // 1. Draw old image with alpha
      ctx.globalAlpha = 1.0 - crossfadeProgressRef.current;
      ctx.drawImage(
        crossfadeSourceRef.current,
        0,
        0,
        imgWidth,
        imgHeight,
        dx * dpr,
        dy * dpr,
        drawWidth * dpr,
        drawHeight * dpr
      );

      // 2. Draw new image on top with alpha
      ctx.globalAlpha = crossfadeProgressRef.current;
      ctx.drawImage(
        img,
        0,
        0,
        imgWidth,
        imgHeight,
        dx * dpr,
        dy * dpr,
        drawWidth * dpr,
        drawHeight * dpr
      );

      // Reset alpha
      ctx.globalAlpha = 1.0;
    } else {
      // Draw normal target image
      ctx.drawImage(
        img,
        0,
        0,
        imgWidth,
        imgHeight,
        dx * dpr,
        dy * dpr,
        drawWidth * dpr,
        drawHeight * dpr
      );
    }

    // Cache the drawn image in ref for subsequent crossfades
    lastDrawnImageRef.current = img;
  };

  // Draw appropriate frame from cache, fallback to first frame if preloading sequence
  const drawFrame = (index: number) => {
    if (isPreloaded && imagesRef.current[index]) {
      drawSpecificImage(imagesRef.current[index]);
    } else if (firstFrameImgRef.current) {
      drawSpecificImage(firstFrameImgRef.current);
    }
  };

  // Helper to draw the frame using current global scroll state
  const redrawCurrentFrame = (latestProgress: number) => {
    const flavorIndex = FLAVORS.findIndex(f => f.id === selectedFlavor.id);
    if (flavorIndex === -1) return;

    // Compute the exact local progress of this flavor section (400vh out of 2100vh total height)
    const start = (flavorIndex * 4) / 21;
    const end = ((flavorIndex + 1) * 4) / 21;
    const localProgress = Math.max(0, Math.min(1, (latestProgress - start) / (end - start)));

    const totalFrames = selectedFlavor.totalFrames;
    const frameIndex = Math.min(totalFrames - 1, Math.max(0, Math.floor(localProgress * totalFrames)));
    drawFrame(frameIndex);
  };

  // Preload frames in background and handle sequence transition cleanups
  useEffect(() => {
    let active = true;

    // Capture the previously drawn image to crossfade from
    if (lastDrawnImageRef.current) {
      crossfadeSourceRef.current = lastDrawnImageRef.current;
      crossfadeProgressRef.current = 0.0;
    }

    // Reset preloading states
    setIsPreloaded(false);
    imagesRef.current = [];
    firstFrameImgRef.current = null;

    const totalFrames = selectedFlavor.totalFrames;
    const startFrame = selectedFlavor.startFrame ?? 0;

    // Load first frame immediately to display static flavor outline
    const firstImg = new Image();
    const firstNum = String(startFrame).padStart(3, "0");
    firstImg.src = selectedFlavor.framePath.replace("{num}", firstNum);
    firstImg.onload = () => {
      if (!active) return;
      firstFrameImgRef.current = firstImg;
      
      // Draw first frame immediately
      drawSpecificImage(firstImg);

      // Start crossfade animation loop (approx 1s duration)
      const animateCrossfade = () => {
        if (!active) return;
        if (crossfadeProgressRef.current < 1.0) {
          crossfadeProgressRef.current = Math.min(1.0, crossfadeProgressRef.current + 0.02); // ~50 frames, ~800ms
          redrawCurrentFrame(scrollYProgress.get());
          requestAnimationFrame(animateCrossfade);
        }
      };
      animateCrossfade();
    };

    // Load full sequence in background
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    const handleImageLoad = () => {
      if (!active) return;
      loadedCount++;
      
      // Update loading overlay only on initial page steeping
      if (isLoading) {
        setLoadPercentage(Math.round((loadedCount / totalFrames) * 100));
      }

      if (loadedCount === totalFrames) {
        if (active) {
          imagesRef.current = loadedImages;
          setIsPreloaded(true);
          
          if (isLoading) {
            setIsLoading(false);
          }

          // Trigger redraw with the full loaded sequence at the current scroll position
          redrawCurrentFrame(scrollYProgress.get());
        }
      }
    };

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      const frameNum = i + startFrame;
      const num = String(frameNum).padStart(3, "0");
      img.src = selectedFlavor.framePath.replace("{num}", num);
      img.onload = handleImageLoad;
      img.onerror = () => {
        console.error(`Failed to load frame ${num}`);
        handleImageLoad();
      };
      loadedImages.push(img);
    }

    return () => {
      active = false;
    };
  }, [selectedFlavor]);

  // Handle resize and setup canvas dimensions
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.width = width * dpr;
      canvas.height = height * dpr;

      // Draw initial frame at new scale dimensions
      redrawCurrentFrame(scrollYProgress.get());
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [scrollYProgress, selectedFlavor, isPreloaded]);

  // Listen to scroll updates at 60fps
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    redrawCurrentFrame(latest);
  });

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden pointer-events-none z-0">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes reflectionSweep {
          0% {
            transform: translate(-100%, -100%) rotate(45deg);
          }
          15%, 100% {
            transform: translate(100%, 100%) rotate(45deg);
          }
        }
        .glass-reflection-sweep {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.02) 40%,
            rgba(255, 255, 255, 0.06) 50%,
            rgba(255, 255, 255, 0.02) 60%,
            rgba(255, 255, 255, 0) 100%
          );
          width: 200%;
          height: 200%;
          animation: reflectionSweep 10s ease-in-out infinite;
        }
      `}} />

      {/* Sweeping Glass Reflections (Cinematic Overlay) */}
      <div className="absolute inset-0 pointer-events-none z-10 glass-reflection-sweep" />

      {/* Spring Interactive Canvas Wrapper */}
      <motion.div
        style={{
          y: jiggleY,
          rotate: tiltRotate,
          opacity: canvasOpacity,
          transformOrigin: "center center"
        }}
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block w-full h-full pointer-events-none"
        />
      </motion.div>

      {/* Translucent Glass Bubble Watermark Mask */}
      {!isLoading && <BubbleWatermarkMask selectedFlavorId={selectedFlavor.id} />}

      {/* Initial Loading Screen Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black pointer-events-auto">
          <div className="relative flex flex-col items-center animate-fade-in">
            {/* Elegant rotating caramel glow */}
            <div 
              style={{ borderBottomColor: selectedFlavor.accentColor }}
              className="w-24 h-24 rounded-full border-t border-b-2 border-t-boba-cream animate-spin absolute -top-8 filter blur-[1px]"
            ></div>
            
            <div className="mt-20 flex flex-col items-center text-center">
              <span 
                style={{ color: selectedFlavor.accentColor }}
                className="font-serif italic text-xl tracking-widest uppercase mb-2"
              >
                Steeping
              </span>
              <span className="font-serif text-5xl md:text-6xl text-boba-cream font-light tracking-wider">
                {loadPercentage}%
              </span>
              <p className="font-sans text-xs text-boba-beige/60 tracking-[0.2em] uppercase mt-4">
                Preparing The Art of Boba
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
