"use client";

import { useEffect, useState } from "react";

interface OriginMapProps {
  selectedFlavorId: string;
  isVisible: boolean;
}

export default function OriginMap({ selectedFlavorId, isVisible }: OriginMapProps) {
  const [zoomStyle, setZoomStyle] = useState({
    transform: "scale(1)",
    transformOrigin: "500px 250px",
  });

  const [radarCoords, setRadarCoords] = useState({ x: 0, y: 0, active: false, label: "" });

  useEffect(() => {
    if (!isVisible) return;

    // Define coordinates and zoom targets in 1000x500 space
    switch (selectedFlavorId) {
      case "brown-sugar":
      case "taro":
        // Taiwan origin: (810, 220)
        setZoomStyle({
          transform: "scale(3.2)",
          transformOrigin: "810px 220px",
        });
        setRadarCoords({ x: 810, y: 220, active: true, label: "Okinawa / Taiwan" });
        break;
      case "matcha":
        // Japan / Uji origin: (835, 175)
        setZoomStyle({
          transform: "scale(3.2)",
          transformOrigin: "835px 175px",
        });
        setRadarCoords({ x: 835, y: 175, active: true, label: "Uji, Japan" });
        break;
      case "strawberry":
      case "blueberry":
      default:
        // Global / Zoomed out view
        setZoomStyle({
          transform: "scale(1)",
          transformOrigin: "500px 250px",
        });
        setRadarCoords({ x: 0, y: 0, active: false, label: "" });
        break;
    }
  }, [selectedFlavorId, isVisible]);

  return (
    <div 
      className={`w-full max-w-2xl aspect-[2/1] relative transition-opacity duration-1000 ease-in-out border border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent rounded-2xl overflow-hidden shadow-2xl ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
      }`}
    >
      {/* Background coordinate grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.03] to-transparent pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "20px 20px"
        }}
      />

      <svg
        viewBox="0 0 1000 500"
        className="w-full h-full text-white transition-transform duration-1000 ease-in-out"
        style={{
          transform: zoomStyle.transform,
          transformOrigin: zoomStyle.transformOrigin,
          transition: "transform 1.8s cubic-bezier(0.25, 1, 0.5, 1)"
        }}
      >
        {/* Simplified stylized outline of the continents */}
        
        {/* North America */}
        <polygon
          points="80,50 160,30 220,40 320,60 380,140 320,220 220,210 180,160 120,160 80,100"
          fill="rgba(255, 255, 255, 0.02)"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* South America */}
        <polygon
          points="250,220 320,220 380,310 330,450 280,410 240,300"
          fill="rgba(255, 255, 255, 0.02)"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Europe / Northern Eurasia */}
        <polygon
          points="460,40 550,30 620,50 600,120 480,120 420,90"
          fill="rgba(255, 255, 255, 0.02)"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Africa */}
        <polygon
          points="460,140 580,130 620,200 580,350 510,330 440,220"
          fill="rgba(255, 255, 255, 0.02)"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Asia */}
        <polygon
          points="620,50 780,40 900,80 940,200 860,300 700,280 600,120"
          fill="rgba(255, 255, 255, 0.02)"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Australia */}
        <polygon
          points="810,340 880,330 900,400 840,410"
          fill="rgba(255, 255, 255, 0.02)"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Stylized Island Marks */}
        {/* Japan */}
        <path
          d="M 830 160 Q 840 175 845 190"
          fill="none"
          stroke="rgba(255, 255, 255, 0.25)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Taiwan */}
        <circle
          cx="810"
          cy="220"
          r="3"
          fill="rgba(255, 255, 255, 0.5)"
        />

        {/* Pulsing origin radar dot */}
        {radarCoords.active && (
          <g>
            {/* outer ripple 1 */}
            <circle
              cx={radarCoords.x}
              cy={radarCoords.y}
              r="16"
              fill="none"
              stroke="var(--accent-color, #B56A2D)"
              strokeWidth="0.75"
              className="animate-ping"
              style={{ transformOrigin: `${radarCoords.x}px ${radarCoords.y}px` }}
            />
            {/* outer ripple 2 */}
            <circle
              cx={radarCoords.x}
              cy={radarCoords.y}
              r="8"
              fill="none"
              stroke="var(--accent-color, #B56A2D)"
              strokeWidth="1"
              opacity="0.6"
            />
            {/* Center solid indicator core */}
            <circle
              cx={radarCoords.x}
              cy={radarCoords.y}
              r="3.5"
              fill="var(--accent-color, #B56A2D)"
            />
          </g>
        )}
      </svg>

      {/* Origin floating label details */}
      {radarCoords.active && (
        <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-lg flex flex-col pointer-events-none">
          <span className="text-[9px] uppercase tracking-widest text-[#E7D8C9]/40">Origin Of Taste</span>
          <span className="text-xs font-serif italic text-white font-medium dynamic-accent-text">{radarCoords.label}</span>
        </div>
      )}
    </div>
  );
}
