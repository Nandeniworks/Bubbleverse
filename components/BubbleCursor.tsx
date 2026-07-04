"use client";

import { useEffect, useRef } from "react";

interface Bubble {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  wobbleSpeed: number;
  wobbleDistance: number;
  angle: number;
  life: number;
  maxLife: number;
}

export default function BubbleCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubblesRef = useRef<Bubble[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false, lastSpawnTime: 0 });

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

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;

      const now = Date.now();
      // Spawn bubble at most every 45ms
      if (now - mouseRef.current.lastSpawnTime > 45) {
        spawnBubble(e.clientX, e.clientY);
        mouseRef.current.lastSpawnTime = now;
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const spawnBubble = (x: number, y: number) => {
      const radius = Math.random() * 4 + 2; // 2px to 6px radius
      const maxLife = Math.random() * 100 + 80; // duration
      bubblesRef.current.push({
        x,
        y: y + 5, // slightly offset below cursor
        vx: (Math.random() - 0.5) * 0.5,
        vy: -(Math.random() * 0.8 + 0.6), // float up
        radius,
        opacity: Math.random() * 0.4 + 0.15,
        wobbleSpeed: Math.random() * 0.05 + 0.02,
        wobbleDistance: Math.random() * 1.5 + 0.5,
        angle: Math.random() * Math.PI * 2,
        life: maxLife,
        maxLife,
      });
    };

    let animationFrameId: number;

    const updateAndDraw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const dpr = window.devicePixelRatio || 1;

      // Scale drawing contexts for DPR
      ctx.save();
      ctx.scale(dpr, dpr);

      const bubbles = bubblesRef.current;
      for (let i = bubbles.length - 1; i >= 0; i--) {
        const b = bubbles[i];
        b.life--;

        if (b.life <= 0) {
          bubbles.splice(i, 1);
          continue;
        }

        // Apply velocities and wobble (sine wave horizontal drift)
        b.angle += b.wobbleSpeed;
        const drift = Math.sin(b.angle) * b.wobbleDistance;
        b.x += b.vx + drift * 0.1;
        b.y += b.vy;

        // Shrink slightly near the end of life
        const lifeRatio = b.life / b.maxLife;
        const currentRadius = b.radius * (0.3 + 0.7 * lifeRatio);
        const currentOpacity = b.opacity * (lifeRatio > 0.2 ? 1 : lifeRatio / 0.2);

        // Draw bubble circle
        ctx.beginPath();
        ctx.arc(b.x, b.y, currentRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${currentOpacity * 0.8})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Shiny specular reflection highlight dot
        ctx.beginPath();
        ctx.arc(b.x - currentRadius * 0.3, b.y - currentRadius * 0.3, currentRadius * 0.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity * 0.9})`;
        ctx.fill();
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(updateAndDraw);
    };

    updateAndDraw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen pointer-events-none z-50"
    />
  );
}
