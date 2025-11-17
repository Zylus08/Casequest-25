// src/components/ScrollShowcase.jsx
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./css/ScrollShowcase.css";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollShowcase() {
  
  const rootRef = useRef(null);
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const sections = root.querySelectorAll(".ss-panel");

    sections.forEach((panel, i) => {
      // Only animate the first (video) panel; skip any panels after it
      if (i > 0) return;
      const media = panel.querySelector(".ss-media");
      const text = panel.querySelector(".ss-text");

      gsap.fromTo(
        media,
        { scale: 1.08, opacity: 0.0 },
        {
          scale: 1.0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: panel,
            start: "top 80%",
            end: "top 30%",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        text,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: panel,
            start: "top 70%",
            end: "top 40%",
            scrub: true,
          },
        }
      );
    });

    // Remove pinning so there's no scroll effect after the video

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section className="scroll-showcase" ref={rootRef}>
      <div className="ss-intro">
        <h2 className="ss-kicker">TVC x SAT presents</h2>
        <h1 className="ss-title">CASE QUEST</h1>      
      </div>

      <div className="ss-wrapper">
        <article className="ss-panel">
          <video
            ref={videoRef}
            className="ss-media"
            src="/videos/aftermovie.mp4"
            autoPlay
            muted={isMuted}
            loop
            playsInline
          />
          <button onClick={toggleMute} className="mute-btn">
            {isMuted ? "🔇" : "🔊"}
          </button>
        </article>

        {/* <article className="ss-panel">
          <div className="ss-media" style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=2000&auto=format&fit=crop)`
          }} />
          <div className="ss-text">
            <span className="ss-tag">Komodo</span>
            <h3>Pink Sands & Dragon Isles</h3>
          </div>
        </article>

        <article className="ss-panel">
          <div className="ss-media" style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=2000&auto=format&fit=crop)`
          }} />
          <div className="ss-text">
            <span className="ss-tag">Banda Sea</span>
            <h3>Spice Route & Blue Pelagics</h3> */}
          {/* </div>
        </article> */}
      </div>
    </section>
  );
}
