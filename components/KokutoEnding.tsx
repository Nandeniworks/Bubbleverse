"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface KokutoEndingProps {
  progress: MotionValue<number>;
}

export default function KokutoEnding({ progress }: KokutoEndingProps) {
  // Fade in the whole ending section from 0.75 to 0.8
  const sectionOpacity = useTransform(progress, [0.75, 0.8], [0, 1]);

  // Transition overall scene toward soft warm cream/white tone at the very bottom (0.9 to 1.0)
  const bgOpacity = useTransform(progress, [0.9, 1.0], [0, 1]);

  // Small boba cup moving upward and fading
  const bobaY = useTransform(progress, [0.8, 1.0], [50, -150]);
  const bobaOpacity = useTransform(progress, [0.8, 0.9, 1.0], [0, 1, 0]);

  // Subtle parallax for decorative elements
  const driftY1 = useTransform(progress, [0.75, 1.0], [0, -80]);
  const driftY2 = useTransform(progress, [0.75, 1.0], [0, -120]);
  const driftY3 = useTransform(progress, [0.75, 1.0], [0, -40]);

  return (
    <motion.div 
      style={{ opacity: sectionOpacity }}
      className="fixed inset-0 z-40 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
    >
      {/* Background Transition to Cream/White */}
      <motion.div 
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 bg-[#FAFAFA]"
      />

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-60">
        <motion.div style={{ y: driftY1 }} className="absolute top-[20%] left-[15%] text-[#E27685] text-xl">🎀</motion.div>
        <motion.div style={{ y: driftY2 }} className="absolute top-[15%] right-[20%] text-[#E27685] text-2xl">♡</motion.div>
        <motion.div style={{ y: driftY3 }} className="absolute top-[40%] left-[10%] text-[#E27685] text-lg">✧</motion.div>
        <motion.div style={{ y: driftY1 }} className="absolute top-[35%] right-[12%] text-[#E27685] text-xl">🌸</motion.div>
        <motion.div style={{ y: driftY2 }} className="absolute bottom-[30%] left-[20%] text-[#E27685] text-2xl">☁️</motion.div>
        <motion.div style={{ y: driftY3 }} className="absolute bottom-[25%] right-[15%] text-[#E27685] text-xl">🎀</motion.div>
        <motion.div style={{ y: driftY1 }} className="absolute bottom-[15%] left-[30%] text-[#E27685] text-lg">✧</motion.div>
        <motion.div style={{ y: driftY2 }} className="absolute bottom-[40%] right-[25%] text-[#E27685] text-xl">♡</motion.div>
      </div>

      {/* Typography Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full max-w-4xl mx-auto pt-20">
        <span className="font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase font-bold text-[#E07A5F] mb-8">
          THE KOKUTO EXPERIENCE
        </span>
        
        <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight font-light text-[#1A1A1A] mb-12">
          FOUR CHARACTERS.<br/>
          FOUR LITTLE WORLDS.<br/>
          <span className="italic text-[#1A1A1A]/70">ONE BUBBLEVERSE.</span>
        </h2>
        
        <p className="font-serif italic text-xl md:text-2xl text-[#1A1A1A]/70 mb-32">
          Thank you for taking a little sip with us. ♡
        </p>

        <div className="absolute bottom-12 left-0 right-0 flex justify-center">
          <span className="font-sans text-[9px] md:text-[10px] tracking-[0.5em] uppercase font-bold text-[#1A1A1A]/40">
            KOKUTO — THE ART OF BOBA
          </span>
        </div>
      </div>

      {/* Final Boba Cup Accent */}
      <motion.div 
        style={{ y: bobaY, opacity: bobaOpacity }}
        className="absolute bottom-32 left-1/2 -translate-x-1/2 text-4xl opacity-80"
      >
        🧋
      </motion.div>
    </motion.div>
  );
}
