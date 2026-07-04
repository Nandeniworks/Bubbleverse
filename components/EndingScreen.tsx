"use client";

import { motion } from "framer-motion";


interface EndingScreenProps {
  isVisible: boolean;
}

export default function EndingScreen({ isVisible }: EndingScreenProps) {
  // Define origins on map viewBox (1000 x 600)
  const origins = {
    "brown-sugar": { cx: 810, cy: 220, name: "Taiwan" },
    "matcha": { cx: 835, cy: 175, name: "Japan" },
    "strawberry": { cx: 220, cy: 100, name: "North America" },
    "blueberry": { cx: 520, cy: 80, name: "Europe" },
    "taro": { cx: 810, cy: 220, name: "Taiwan" },
  };

  // Define SVG coordinate points for the tops of the 5 cup images
  const cupTops = [
    { x: 220, y: 390, color: "#B56A2D" }, // Brown Sugar
    { x: 380, y: 390, color: "#5B8045" }, // Matcha
    { x: 540, y: 390, color: "#C2546E" }, // Strawberry
    { x: 700, y: 390, color: "#5263A8" }, // Blueberry
    { x: 860, y: 390, color: "#9D80B5" }, // Taro
  ];

  // Helper to build curved paths from cup tops to origin targets
  const getCurvePath = (x1: number, y1: number, x2: number, y2: number) => {
    // Control point moves up, then curves sideways
    const cx1 = x1;
    const cy1 = y1 - 100;
    const cx2 = x2;
    const cy2 = y2 + 100;
    return `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;
  };

  return (
    <div className="h-screen w-full flex flex-col justify-between py-16 px-6 md:px-24 bg-black relative overflow-hidden select-none">
      {/* Background coordinates grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "30px 30px"
        }}
      />

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes drawOriginLine {
          from {
            stroke-dashoffset: 800;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        .origin-line-anim {
          stroke-dasharray: 800;
          stroke-dashoffset: 800;
          animation: drawOriginLine 3s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
      `}} />

      {/* Main vector graphics dashboard container */}
      <div className="w-full max-w-5xl mx-auto flex-grow flex items-center justify-center relative">
        <svg 
          viewBox="0 0 1000 600" 
          className="w-full h-full text-white"
        >
          {/* Subtle minimal background map outline (opacity 0.05) */}
          <g opacity="0.04" stroke="currentColor" strokeWidth="1" fill="none">
            {/* North America */}
            <polygon points="80,50 160,30 220,40 320,60 380,140 320,220 220,210 180,160 120,160 80,100" />
            {/* South America */}
            <polygon points="250,220 320,220 380,310 330,450 280,410 240,300" />
            {/* Europe */}
            <polygon points="460,40 550,30 620,50 600,120 480,120 420,90" />
            {/* Africa */}
            <polygon points="460,140 580,130 620,200 580,350 510,330 440,220" />
            {/* Asia */}
            <polygon points="620,50 780,40 900,80 940,200 860,300 700,280 600,120" />
            {/* Australia */}
            <polygon points="810,340 880,330 900,400 840,410" />
            {/* Japan outline */}
            <path d="M 830 160 Q 840 175 845 190" />
            {/* Taiwan mark */}
            <circle cx="810" cy="220" r="2.5" />
          </g>

          {/* Animated Connecting Lines (Only visible when EndingScreen is active) */}
          {isVisible && (
            <g fill="none">
              {/* Brown Sugar Line */}
              <path
                d={getCurvePath(cupTops[0].x, cupTops[0].y, origins["brown-sugar"].cx, origins["brown-sugar"].cy)}
                stroke={cupTops[0].color}
                strokeWidth="1.25"
                opacity="0.3"
                className="origin-line-anim"
                style={{ animationDelay: "0.2s" }}
              />
              {/* Matcha Line */}
              <path
                d={getCurvePath(cupTops[1].x, cupTops[1].y, origins["matcha"].cx, origins["matcha"].cy)}
                stroke={cupTops[1].color}
                strokeWidth="1.25"
                opacity="0.3"
                className="origin-line-anim"
                style={{ animationDelay: "0.4s" }}
              />
              {/* Strawberry Line */}
              <path
                d={getCurvePath(cupTops[2].x, cupTops[2].y, origins["strawberry"].cx, origins["strawberry"].cy)}
                stroke={cupTops[2].color}
                strokeWidth="1.25"
                opacity="0.3"
                className="origin-line-anim"
                style={{ animationDelay: "0.6s" }}
              />
              {/* Blueberry Line */}
              <path
                d={getCurvePath(cupTops[3].x, cupTops[3].y, origins["blueberry"].cx, origins["blueberry"].cy)}
                stroke={cupTops[3].color}
                strokeWidth="1.25"
                opacity="0.3"
                className="origin-line-anim"
                style={{ animationDelay: "0.8s" }}
              />
              {/* Taro Line */}
              <path
                d={getCurvePath(cupTops[4].x, cupTops[4].y, origins["taro"].cx, origins["taro"].cy)}
                stroke={cupTops[4].color}
                strokeWidth="1.25"
                opacity="0.3"
                className="origin-line-anim"
                style={{ animationDelay: "1s" }}
              />
            </g>
          )}

          {/* Pulsing origin targets */}
          {isVisible && (
            <g>
              {/* Taiwan Origin */}
              <circle cx="810" cy="220" r="3" fill="#B56A2D" />
              <circle cx="810" cy="220" r="8" fill="none" stroke="#B56A2D" strokeWidth="0.5" opacity="0.5" className="animate-ping" style={{ transformOrigin: "810px 220px" }} />
              {/* Japan Origin */}
              <circle cx="835" cy="175" r="3" fill="#5B8045" />
              <circle cx="835" cy="175" r="8" fill="none" stroke="#5B8045" strokeWidth="0.5" opacity="0.5" className="animate-ping" style={{ transformOrigin: "835px 175px" }} />
              {/* North America Origin */}
              <circle cx="220" cy="100" r="3" fill="#C2546E" />
              <circle cx="220" cy="100" r="8" fill="none" stroke="#C2546E" strokeWidth="0.5" opacity="0.5" className="animate-ping" style={{ transformOrigin: "220px 100px" }} />
              {/* Europe Origin */}
              <circle cx="520" cy="80" r="3" fill="#5263A8" />
              <circle cx="520" cy="80" r="8" fill="none" stroke="#5263A8" strokeWidth="0.5" opacity="0.5" className="animate-ping" style={{ transformOrigin: "520px 80px" }} />
            </g>
          )}

          {/* 5 Rendered Cups (SVG Image Outlines) */}
          <g>
            {/* Cup 1: Brown Sugar */}
            <image
              href="/sequences/brown-sugar/frame_000.webp"
              x="170"
              y="380"
              width="100"
              height="160"
              className="transition-transform duration-700 hover:-translate-y-4"
              style={{ cursor: "pointer" }}
            />
            {/* Cup 2: Matcha */}
            <image
              href="/sequences/matcha/ezgif-frame-001.jpg"
              x="330"
              y="380"
              width="100"
              height="160"
              className="transition-transform duration-700 hover:-translate-y-4"
              style={{ cursor: "pointer" }}
            />
            {/* Cup 3: Strawberry */}
            <image
              href="/sequences/strawberry/ezgif-frame-001.jpg"
              x="490"
              y="380"
              width="100"
              height="160"
              className="transition-transform duration-700 hover:-translate-y-4"
              style={{ cursor: "pointer" }}
            />
            {/* Cup 4: Blueberry */}
            <image
              href="/sequences/blueberry/ezgif-frame-001.jpg"
              x="650"
              y="380"
              width="100"
              height="160"
              className="transition-transform duration-700 hover:-translate-y-4"
              style={{ cursor: "pointer" }}
            />
            {/* Cup 5: Taro */}
            <image
              href="/sequences/taro/ezgif-frame-001.jpg"
              x="810"
              y="380"
              width="100"
              height="160"
              className="transition-transform duration-700 hover:-translate-y-4"
              style={{ cursor: "pointer" }}
            />
          </g>
        </svg>
      </div>

      {/* Elegant Editorial Messages (Framer Motion delayed fades) */}
      <div className="w-full text-center flex flex-col items-center mt-6 relative z-10">
        {isVisible && (
          <>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
              className="font-serif italic text-3xl md:text-5xl text-[#FFF8F1] tracking-wide mb-3"
            >
              Every cup tells a story.
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 1.5, delay: 2.2, ease: "easeOut" }}
              className="font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#E7D8C9]/80"
            >
              Which one will you try first?
            </motion.p>
          </>
        )}
      </div>
    </div>
  );
}
