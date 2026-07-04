"use client";

import { useEffect, useRef } from "react";

interface Particle {
  id: number;
  type: "brown-sugar" | "matcha" | "strawberry" | "blueberry" | "taro";
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  life: number;
  maxLife: number;
  wobbleSpeed: number;
  wobbleDistance: number;
  wobbleAngle: number;
}

interface ParticleBackgroundProps {
  selectedFlavorId: string;
}

export default function ParticleBackground({ selectedFlavorId }: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const scrollYRef = useRef(0);
  const scrollVelocityRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0, vx: 0, vy: 0, lastX: 0, lastY: 0 });

  // Map flavor selection to particle types
  const flavorType = (selectedFlavorId === "brown-sugar" || selectedFlavorId === "matcha" || selectedFlavorId === "strawberry" || selectedFlavorId === "blueberry" || selectedFlavorId === "taro")
    ? selectedFlavorId
    : "brown-sugar";

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

    // Scroll listener for velocity calculation
    scrollYRef.current = window.scrollY;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const diff = Math.abs(currentScroll - scrollYRef.current);
      scrollVelocityRef.current += diff * 0.15; // accumulate velocity
      scrollYRef.current = currentScroll;
    };

    // Mouse listener to inject drift velocity
    const handleMouseMove = (e: MouseEvent) => {
      const mouse = mouseRef.current;
      mouse.vx = (e.clientX - mouse.lastX) * 0.15;
      mouse.vy = (e.clientY - mouse.lastY) * 0.15;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.lastX = e.clientX;
      mouse.lastY = e.clientY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove);

    // Particle generator helper
    let nextId = 0;
    const spawnParticle = (type: Particle["type"], isInitial = false) => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      const x = Math.random() * w;
      let y = type === "matcha" || type === "strawberry" ? -10 : h + 10; // fall from top or float from bottom
      if (isInitial) {
        y = Math.random() * h;
      }

      const vx = (Math.random() - 0.5) * 0.4;
      let vy = 0;
      let radius = 0;
      let color = "";
      let opacity = Math.random() * 0.35 + 0.1;
      let maxLife = Math.random() * 200 + 150;
      const rotation = Math.random() * Math.PI * 2;
      let rotationSpeed = (Math.random() - 0.5) * 0.02;
      const wobbleSpeed = Math.random() * 0.03 + 0.01;
      let wobbleDistance = Math.random() * 1.2 + 0.3;

      switch (type) {
        case "brown-sugar": // caramel dust rising
          radius = Math.random() * 2.5 + 1;
          vy = -(Math.random() * 0.5 + 0.3);
          color = Math.random() > 0.3 ? "#B56A2D" : "#FFF8F1";
          break;
        case "matcha": // green dust and tea leaves falling
          const isLeaf = Math.random() > 0.7;
          radius = isLeaf ? Math.random() * 4 + 3 : Math.random() * 2 + 1;
          vy = Math.random() * 0.4 + 0.3; // falling
          color = isLeaf ? "#4A6E37" : "#80A868";
          maxLife = isLeaf ? maxLife * 1.5 : maxLife;
          break;
        case "strawberry": // red petals falling
          radius = Math.random() * 5 + 3;
          vy = Math.random() * 0.5 + 0.4; // falling
          color = Math.random() > 0.4 ? "#C2546E" : "#D67B8E";
          rotationSpeed = (Math.random() - 0.5) * 0.04;
          wobbleDistance = Math.random() * 2.5 + 1.0;
          break;
        case "blueberry": // sparkling blue stars rising
          radius = Math.random() * 2 + 1;
          vy = -(Math.random() * 0.4 + 0.2);
          color = Math.random() > 0.3 ? "#5263A8" : "#8B9BD6";
          break;
        case "taro": // lavender mist floating
          radius = Math.random() * 12 + 6; // larger blurry particles
          vy = -(Math.random() * 0.3 + 0.15);
          color = "#9D80B5";
          opacity = Math.random() * 0.1 + 0.05; // very faint
          wobbleDistance = Math.random() * 0.8 + 0.2;
          break;
      }

      return {
        id: nextId++,
        type,
        x,
        y,
        vx,
        vy,
        radius,
        color,
        opacity,
        rotation,
        rotationSpeed,
        life: maxLife,
        maxLife,
        wobbleSpeed,
        wobbleDistance,
        wobbleAngle: Math.random() * Math.PI * 2,
      };
    };

    // Populate initial particles
    const initialCount = 45;
    for (let i = 0; i < initialCount; i++) {
      particlesRef.current.push(spawnParticle(flavorType, true));
    }

    let animationFrameId: number;

    const updateAndDraw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Decay scroll velocity and mouse velocity
      scrollVelocityRef.current *= 0.95;
      const mouse = mouseRef.current;
      mouse.vx *= 0.92;
      mouse.vy *= 0.92;

      // Spawn new particles periodically based on flavor type
      const currentParticles = particlesRef.current;
      const targetCount = flavorType === "taro" ? 30 : 65; // taro needs fewer particles since they are larger
      if (currentParticles.length < targetCount && Math.random() < 0.18) {
        currentParticles.push(spawnParticle(flavorType));
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      for (let i = currentParticles.length - 1; i >= 0; i--) {
        const p = currentParticles[i];
        p.life--;

        if (p.life <= 0) {
          currentParticles.splice(i, 1);
          continue;
        }

        // Calculate motion influence (scrolling accelerates vertical movement)
        const scrollFactor = 1 + scrollVelocityRef.current * 0.25;
        p.wobbleAngle += p.wobbleSpeed;
        const drift = Math.sin(p.wobbleAngle) * p.wobbleDistance;

        // Apply velocities, scroll factors, and mouse wind resistance
        const mouseInfluenceX = mouse.vx * (p.radius / 10);
        const mouseInfluenceY = mouse.vy * (p.radius / 10);

        p.x += p.vx + drift * 0.15 + mouseInfluenceX;
        p.y += (p.vy * scrollFactor) + mouseInfluenceY;
        p.rotation += p.rotationSpeed;

        // Boundary wrap
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.type === "matcha" || p.type === "strawberry") {
          // falling particles wrap to top
          if (p.y > h + 20) {
            p.y = -20;
            p.x = Math.random() * w;
          }
        } else {
          // rising particles wrap to bottom
          if (p.y < -20) {
            p.y = h + 20;
            p.x = Math.random() * w;
          }
        }

        // Fade near end of life
        const lifeRatio = p.life / p.maxLife;
        const currentOpacity = p.opacity * (lifeRatio > 0.15 ? 1 : lifeRatio / 0.15);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        // Draw particle based on flavor styling
        if (p.type === "strawberry") {
          // Draw pink/crimson flower petals (ellipses)
          ctx.beginPath();
          ctx.ellipse(0, 0, p.radius, p.radius * 0.6, 0, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = currentOpacity;
          ctx.fill();
        } else if (p.type === "matcha" && p.radius > 2.5) {
          // Draw Matcha leaves (leaf shapes with center vein)
          ctx.beginPath();
          ctx.moveTo(0, -p.radius);
          ctx.quadraticCurveTo(p.radius * 0.7, 0, 0, p.radius);
          ctx.quadraticCurveTo(-p.radius * 0.7, 0, 0, -p.radius);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = currentOpacity;
          ctx.fill();
        } else if (p.type === "taro") {
          // Lavender mist (soft blurry circles)
          const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.radius);
          grad.addColorStop(0, p.color);
          grad.addColorStop(1, "rgba(157, 128, 181, 0)");
          ctx.beginPath();
          ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.globalAlpha = currentOpacity;
          ctx.fill();
        } else if (p.type === "blueberry") {
          // Sparkling stars (4-point star shapes)
          ctx.beginPath();
          for (let k = 0; k < 4; k++) {
            ctx.rotate(Math.PI / 2);
            ctx.lineTo(0, -p.radius * 1.5);
            ctx.lineTo(p.radius * 0.3, 0);
          }
          ctx.closePath();
          ctx.fillStyle = p.color;
          ctx.globalAlpha = currentOpacity;
          ctx.fill();
        } else {
          // Default small glowing round dust (Brown sugar / minor matcha dust)
          ctx.beginPath();
          ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = currentOpacity;
          ctx.fill();
        }

        ctx.restore();
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(updateAndDraw);
    };

    updateAndDraw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [flavorType]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen pointer-events-none z-10"
    />
  );
}
