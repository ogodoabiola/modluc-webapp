"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  hue: number;
  growing: boolean;
}

export function BackgroundAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const particles: Particle[] = [];
    const particleCount = 70;
    const baseHue = 0; // Red base color
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.1,
        hue: baseHue + Math.random() * 20 - 10,
        growing: Math.random() > 0.5
      });
    }
    
    const animate = () => {
      ctx.fillStyle = 'rgba(26, 19, 51, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        // Update particle positions with slight acceleration
        particle.x += particle.speedX * (1 + Math.random() * 0.2);
        particle.y += particle.speedY * (1 + Math.random() * 0.2);
        
        // Boundary check with smooth transition
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;

        // Pulsating size effect
        if (particle.growing) {
          particle.size += 0.02;
          if (particle.size > 3) particle.growing = false;
        } else {
          particle.size -= 0.02;
          if (particle.size < 1) particle.growing = true;
        }
        
        // Draw particle with color variation
        const color = `hsla(${particle.hue}, 84%, 71%, ${particle.opacity})`;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Connect particles with gradient lines
      connectParticles(particles, ctx, 150);
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-70"
    />
  );
}

function connectParticles(particles: Particle[], ctx: CanvasRenderingContext2D, maxDistance: number) {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < maxDistance) {
        const opacity = (1 - distance / maxDistance) * 0.15;
        const gradient = ctx.createLinearGradient(
          particles[i].x,
          particles[i].y,
          particles[j].x,
          particles[j].y
        );
        
        gradient.addColorStop(0, `hsla(${particles[i].hue}, 84%, 71%, ${opacity})`);
        gradient.addColorStop(1, `hsla(${particles[j].hue}, 84%, 71%, ${opacity})`);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
} 