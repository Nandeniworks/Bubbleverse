"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import HelloKittyEnding from "./HelloKittyEnding";

export default function SanrioCollabSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Track local scroll progress
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // 8 Beats total over 1000vh (each beat approx 0.125)
  // BEAT 0: Hero
  const b0Op = useTransform(scrollYProgress, [0.0, 0.05, 0.10, 0.125], [0, 1, 1, 0]);
  const b0Y = useTransform(scrollYProgress, [0.0, 0.125], [0, -100]);
  const b0ImgScale = useTransform(scrollYProgress, [0.0, 0.125], [1.05, 1.0]);

  // BEAT 1: Collection Intro
  const b1Op = useTransform(scrollYProgress, [0.125, 0.15, 0.22, 0.25], [0, 1, 1, 0]);
  const b1Y = useTransform(scrollYProgress, [0.125, 0.25], [50, -50]);

  // Easing arrays for text animation mappings
  const easeIn = [0, 0.2, 0.4];
  const easeInDelayed = [0.1, 0.3, 0.5];

  // BEAT 2: Hello Kitty
  const b2Op = useTransform(scrollYProgress, [0.25, 0.275, 0.35, 0.375], [0, 1, 1, 0]);
  const b2YText = useTransform(scrollYProgress, [0.25, 0.375], [80, -80]);
  const b2YImg = useTransform(scrollYProgress, [0.25, 0.375], [120, -120]);
  const b2Progress = useTransform(scrollYProgress, [0.25, 0.375], [0, 1]);
  const b2LabelX = useTransform(b2Progress, easeIn, [-60, -10, 0]);
  const b2LabelOp = useTransform(b2Progress, [0, 0.3], [0, 1]);
  const b2TitleX = useTransform(b2Progress, easeInDelayed, [-120, -20, 0]);
  const b2TitleY = useTransform(b2Progress, easeInDelayed, [20, 5, 0]);
  const b2TitleOp = useTransform(b2Progress, [0.1, 0.4], [0, 1]);
  const b2DrinkX = useTransform(b2Progress, easeInDelayed, [160, 25, 0]);
  const b2DrinkRot = useTransform(b2Progress, easeInDelayed, [4, 1, 0]);

  // BEAT 3: Kuromi
  const b3Op = useTransform(scrollYProgress, [0.375, 0.40, 0.475, 0.50], [0, 1, 1, 0]);
  const b3YText = useTransform(scrollYProgress, [0.375, 0.50], [80, -80]);
  const b3YImg = useTransform(scrollYProgress, [0.375, 0.50], [120, -120]);
  const b3Progress = useTransform(scrollYProgress, [0.375, 0.50], [0, 1]);
  const b3LabelX = useTransform(b3Progress, easeIn, [60, 10, 0]);
  const b3LabelOp = useTransform(b3Progress, [0, 0.3], [0, 1]);
  const b3TitleX = useTransform(b3Progress, easeInDelayed, [120, 20, 0]);
  const b3TitleY = useTransform(b3Progress, easeInDelayed, [20, 5, 0]);
  const b3TitleOp = useTransform(b3Progress, [0.1, 0.4], [0, 1]);
  const b3DrinkX = useTransform(b3Progress, easeInDelayed, [-160, -25, 0]);
  const b3DrinkRot = useTransform(b3Progress, easeInDelayed, [-4, -1, 0]);

  // BEAT 4: Cinnamoroll
  const b4Op = useTransform(scrollYProgress, [0.50, 0.525, 0.60, 0.625], [0, 1, 1, 0]);
  const b4YText = useTransform(scrollYProgress, [0.50, 0.625], [80, -80]);
  const b4YImg = useTransform(scrollYProgress, [0.50, 0.625], [120, -120]);
  const b4Progress = useTransform(scrollYProgress, [0.50, 0.625], [0, 1]);
  const b4LabelX = useTransform(b4Progress, easeIn, [-60, -10, 0]);
  const b4LabelOp = useTransform(b4Progress, [0, 0.3], [0, 1]);
  const b4TitleX = useTransform(b4Progress, easeInDelayed, [-120, -20, 0]);
  const b4TitleY = useTransform(b4Progress, easeInDelayed, [20, 5, 0]);
  const b4TitleOp = useTransform(b4Progress, [0.1, 0.4], [0, 1]);
  const b4DrinkX = useTransform(b4Progress, easeInDelayed, [160, 25, 0]);
  const b4DrinkRot = useTransform(b4Progress, easeInDelayed, [4, 1, 0]);

  // BEAT 5: My Melody
  const b5Op = useTransform(scrollYProgress, [0.625, 0.65, 0.725, 0.75], [0, 1, 1, 0]);
  const b5YText = useTransform(scrollYProgress, [0.625, 0.75], [80, -80]);
  const b5YImg = useTransform(scrollYProgress, [0.625, 0.75], [120, -120]);
  const b5Progress = useTransform(scrollYProgress, [0.625, 0.75], [0, 1]);
  const b5LabelX = useTransform(b5Progress, easeIn, [60, 10, 0]);
  const b5LabelOp = useTransform(b5Progress, [0, 0.3], [0, 1]);
  const b5TitleX = useTransform(b5Progress, easeInDelayed, [120, 20, 0]);
  const b5TitleY = useTransform(b5Progress, easeInDelayed, [20, 5, 0]);
  const b5TitleOp = useTransform(b5Progress, [0.1, 0.4], [0, 1]);
  const b5DrinkX = useTransform(b5Progress, easeInDelayed, [-160, -25, 0]);
  const b5DrinkRot = useTransform(b5Progress, easeInDelayed, [-4, -1, 0]);

  // BEAT 6: Outro text
  const b6Op = useTransform(scrollYProgress, [0.75, 0.775, 0.85, 0.875], [0, 1, 1, 0]);
  const b6Y = useTransform(scrollYProgress, [0.75, 0.875], [50, -20]);
  const b6Scale = useTransform(scrollYProgress, [0.75, 0.875], [0.95, 1.05]);

  // BEAT 7: Hello Kitty Animated Ending
  const b7Op = useTransform(scrollYProgress, [0.85, 0.88, 0.93, 0.96], [0, 1, 1, 0]);
  const b7Scale = useTransform(scrollYProgress, [0.85, 1.0], [0.95, 1.0]);
  const b7Y = useTransform(scrollYProgress, [0.85, 1.0], [50, 0]);

  // BEAT 8: Final Kokuto Closing Scene
  const b8Op = useTransform(scrollYProgress, [0.95, 0.98], [0, 1]);
  const b8Y = useTransform(scrollYProgress, [0.95, 1.0], [20, 0]);

  return (
    <div 
      ref={sectionRef} 
      className="relative w-full overflow-hidden" 
      style={{ height: "1000vh", backgroundColor: "#FCE4EC" }}
    >
      {/* SanrioBackground */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="/sanrio/sanrio-hero.png" 
          alt="Sanrio Aesthetic" 
          className="w-full h-full object-cover" 
        />
      </div>

      {/* BEAT 0: Hero */}
      <motion.div 
        style={{ opacity: b0Op, y: b0Y }}
        className="fixed inset-0 flex flex-col md:flex-row items-center justify-between px-6 md:px-24 pointer-events-none z-10"
      >
        <div className="w-full md:w-5/12 flex flex-col justify-center items-start text-[#1A1A1A] mt-24 md:mt-0">
          <span className="font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase font-bold text-[#E07A5F] mb-8 flex items-center gap-4">
            <span className="w-8 h-[1px] bg-[#E07A5F]"></span>
            BUBBLEVERSE / LIMITED CONCEPT
          </span>
          <h2 className="font-serif text-6xl md:text-[7rem] lg:text-[8rem] leading-[0.85] font-light tracking-tighter mb-12">
            BOBA <br/>
            GETS <br/>
            A LITTLE <br/>
            <span className="italic font-extralight text-[#E07A5F]">CUTER.</span>
          </h2>
          <div className="pl-6 border-l border-[#1A1A1A]/10">
            <h3 className="font-sans text-sm md:text-base tracking-[0.3em] font-bold mb-3">SANRIO × KOKUTO</h3>
            <p className="font-serif italic font-light text-lg md:text-xl text-[#1A1A1A]/70 max-w-sm">
              An exclusive editorial concept pairing iconic kawaii culture with premium bubble tea.
            </p>
          </div>
        </div>

        <div className="w-full md:w-6/12 h-[60vh] md:h-[80vh] flex items-center justify-center relative mt-12 md:mt-0">
          <motion.img 
            style={{ scale: b0ImgScale }}
            src="/sanrio/sanrio-hero.png" 
            alt="Sanrio Hero Concept"
            className="w-full h-full object-contain"
          />
        </div>
      </motion.div>

      {/* BEAT 1: Intro */}
      <motion.div 
        style={{ opacity: b1Op, y: b1Y }}
        className="fixed inset-0 flex flex-col items-center justify-center text-center pointer-events-none z-10 px-6"
      >
        <span className="font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase font-bold text-[#E07A5F] mb-6">
          THE COLLECTION
        </span>
        <h2 className="font-serif text-4xl md:text-6xl leading-tight font-light text-[#1A1A1A] max-w-2xl mx-auto">
          FOUR CHARACTERS.<br/>
          FOUR LITTLE WORLDS.<br/>
          <span className="italic text-[#1A1A1A]/70">ONE BUBBLEVERSE.</span>
        </h2>
      </motion.div>

      {/* BEAT 2: Hello Kitty (Image Right) */}
      <motion.div 
        style={{ opacity: b2Op }}
        className="fixed inset-0 flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-24 pointer-events-none z-10"
      >
        <motion.div style={{ y: b2YText }} className="w-full md:w-5/12 flex flex-col justify-center items-start text-[#1A1A1A] mt-12 md:mt-0">
          <div className="overflow-hidden mb-6 w-full flex justify-start">
            <motion.span 
              style={{ x: b2LabelX, opacity: b2LabelOp }}
              className="font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase font-bold text-[#1A1A1A]/40 flex items-center gap-4"
            >
              <span className="w-6 h-[1px] bg-[#1A1A1A]/20"></span>
              01 / HELLO KITTY
            </motion.span>
          </div>
          <div className="overflow-hidden mb-8 w-full flex justify-start">
            <motion.h2 
              style={{ x: b2TitleX, y: b2TitleY, opacity: b2TitleOp }}
              className="font-serif italic text-5xl md:text-6xl lg:text-[5rem] leading-[0.9] font-light text-[#1A1A1A]"
            >
              Strawberry <br className="hidden md:block"/> Milk Boba
            </motion.h2>
          </div>
        </motion.div>
        <motion.div style={{ y: b2YImg, x: b2DrinkX, rotate: b2DrinkRot }} className="w-full md:w-6/12 h-[50vh] md:h-[70vh] flex items-center justify-center relative">
          <SanrioDrinkSequence character="hello-kitty" frameCount={98} progressValue={b2Progress} color="#FFE4E1" />
        </motion.div>
      </motion.div>

      {/* BEAT 3: Kuromi (Image Left) */}
      <motion.div 
        style={{ opacity: b3Op }}
        className="fixed inset-0 flex flex-col md:flex-row items-center justify-between px-6 md:px-24 pointer-events-none z-10"
      >
        <motion.div style={{ y: b3YImg, x: b3DrinkX, rotate: b3DrinkRot }} className="w-full md:w-6/12 h-[50vh] md:h-[70vh] flex items-center justify-center relative">
          <SanrioDrinkSequence character="kuromi" frameCount={70} progressValue={b3Progress} color="#E6E6FA" />
        </motion.div>
        <motion.div style={{ y: b3YText }} className="w-full md:w-5/12 flex flex-col justify-center items-start md:items-end text-left md:text-right text-[#1A1A1A] mt-12 md:mt-0">
          <div className="overflow-hidden mb-6 w-full flex justify-start md:justify-end">
            <motion.span 
              style={{ x: b3LabelX, opacity: b3LabelOp }}
              className="font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase font-bold text-[#1A1A1A]/40 flex items-center gap-4"
            >
              02 / KUROMI
              <span className="w-6 h-[1px] bg-[#1A1A1A]/20 hidden md:block"></span>
            </motion.span>
          </div>
          <div className="overflow-hidden mb-8 w-full flex justify-start md:justify-end">
            <motion.h2 
              style={{ x: b3TitleX, y: b3TitleY, opacity: b3TitleOp }}
              className="font-serif italic text-5xl md:text-6xl lg:text-[5rem] leading-[0.9] font-light text-[#1A1A1A]"
            >
              Black Sesame <br className="hidden md:block"/> Taro Boba
            </motion.h2>
          </div>
        </motion.div>
      </motion.div>

      {/* BEAT 4: Cinnamoroll (Image Right) */}
      <motion.div 
        style={{ opacity: b4Op }}
        className="fixed inset-0 flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-24 pointer-events-none z-10"
      >
        <motion.div style={{ y: b4YText }} className="w-full md:w-5/12 flex flex-col justify-center items-start text-[#1A1A1A] mt-12 md:mt-0">
          <div className="overflow-hidden mb-6 w-full flex justify-start">
            <motion.span 
              style={{ x: b4LabelX, opacity: b4LabelOp }}
              className="font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase font-bold text-[#1A1A1A]/40 flex items-center gap-4"
            >
              <span className="w-6 h-[1px] bg-[#1A1A1A]/20"></span>
              03 / CINNAMOROLL
            </motion.span>
          </div>
          <div className="overflow-hidden mb-8 w-full flex justify-start">
            <motion.h2 
              style={{ x: b4TitleX, y: b4TitleY, opacity: b4TitleOp }}
              className="font-serif italic text-5xl md:text-6xl lg:text-[5rem] leading-[0.9] font-light text-[#1A1A1A]"
            >
              Vanilla <br className="hidden md:block"/> Blueberry Boba
            </motion.h2>
          </div>
        </motion.div>
        <motion.div style={{ y: b4YImg, x: b4DrinkX, rotate: b4DrinkRot }} className="w-full md:w-6/12 h-[50vh] md:h-[70vh] flex items-center justify-center relative">
          <SanrioDrinkSequence character="cinnamoroll" frameCount={70} progressValue={b4Progress} color="#F0F8FF" />
        </motion.div>
      </motion.div>

      {/* BEAT 5: My Melody (Image Left) */}
      <motion.div 
        style={{ opacity: b5Op }}
        className="fixed inset-0 flex flex-col md:flex-row items-center justify-between px-6 md:px-24 pointer-events-none z-10"
      >
        <motion.div style={{ y: b5YImg, x: b5DrinkX, rotate: b5DrinkRot }} className="w-full md:w-6/12 h-[50vh] md:h-[70vh] flex items-center justify-center relative">
          <SanrioDrinkSequence character="my-melody" frameCount={56} progressValue={b5Progress} color="#FFC0CB" />
        </motion.div>
        <motion.div style={{ y: b5YText }} className="w-full md:w-5/12 flex flex-col justify-center items-start md:items-end text-left md:text-right text-[#1A1A1A] mt-12 md:mt-0">
          <div className="overflow-hidden mb-6 w-full flex justify-start md:justify-end">
            <motion.span 
              style={{ x: b5LabelX, opacity: b5LabelOp }}
              className="font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase font-bold text-[#1A1A1A]/40 flex items-center gap-4"
            >
              04 / MY MELODY
              <span className="w-6 h-[1px] bg-[#1A1A1A]/20 hidden md:block"></span>
            </motion.span>
          </div>
          <div className="overflow-hidden mb-8 w-full flex justify-start md:justify-end">
            <motion.h2 
              style={{ x: b5TitleX, y: b5TitleY, opacity: b5TitleOp }}
              className="font-serif italic text-5xl md:text-6xl lg:text-[5rem] leading-[0.9] font-light text-[#1A1A1A]"
            >
              Strawberry <br className="hidden md:block"/> Cream Boba
            </motion.h2>
          </div>
        </motion.div>
      </motion.div>

      {/* BEAT 6: Final Transition Out */}
      <motion.div
        style={{ opacity: b6Op, y: b6Y, scale: b6Scale }}
        className="fixed inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none z-30"
      >
        <span className="font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase font-bold text-[#1A1A1A]/50 mb-8">
          A LIMITED EDITION
        </span>
        <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-tight font-light text-[#1A1A1A] mb-8">
          FROM THE <br className="md:hidden" /> BUBBLEVERSE.
        </h2>
        <p className="font-serif italic text-xl md:text-2xl text-[#1A1A1A]/70">
          &ldquo;Some worlds are meant to be shared.&rdquo;
        </p>
      </motion.div>
      
      {/* BEAT 7: Hello Kitty Animated Face */}
      <HelloKittyEnding opacity={b7Op} scale={b7Scale} y={b7Y} />

      {/* BEAT 8: Final Kokuto Closing Scene */}
      <motion.div
        style={{ opacity: b8Op }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
      >
        {/* Soft Background */}
        <div className="absolute inset-0 bg-[#FFFDF9]" />

        {/* Content */}
        <motion.div style={{ y: b8Y }} className="relative z-10 flex flex-col items-center justify-center max-w-3xl mx-auto">
          <span className="font-sans text-[10px] md:text-[11px] tracking-[0.5em] uppercase text-[#1A1A1A]/60 mb-2 font-medium">
            KOKUTO
          </span>
          <span className="font-sans text-[10px] md:text-[11px] tracking-[0.5em] uppercase text-[#1A1A1A]/40 mb-16">
            THE ART OF BOBA
          </span>

          <h2 className="font-serif italic text-3xl md:text-4xl lg:text-5xl font-light text-[#1A1A1A] mb-24 leading-relaxed">
            “Thank you for sharing a little bubbleverse with us.”
          </h2>

          <div className="w-[1px] h-12 bg-[#1A1A1A]/10 mb-12" />

          <span className="font-sans text-[8px] md:text-[9px] tracking-[0.4em] uppercase text-[#1A1A1A]/30">
            FOUR CHARACTERS · FOUR LITTLE WORLDS · ONE BUBBLEVERSE
          </span>
        </motion.div>
      </motion.div>

    </div>
  );
}

interface SanrioDrinkSequenceProps {
  character: string;
  frameCount: number;
  progressValue: MotionValue<number>;
  color: string;
}

function SanrioDrinkSequence({ character, frameCount, progressValue, color }: SanrioDrinkSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const frameIndex = useRef(-1);
  const animationRef = useRef<number>();

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = framesRef.current[index];
    if (!img) return;

    if (canvas.width !== img.width) {
      canvas.width = img.width;
      canvas.height = img.height;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    let isMounted = true;
    const loadFrames = async () => {
      // Preload frames in small batches
      const batchSize = 5;
      for (let i = 1; i <= frameCount; i += batchSize) {
        if (!isMounted) break;
        const promises = [];
        for (let j = 0; j < batchSize && i + j <= frameCount; j++) {
          const index = i + j;
          promises.push(new Promise<void>((resolve) => {
            const img = new Image();
            const paddedNum = index.toString().padStart(3, '0');
            // FIX THE JPG ASSET PATH:
            img.src = `/sanrio/SanrioDrinkSequence/${character}/ezgif-frame-${paddedNum}.jpg`;
            img.onload = () => {
              framesRef.current[index - 1] = img;
              
              // If this is the frame we should be showing, draw it!
              if (index - 1 === frameIndex.current) {
                drawFrame(frameIndex.current);
              }
              resolve();
            };
            img.onerror = () => resolve(); // ignore errors
          }));
        }
        await Promise.all(promises);
      }
    };
    loadFrames();
    return () => { isMounted = false; };
  }, [character, frameCount]);

  useEffect(() => {
    const unsubscribe = progressValue.on("change", (latest) => {
      let targetIndex = Math.floor(latest * frameCount);
      if (targetIndex >= frameCount) targetIndex = frameCount - 1;
      if (targetIndex < 0) targetIndex = 0;

      if (frameIndex.current !== targetIndex) {
        frameIndex.current = targetIndex;
        console.log(`[Sanrio Sequence Debug] Character: ${character} | Target Frame: ${targetIndex + 1}/${frameCount} (index: ${targetIndex})`);
        
        // Use requestAnimationFrame to throttle redraws
        if (!animationRef.current) {
          animationRef.current = requestAnimationFrame(() => {
            drawFrame(frameIndex.current);
            animationRef.current = undefined;
          });
        }
      }
    });

    return () => {
      unsubscribe();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [progressValue, frameCount, character]);

  return (
    <motion.div 
      animate={{ y: [0, -12, 0], rotate: [-1, 1, -1], scale: [0.98, 1.02, 0.98] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      className="relative w-full h-full flex items-center justify-center"
    >
      {/* The colored organic aura - Tightened to hug the cup */}
      <div 
        className="absolute w-[45%] h-[80%] blur-[40px] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] opacity-80"
        style={{ backgroundColor: color }}
      ></div>

      {/* The feathered mask for the JPG sequence - Tightened radial gradient */}
      <canvas 
        ref={canvasRef} 
        className="relative w-full h-full object-contain"
        style={{ 
          maskImage: "radial-gradient(ellipse at 50% 52%, black 25%, transparent 60%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 52%, black 25%, transparent 60%)"
        }}
      />
    </motion.div>
  );
}
