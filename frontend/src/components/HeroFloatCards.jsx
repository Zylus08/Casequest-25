// src/components/HeroFloatCards.jsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./css/HeroFloatCards.css";

export default function HeroFloatCards() {
  const rootRef = useRef(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const cards = el.querySelectorAll(".hfc-card");

    // subtle mouse parallax for the whole group; scroll entrance handled by parent timeline
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const cx = (e.clientX - r.left) / r.width - 0.5;
      const cy = (e.clientY - r.top) / r.height - 0.5;
      cards.forEach((card, idx) => {
        const strength = 10 + idx * 6;
        gsap.to(card, {
          x: cx * strength,
          y: "+=" + cy * 0, // y handled by entrance; keep stable
          rotateY: cx * 6,
          rotateX: -cy * 6,
          transformPerspective: 800,
          transformOrigin: "center",
          ease: "power3.out",
          duration: 0.3,
        });
      });
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="hero-float-cards" ref={rootRef} aria-hidden>
      <div className="hfc-card hfc-left" style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1517955496755-25bfb7d1fdae?q=80&w=1600&auto=format&fit=crop)`
      }} />
      <div className="hfc-card hfc-right" style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1542044801-853505a5382a?q=80&w=1600&auto=format&fit=crop)`
      }} />
      <div className="hfc-card hfc-bottom" style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop)`
      }} />
    </div>
  );
}
