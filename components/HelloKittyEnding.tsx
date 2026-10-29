"use client";

import { motion, MotionValue, useAnimation } from "framer-motion";
import { useEffect } from "react";

interface HelloKittyEndingProps {
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
  y: MotionValue<number>;
}

export default function HelloKittyEnding({ opacity, scale, y }: HelloKittyEndingProps) {
  const eyeControls = useAnimation();

  useEffect(() => {
    let isActive = true;
    const blink = async () => {
      while (isActive) {
        // Natural random interval between 2.5s and 5s
        const delay = Math.random() * 2.5 + 2.5;
        await new Promise(r => setTimeout(r, delay * 1000));
        if (!isActive) break;
        
        // Blink
        await eyeControls.start({
          scaleY: [1, 0.05, 1],
          transition: { duration: 0.15, times: [0, 0.5, 1], ease: "easeInOut" }
        });

        // Occasional double blink
        if (Math.random() > 0.8) {
          await new Promise(r => setTimeout(r, 100));
          if (!isActive) break;
          await eyeControls.start({
            scaleY: [1, 0.05, 1],
            transition: { duration: 0.15, times: [0, 0.5, 1], ease: "easeInOut" }
          });
        }
      }
    };
    blink();
    return () => { isActive = false; };
  }, [eyeControls]);

  // The face container will have a very slow, microscopic breathing animation
  return (
    <motion.div 
      style={{ opacity }}
      className="fixed inset-0 z-40 pointer-events-none"
    >
      {/* Decorative Sanrio Corner Elements */}
      <div className="absolute inset-0 flex justify-between p-8 md:p-16 opacity-60">
        <div className="flex flex-col justify-between h-full">
          <span className="text-[#E27685] text-3xl md:text-5xl blur-[2px] animate-pulse" style={{ animationDuration: '4s' }}>✧</span>
          <span className="text-[#E27685] text-3xl md:text-5xl blur-[2px] animate-pulse" style={{ animationDuration: '5s' }}>♡</span>
        </div>
        <div className="flex flex-col justify-between h-full">
          <span className="text-[#E27685] text-3xl md:text-5xl blur-[2px] animate-pulse" style={{ animationDuration: '5s' }}>♡</span>
          <span className="text-[#E27685] text-3xl md:text-5xl blur-[2px] animate-pulse" style={{ animationDuration: '4s' }}>✧</span>
        </div>
      </div>

      {/* Scaled White Rectangle with Seamless Edges */}
      <motion.div
        style={{ scale, y }}
        className="absolute inset-0 bg-[#FFFBFB] flex items-center justify-center shadow-[0_0_80px_40px_#FFFBFB]"
      >
        <motion.div 
          animate={{ scale: [1, 1.01, 1], y: [0, -4, 0] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-full max-w-4xl aspect-[4/3] flex items-center justify-center"
        >
        
        {/* Left Eye */}
        <motion.div 
          className="absolute left-[30%] top-[45%] w-10 h-16 bg-[#3B2F2F] rounded-[50%]"
          animate={eyeControls}
        />

        {/* Right Eye */}
        <motion.div 
          className="absolute right-[30%] top-[45%] w-10 h-16 bg-[#3B2F2F] rounded-[50%]"
          animate={eyeControls}
        />

        {/* Nose */}
        <div className="absolute left-1/2 top-[55%] -translate-x-1/2 w-14 h-9 bg-[#E5B55C] rounded-[50%] border-2 border-[#1A1A1A]/10" />

        {/* Whiskers Left */}
        <div className="absolute left-[15%] top-[48%] flex flex-col gap-6">
          <motion.div 
            animate={{ y: [0, -1.5, 0], rotate: [6, 7, 6] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-24 h-[4px] bg-[#3B2F2F] rounded-full origin-right"
          />
          <motion.div 
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 3.7, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            className="w-28 h-[4px] bg-[#3B2F2F] rounded-full origin-right"
          />
          <motion.div 
            animate={{ y: [0, -1.5, 0], rotate: [-6, -7, -6] }}
            transition={{ duration: 3.3, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
            className="w-24 h-[4px] bg-[#3B2F2F] rounded-full origin-right"
          />
        </div>

        {/* Whiskers Right */}
        <div className="absolute right-[15%] top-[48%] flex flex-col gap-6 items-end">
          <motion.div 
            animate={{ y: [0, -1.5, 0], rotate: [-6, -7, -6] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-24 h-[4px] bg-[#3B2F2F] rounded-full origin-left"
          />
          <motion.div 
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 3.7, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            className="w-28 h-[4px] bg-[#3B2F2F] rounded-full origin-left"
          />
          <motion.div 
            animate={{ y: [0, -1.5, 0], rotate: [6, 7, 6] }}
            transition={{ duration: 3.3, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
            className="w-24 h-[4px] bg-[#3B2F2F] rounded-full origin-left"
          />
        </div>

        {/* Pink Bow */}
        <motion.div 
          className="absolute right-[15%] top-[10%] origin-center"
          animate={{ rotate: [-5, 0, -5], scale: [1, 1.02, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative w-48 h-32 transform rotate-12">
            {/* Left loop */}
            <div className="absolute left-0 top-0 w-24 h-24 bg-[#E27685] rounded-full border-4 border-[#3B2F2F]" />
            {/* Right loop */}
            <div className="absolute right-0 top-0 w-24 h-24 bg-[#E27685] rounded-full border-4 border-[#3B2F2F]" />
            {/* Center knot */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#E27685] rounded-full border-4 border-[#3B2F2F] z-10" />
            
            {/* Highlight left */}
            <div className="absolute left-4 top-4 w-10 h-6 bg-white/40 rounded-full blur-[2px] transform -rotate-45" />
            {/* Highlight right */}
            <div className="absolute right-4 top-4 w-10 h-6 bg-white/40 rounded-full blur-[2px] transform rotate-45" />
          </div>
        </motion.div>

      </motion.div>
    </motion.div>
    </motion.div>
  );
}
