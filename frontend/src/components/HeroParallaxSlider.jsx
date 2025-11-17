import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./css/HeroParallaxSlider.css";

export default function HeroParallaxSlider() {
  const containerRef = useRef(null);
  const pinRef = useRef(null);
  const REGISTER_URL = "https://saturnalia.in/events/business/bizquest";

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const slides = gsap.utils.toArray(".hp-slide");
    const captions = gsap.utils.toArray(".hp-caption");

    if (!slides.length) return;

    gsap.set(slides, { opacity: 0, scale: 1.08 });
    gsap.set(slides[0], { opacity: 1, scale: 1 });
    gsap.set(captions, { opacity: 0, y: 20 });
    if (captions[0]) gsap.set(captions[0], { opacity: 1, y: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * (slides.length + 0.5)}`,
        scrub: true,
        pin: pinRef.current,
        anticipatePin: 1,
      },
      defaults: { ease: "none" },
    });

    slides.forEach((_, i) => {
      if (i === 0) return;
      const prev = slides[i - 1];
      const curr = slides[i];
      const prevCap = captions[i - 1];
      const currCap = captions[i];

      tl.to(prev, { opacity: 0, scale: 1.12 }, ">")
        .fromTo(curr, { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: 0.6 }, "<")
        .to(prevCap, { opacity: 0, y: -10, duration: 0.3 }, "<")
        .fromTo(currCap, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.45 }, "<0.1");
    });

    slides.forEach((s, i) => {
      const depth = 10 + i * 6;
      gsap.to(s, {
        yPercent: -6 - i * 2,
        scale: "+=0.02",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
      s.style.setProperty("--z", String(-i));
      s.style.zIndex = String(100 - i);
    });

    // Fade CTAs just BEFORE the VIDEO section starts (so they don't overlap the video/gallery)
    gsap.to(".hp-ctas", {
      opacity: 0,
      y: 10,
      ease: "none",
      scrollTrigger: {
        trigger: ".scroll-showcase",
        start: "top 90%",
        end: "top 70%",
        scrub: true,
      },
      onUpdate: function () {
        const el = document.querySelector(".hp-ctas");
        if (!el) return;
        const o = gsap.getProperty(el, "opacity");
        el.style.pointerEvents = o < 0.1 ? "none" : "auto";
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      tl.kill();
    };
  }, []);

  const [imgReady, setImgReady] = useState({ l1: false, l2: false, title: false });
  const allReady = imgReady.l1 && imgReady.l2 && imgReady.title;

  return (
    <section ref={containerRef} className="hero-slider">
      <div ref={pinRef} className="hp-viewport">
        <div className="hp-slides">
          <div className="hp-slide" style={{ backgroundImage: "url('https://cdna.artstation.com/p/assets/videos/images/005/821/518/large/tom-whaley-maxresdefault.jpg?1493993659')" }} />
          <div className="hp-slide" style={{ backgroundImage: "url('https://cdna.artstation.com/p/assets/videos/images/005/821/518/large/tom-whaley-maxresdefault.jpg?1493993659')" }} />
          <div className="hp-slide" style={{ backgroundImage: "url('https://cdna.artstation.com/p/assets/videos/images/005/821/518/large/tom-whaley-maxresdefault.jpg?1493993659')" }} />
          <div className="hp-slide" style={{ backgroundImage: "url('https://cdna.artstation.com/p/assets/videos/images/005/821/518/large/tom-whaley-maxresdefault.jpg?1493993659')" }} />
        </div>

        <div className="hp-overlay" />

        <div className="hp-captions" style={{ opacity: allReady ? 1 : 0, transition: "opacity 400ms ease" }}>
          <div className="hp-caption">
            <div className="hp-logos" aria-label="Presented by">
              <img src="/images/logo.png" alt="Logo 1" width="200" height="60" decoding="async" loading="eager" onLoad={() => setImgReady(s => ({ ...s, l1: true }))} />
              <span className="hp-x">×</span>
              <span className="hp-logo2"><img src="/images/logo2.png" alt="Logo 2" width="200" height="60" decoding="async" loading="eager" onLoad={() => setImgReady(s => ({ ...s, l2: true }))} /></span>
            </div>
            <h2 className="hp-presents">PRESENTS</h2>
             {/* <h2 className="ss-kicker">TVC x SAT presents</h2>
        <h1 className="ss-title">CASE QUEST</h1>
        <p className="ss-sub">A Game of Thrones themed business case expedition</p> */}
          </div>
          <div className="hp-caption">
            {/* <span className="hp-kicker">CASE QUEST</span>
            <h1 className="hp-title">Fire And Blood</h1> */}
            <h1 className="ss-title"><img src="/casequest.png" alt="Case Quest" width="800" height="200" decoding="async" loading="eager" onLoad={() => setImgReady(s => ({ ...s, title: true }))} /></h1>
          </div>
          {/* <div className="hp-caption">
           <h1 className="ss-title">CASE QUEST VIDHIIIII</h1>
        <p className="ss-sub">A Game of Thrones themed business case expedition</p> 
          </div> */}
          <div className="hp-ctas">
            {/* <button
              className="cta-primary"
              onClick={() => {
                window.location.href = REGISTER_URL;
              }}
            >
              REGISTER NOW
            </button>
            <button className="cta-secondary">FAQs</button> */}
          </div>
        </div>
      </div>
    </section>
  );
}
