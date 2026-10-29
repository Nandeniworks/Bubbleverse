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
  const sequenceCache = useRef<Record<string, HTMLImageElement[]>>({});
  const firstFramesRef = useRef<Record<string, HTMLImageElement>>({});

  const [isLoading, setIsLoading] = useState(true);
  const [loadPercentage, setLoadPercentage] = useState(0);

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

  // Fade out canvas cup when scrolling into the Sanrio Section (progress 0.67 to 0.70)
  const canvasOpacity = useTransform(scrollYProgress, [0.67, 0.70], [1, 0]);

  const getFrameForFlavor = (flavorIdx: number, scaledProgress: number) => {
    const flavor = FLAVORS[flavorIdx];
    if (!flavor) return null;

    const totalFlavors = FLAVORS.length;
    const start = flavorIdx / totalFlavors;
    const end = (flavorIdx + 1) / totalFlavors;
    
    const localProgress = Math.max(0, Math.min(1, (scaledProgress - start) / (end - start)));
    const totalFrames = flavor.totalFrames;
    const frameIndex = Math.min(totalFrames - 1, Math.max(0, Math.floor(localProgress * totalFrames)));

    const seq = sequenceCache.current[flavor.id];
    if (seq && seq[frameIndex] && seq[frameIndex].naturalWidth > 0) {
      return seq[frameIndex];
    }
    return firstFramesRef.current[flavor.id];
  };

  const redrawCurrentFrame = (latestProgress: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const totalFlavors = FLAVORS.length;
    const scaledProgress = latestProgress / 0.6896; // 0.6896 is the total width of flavors
    const exactIndex = scaledProgress * totalFlavors;
    
    const nearestBoundary = Math.round(exactIndex);
    const dist = exactIndex - nearestBoundary;
    
    const TRANSITION_HALF_WIDTH = 0.2;
    let currentFlavorIdx = Math.floor(exactIndex);
    let nextFlavorIdx = currentFlavorIdx;
    let transitionProgress = 0;

    if (nearestBoundary > 0 && nearestBoundary < totalFlavors) {
      if (dist > -TRANSITION_HALF_WIDTH && dist < TRANSITION_HALF_WIDTH) {
        currentFlavorIdx = nearestBoundary - 1;
        nextFlavorIdx = nearestBoundary;
        transitionProgress = (dist + TRANSITION_HALF_WIDTH) / (TRANSITION_HALF_WIDTH * 2);
      } else {
        currentFlavorIdx = Math.max(0, Math.min(totalFlavors - 1, Math.floor(exactIndex)));
        nextFlavorIdx = currentFlavorIdx;
      }
    } else {
      currentFlavorIdx = Math.max(0, Math.min(totalFlavors - 1, Math.floor(exactIndex)));
      nextFlavorIdx = currentFlavorIdx;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const drawTransformed = (img: HTMLImageElement | undefined | null, alpha: number, scaleMult: number) => {
      if (!img || img.naturalWidth === 0) return;
      
      const imgWidth = img.naturalWidth || img.width || 1280;
      const imgHeight = img.naturalHeight || img.height || 720;
      const clientWidth = canvas.width / (window.devicePixelRatio || 1);
      const clientHeight = canvas.height / (window.devicePixelRatio || 1);
      
      const baseScale = Math.max(clientWidth / imgWidth, clientHeight / imgHeight);
      const finalScale = baseScale * scaleMult;
      
      const drawWidth = imgWidth * finalScale;
      const drawHeight = imgHeight * finalScale;
      const dx = (clientWidth - drawWidth) / 2;
      const dy = (clientHeight - drawHeight) / 2;
      const dpr = window.devicePixelRatio || 1;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.drawImage(
        img,
        0, 0, imgWidth, imgHeight,
        dx * dpr, dy * dpr, drawWidth * dpr, drawHeight * dpr
      );
      ctx.restore();
    };

    if (transitionProgress > 0 && transitionProgress < 1 && currentFlavorIdx !== nextFlavorIdx) {
      // Draw outgoing (fade out, slight scale down to push it back)
      const imgOut = getFrameForFlavor(currentFlavorIdx, scaledProgress);
      drawTransformed(imgOut, 1 - transitionProgress, 1 - (transitionProgress * 0.05));
      
      // Draw incoming (fade in, scale down from slightly enlarged to base)
      const imgIn = getFrameForFlavor(nextFlavorIdx, scaledProgress);
      drawTransformed(imgIn, transitionProgress, 1.05 - (transitionProgress * 0.05));
    } else {
      // Draw standard single flavor
      const img = getFrameForFlavor(currentFlavorIdx, scaledProgress);
      drawTransformed(img, 1, 1);
    }
  };

  useEffect(() => {
    // Preload first frames of all flavors once on mount
    FLAVORS.forEach(f => {
      if (!firstFramesRef.current[f.id]) {
        const img = new Image();
        const firstNum = String(f.startFrame ?? 0).padStart(3, "0");
        img.src = f.framePath.replace("{num}", firstNum);
        img.onload = () => {
          firstFramesRef.current[f.id] = img;
          redrawCurrentFrame(scrollYProgress.get());
        };
      }
    });
  }, []);

  // Preload full frames sequence in background for the active flavor
  useEffect(() => {
    let active = true;

    if (sequenceCache.current[selectedFlavor.id]) {
      if (isLoading) setIsLoading(false);
      redrawCurrentFrame(scrollYProgress.get());
      return;
    }

    const totalFrames = selectedFlavor.totalFrames;
    const startFrame = selectedFlavor.startFrame ?? 0;

    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    const handleImageLoad = () => {
      if (!active) return;
      loadedCount++;
      
      if (isLoading) {
        setLoadPercentage(Math.round((loadedCount / totalFrames) * 100));
      }

      if (loadedCount === totalFrames) {
        if (active) {
          sequenceCache.current[selectedFlavor.id] = loadedImages;
          if (isLoading) {
            setIsLoading(false);
          }
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
  }, [selectedFlavor, isLoading]);

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
  }, [scrollYProgress, selectedFlavor]);

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
