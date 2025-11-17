// src/components/Landing.jsx
import React, { useEffect } from "react";
import "./css/Landing.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroParallaxSlider from "./HeroParallaxSlider";

const REGISTER_URL = "https://saturnalia.in/events/business/bizquest";
export default function Landing() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // Subsequent sections gentle fade-in while scrolling past
    gsap.from(".feature-card", { opacity: 0, y: 18, duration: 0.8, stagger: 0.1, ease: "power2.out", scrollTrigger: { trigger: ".features-section", start: "top 80%" } });
    gsap.from(".suites-section", { opacity: 0, y: 24, duration: 0.9, ease: "power2.out", scrollTrigger: { trigger: ".suites-section", start: "top 80%" } });
    // gsap.from(".experience-card", { opacity: 0, y: 20, duration: 0.8, stagger: 0.1, ease: "power2.out", scrollTrigger: { trigger: ".experiences-section", start: "top 80%" } });
  }, []);

  const handleRegister = () => {
    window.open(REGISTER_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <main>
      <HeroParallaxSlider />

      {/* <section className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <h3 className="feature-title">Expeditions</h3>
            <p className="feature-text">Journey through Raja Ampat, Komodo, and the Banda Sea with tailored routes.</p>
          </div>
          <div className="feature-card">
            <h3 className="feature-title">Suites</h3>
            <p className="feature-text">Spacious, ocean‑view cabins with artisanal materials and calm palettes.</p>
          </div>
          <div className="feature-card">
            <h3 className="feature-title">Onboard Experience</h3>
            <p className="feature-text">Fine dining, deck lounges, spa treatments, and expert expedition crew.</p>
          </div>
        </div>
      </section> */}

      <section className="suites-section container">
        <div className="suites-image" role="img" aria-label="Suite preview" />
        {/* <div className="suites-content">
          <div className="cta-group">
            <button className="cta-secondary">Explore Suites</button>
          </div>
        </div> */}
      </section>

      <section className="experiences-section">
        <div className="container experiences-grid">
          {/* <div className="experience-card">
            <video
              className="experience-media"
              src="/videos/aftermovie1.mp4"
              autoPlay
              muted
              loop
              playsInline
            />
          
          </div> */}
          {/* <div className="experience-card">
            <div className="experience-media" />
            <div className="experience-body">
              <span className="experience-tag"></span>
            </div>
          </div> */}
          {/* <div className="experience-card">
            <div className="experience-media" />
            <div className="experience-body">
              <span className="experience-tag">Banda Sea</span>
              <h3 className="experience-title">Spice Route & Blue Pelagics</h3>
            </div>
          </div> */}
        </div>
      </section>
    </main>
  );
}
