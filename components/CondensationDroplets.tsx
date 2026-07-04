"use client";

import { useEffect, useRef } from "react";

interface Droplet {
  x: number;
  y: number;
  radius: number;
  speed: number;
  opacity: number;
  isSliding: boolean;
  trail: { x: number; y: number; r: number }[];
}

export default function CondensationDroplets() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dropletsRef = useRef<Droplet[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth * (window.devicePixelRatio || 1);
      canvas.height = window.innerHeight * (window.devicePixelRatio || 1);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const spawnDroplet = (isSliding = false) => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Draw droplets primarily in the center third (where the cup is)
      const cupWidth = Math.min(w * 0.3, 400);
      const minX = w / 2 - cupWidth / 2;
      const maxX = w / 2 + cupWidth / 2;
      const x = minX + Math.random() * (maxX - minX);

      // Droplets start in upper-middle part of the cup
      const minY = h * 0.25;
      const maxY = h * 0.75;
      const y = isSliding ? minY : minY + Math.random() * (maxY - minY);

      return {
        x,
        y,
        radius: Math.random() * 2 + 1, // 1px to 3px radius
        speed: isSliding ? Math.random() * 0.4 + 0.2 : 0, // sliding speed
        opacity: Math.random() * 0.35 + 0.15,
        isSliding,
        trail: [],
      };
    };

    // Populate initial static droplets
    const initialCount = 15;
    for (let i = 0; i < initialCount; i++) {
      dropletsRef.current.push(spawnDroplet(false));
    }

    let animationFrameId: number;
    let lastSpawnTime = Date.now();

    const updateAndDraw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const dpr = window.devicePixelRatio || 1;

      ctx.save();
      ctx.scale(dpr, dpr);

      const droplets = dropletsRef.current;
      const now = Date.now();

      // Occasionally spawn a sliding droplet (every 4-6 seconds)
      if (now - lastSpawnTime > 5000 && droplets.filter((d) => d.isSliding).length < 3) {
        droplets.push(spawnDroplet(true));
        lastSpawnTime = now;
      }

      for (let i = droplets.length - 1; i >= 0; i--) {
        const d = droplets[i];

        if (d.isSliding) {
          // Slide down slowly
          d.y += d.speed;

          // Add wiggle/meandering path to make it look like a natural droplet trickle
          d.x += Math.sin(d.y * 0.05) * 0.15;

          // Record trail
          d.trail.push({ x: d.x, y: d.y, r: d.radius });
          if (d.trail.length > 25) {
            d.trail.shift();
          }

          // If it slides past the bottom of the cup range, recycle or destroy it
          if (d.y > window.innerHeight * 0.8) {
            droplets.splice(i, 1);
            continue;
          }
        }

        // Draw trail (water path left by sliding droplet)
        if (d.isSliding && d.trail.length > 0) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${d.opacity * 0.15})`;
          ctx.lineWidth = d.radius * 1.5;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.moveTo(d.trail[0].x, d.trail[0].y);
          for (let k = 1; k < d.trail.length; k++) {
            ctx.lineTo(d.trail[k].x, d.trail[k].y);
          }
          ctx.stroke();
        }

        // Draw droplet body
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        
        // Transparent gray filling for refraction look
        ctx.fillStyle = `rgba(255, 255, 255, ${d.opacity})`;
        ctx.fill();

        // Dark refraction outline at the bottom
        ctx.beginPath();
        ctx.arc(d.x, d.y + 0.5, d.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 0, 0, ${d.opacity * 0.4})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Shiny specular reflection highlight dot at top-left
        ctx.beginPath();
        ctx.arc(d.x - d.radius * 0.3, d.y - d.radius * 0.3, d.radius * 0.25, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${d.opacity * 0.95})`;
        ctx.fill();
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(updateAndDraw);
    };

    updateAndDraw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen pointer-events-none z-20"
    />
  );
}
