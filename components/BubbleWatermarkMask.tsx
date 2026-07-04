"use client";

interface BubbleWatermarkMaskProps {
  selectedFlavorId: string;
}

export default function BubbleWatermarkMask({ selectedFlavorId }: BubbleWatermarkMaskProps) {
  // Define glass shadow & ambient glow colors for the bubble based on active flavor
  const glowColors: Record<string, { color: string; glow: string }> = {
    "brown-sugar": { color: "rgba(216, 161, 107, 0.22)", glow: "rgba(216, 161, 107, 0.4)" },
    "matcha": { color: "rgba(141, 175, 99, 0.22)", glow: "rgba(141, 175, 99, 0.4)" },
    "strawberry": { color: "rgba(214, 122, 138, 0.22)", glow: "rgba(214, 122, 138, 0.4)" },
    "blueberry": { color: "rgba(108, 126, 216, 0.22)", glow: "rgba(108, 126, 216, 0.4)" },
    "taro": { color: "rgba(165, 130, 214, 0.22)", glow: "rgba(165, 130, 214, 0.4)" },
  };

  const theme = glowColors[selectedFlavorId] || glowColors["brown-sugar"];

  return (
    <div className="fixed bottom-12 right-12 md:bottom-16 md:right-16 z-30 pointer-events-auto select-none">
      {/* Floating animation container using simple CSS keyframes to keep it ultra smooth */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes floatBubble {
          0% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(6px, -12px) scale(1.03);
          }
          100% {
            transform: translate(0, 0) scale(1);
          }
        }
        .luxury-glass-bubble {
          animation: floatBubble 7s ease-in-out infinite;
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
        }
        .luxury-glass-bubble::after {
          content: '';
          position: absolute;
          top: 8%;
          left: 12%;
          width: 25%;
          height: 15%;
          background: rgba(255, 255, 255, 0.55);
          border-radius: 50%;
          transform: rotate(-15deg);
          filter: blur(0.5px);
        }
        .luxury-glass-bubble::before {
          content: '';
          position: absolute;
          bottom: 10%;
          right: 12%;
          width: 40%;
          height: 10%;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 50%;
          transform: rotate(30deg);
        }
      `}} />

      {/* Glass Bubble Sphere */}
      <div 
        className="luxury-glass-bubble relative w-20 h-20 md:w-28 md:h-28 rounded-full border border-white/20 transition-all duration-1000 ease-in-out hover:scale-105 cursor-pointer"
        style={{
          background: `radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.15) 0%, ${theme.color} 50%, rgba(0, 0, 0, 0.75) 100%)`,
          boxShadow: `
            inset 0 4px 8px rgba(255, 255, 255, 0.25),
            inset 0 -6px 12px rgba(0, 0, 0, 0.5),
            0 8px 24px rgba(0, 0, 0, 0.4),
            0 0 20px -3px ${theme.glow}
          `,
          transition: "background 1s ease-in-out, box-shadow 1s ease-in-out"
        }}
      />
    </div>
  );
}
