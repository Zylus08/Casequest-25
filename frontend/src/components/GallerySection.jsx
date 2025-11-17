import React, { useEffect, useRef, useState } from "react";

export default function GallerySection() {
  const images = [
    { src: "/images/1.webp", alt: "Photo 1" },
    { src: "/images/got3.webp", alt: "Photo 2" },
    { src: "/images/got4.webp", alt: "Photo 3" },
    { src: "/images/got5.webp", alt: "Photo 4" },
    { src: "/images/1.webp", alt: "Photo 5" },
    { src: "/images/2.jpg", alt: "Photo 6" },
    { src: "/images/10.webp", alt: "Photo 7" },
    { src: "/images/11.webp", alt: "Photo 8" },
    { src: "/images/13.webp", alt: "Photo 9" },

  ];

  const [active, setActive] = useState(0);
  const stripRef = useRef(null);
  const scrollRaf = useRef(0);
  const heroRef = useRef(null);
  const heroImgRef = useRef(null);
  const parallaxRaf = useRef(0);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const heroIndexRaf = useRef(0);
  const touchStartRef = useRef({ x: 0, y: 0, time: 0 });

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;

    const activeThumb = el.querySelector(`[data-index='${active}']`);
    if (!activeThumb) return;

    const stripRect = el.getBoundingClientRect();
    const thumbRect = activeThumb.getBoundingClientRect();
    const thumbCenter = thumbRect.left + thumbRect.width / 2;
    const stripCenter = stripRect.left + stripRect.width / 2;

    const offset = thumbCenter - stripCenter;

    el.scrollBy({
      left: offset,
      behavior: 'smooth'
    });
  }, [active]);

  useEffect(() => {
    const img = heroImgRef.current;
    if (!img) return;
    targetRef.current = { x: 0, y: 0 };
    currentRef.current = { x: 0, y: 0 };
    img.style.transform = `translate3d(0px, 0px, 0) scale(1.08)`;
  }, [active]);

  useEffect(() => {
    return () => {
      if (parallaxRaf.current) cancelAnimationFrame(parallaxRaf.current);
      parallaxRaf.current = 0;
    };
  }, []);

  const startParallax = () => {
    if (parallaxRaf.current) return;
    const step = () => {
      const img = heroImgRef.current;
      if (!img) { parallaxRaf.current = 0; return; }
      const ease = 0.08;
      const cur = currentRef.current;
      const tgt = targetRef.current;
      cur.x += (tgt.x - cur.x) * ease;
      cur.y += (tgt.y - cur.y) * ease;
      img.style.transform = `translate3d(${cur.x.toFixed(2)}px, ${cur.y.toFixed(2)}px, 0) scale(1.08)`;
      if (Math.abs(cur.x - tgt.x) < 0.2 && Math.abs(cur.y - tgt.y) < 0.2 && tgt.x === 0 && tgt.y === 0) {
        parallaxRaf.current = 0;
        return;
      }
      parallaxRaf.current = requestAnimationFrame(step);
    };
    parallaxRaf.current = requestAnimationFrame(step);
  };

  const onHeroMouseMove = (e) => {
    const hero = heroRef.current;
    if (!hero) return;
    const rect = hero.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    const dx = (nx - 0.5) * 2;
    const dy = (ny - 0.5) * 2;
    const maxX = 60;
    const maxY = 20;
    targetRef.current = { x: dx * maxX, y: dy * maxY };
    startParallax();

    if (!heroIndexRaf.current) {
      heroIndexRaf.current = requestAnimationFrame(() => {
        heroIndexRaf.current = 0;
        const idx = Math.max(0, Math.min(images.length - 1, Math.round(nx * (images.length - 1))));
        setActive((prev) => (prev === idx ? prev : idx));
      });
    }
  };

  const onHeroLeave = () => {
    targetRef.current = { x: 0, y: 0 };
    startParallax();
  };

  const onTouchStart = (e) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY, time: Date.now() };
  };

  const onTouchEnd = (e) => {
    if (!touchStartRef.current.time) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;
    const dt = Date.now() - touchStartRef.current.time;
    const minSwipeDistance = 50;
    const maxSwipeTime = 300;

    if (dt < maxSwipeTime && Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > minSwipeDistance) {
      if (dx > 0) {
        setActive((a) => (a - 1 + images.length) % images.length);
      } else {
        setActive((a) => (a + 1) % images.length);
      }
    }
    touchStartRef.current = { x: 0, y: 0, time: 0 };
  };

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;

    const updateActiveFromScroll = () => {
      const center = el.scrollLeft + el.clientWidth / 2;
      const thumbs = Array.from(el.querySelectorAll('.thumb'));
      let closestIdx = 0;
      let best = Infinity;
      thumbs.forEach((node, idx) => {
        const nodeCenter = node.offsetLeft + node.offsetWidth / 2;
        const d = Math.abs(nodeCenter - center);
        if (d < best) {
          best = d;
          closestIdx = idx;
        }
      });
      setActive((prev) => (prev === closestIdx ? prev : closestIdx));
    };

    const onScroll = () => {
      if (scrollRaf.current) cancelAnimationFrame(scrollRaf.current);
      scrollRaf.current = requestAnimationFrame(updateActiveFromScroll);
    };

    const onWheel = (e) => {
      const predominatelyVertical = Math.abs(e.deltaY) > Math.abs(e.deltaX);
      if (!predominatelyVertical) return;
      const atStart = el.scrollLeft <= 0;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
      if ((e.deltaY < 0 && !atStart) || (e.deltaY > 0 && !atEnd)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    el.addEventListener('wheel', onWheel, { passive: false });
    updateActiveFromScroll();

    return () => {
      el.removeEventListener('scroll', onScroll);
      el.removeEventListener('wheel', onWheel);
      if (scrollRaf.current) cancelAnimationFrame(scrollRaf.current);
      scrollRaf.current = 0;
    };
  }, []);

  const onKey = (e) => {
    if (e.key === 'ArrowRight') setActive((a) => (a + 1) % images.length);
    if (e.key === 'ArrowLeft') setActive((a) => (a - 1 + images.length) % images.length);
  };

  return (
    <div className="gallery-page" onKeyDown={onKey} tabIndex={0}>
      <style>{`  html, body {
    background: var(--bg);
    margin: 0;
    padding: 0;
  }

  .gallery-page {
    min-height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr auto;
    position: relative;
    background: url('images/bg1.png') center/cover fixed no-repeat;
    color: #fff;
    padding-top: var(--navbar-height, 64px);
    width: 100%;
    overflow-x: hidden;
    box-sizing: border-box;
  }
      .container { width: min(1100px, 92%); margin: 0 auto; position: relative; box-sizing: border-box; }
        .hero { position: relative; width: 100%; max-width: 100%; height: clamp(280px, 50vw, 520px); margin: 24px auto; overflow: hidden; display:flex; justify-content:center; align-items:center; border-radius: 18px; box-shadow: 0 16px 40px rgba(0,0,0,0.45); box-sizing: border-box; display: flex; justify-content: center; align-items: center; }
        .hero img { width: 100%; height: 100%; border-radius: 18px; display:block; object-fit: cover; filter: none; will-change: transform; transform: translate3d(0,0,0) scale(1.08); box-shadow: none; max-width: 100%; max-height: 100%; object-fit: contain; }
        .hero::after { content: ""; position:absolute; left:0; right:0; bottom:0; height: 45%; border-radius: 18px; pointer-events:none; background: linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,0.45)); }
        .topbar { display:none; }
        .brand { display:flex; align-items:center; gap:10px; font-weight:700; letter-spacing:1px; }
        .nav { display:flex; gap:20px; font-size:14px; opacity:.9; }

        .strip-wrap { position: relative; margin-top: 0; padding: 0 8px; width: 100%; box-sizing: border-box; overflow-x: hidden; }
        .strip { display:flex; gap:14px; overflow-x:auto; -ms-overflow-style: none; padding:16px 0 10px; scrollbar-width: none; -webkit-overflow-scrolling: touch; scroll-behavior: smooth; width: 100%; box-sizing: border-box; justify-content: center; scroll-snap-type: x mandatory; scroll-padding: 0 50%; }
        .strip::-webkit-scrollbar { display:none; }
        .thumb { position:relative; width:120px; height:80px; flex:0 0 auto; border-radius:12px; overflow:hidden; background:#0b0f14; outline:1px solid rgba(255,255,255,0.08); box-shadow: 0 6px 18px rgba(0,0,0,0.35); cursor:pointer; transition: transform .2s ease, outline-color .2s ease, box-shadow .2s ease; touch-action: manipulation; -webkit-tap-highlight-color: transparent; scroll-snap-align: center;}
        .thumb img { width:100%; height:100%; object-fit:cover; display:block; pointer-events: none; }
        .thumb:hover { transform: translateY(-3px); box-shadow: 0 12px 24px rgba(0,0,0,0.45); }
        .thumb:active { transform: translateY(-1px) scale(0.98); }
        .thumb.active { outline:2px solid #00d4a6; box-shadow: 0 18px 36px rgba(0, 212, 166, 0.25); }

        .controls { position:absolute; inset:0; display:flex; align-items:center; justify-content:space-between; pointer-events:none; }
        .btn { pointer-events:auto; width:38px; height:38px; border-radius:999px; background: rgba(0,0,0,0.5); border:1px solid rgba(255,255,255,0.1); display:grid; place-items:center; color:#cfe; cursor:pointer; touch-action: manipulation; -webkit-tap-highlight-color: transparent; }
        .btn:hover { background: rgba(0,0,0,0.7); }
        .btn:active { transform: scale(0.95); }
        
        @media (max-width: 1200px) {
          .container { width: 92%; }
          .hero { height: clamp(300px, 45vw, 400px); }
        }

        @media (max-width: 900px) {
          .container { width: 95%; }
          .hero { height: clamp(250px, 55vh, 350px); margin: 20px auto; }
          .thumb { width: 96px; height: 64px; }
        }

        @media (max-width: 768px) {
          .gallery-page { padding-top: var(--navbar-height, 56px); }
          .container { width: 96%; padding: 0 8px; max-width: 100vw; }
          .hero { height: clamp(220px, 50vh, 320px) !important; margin: 16px auto; border-radius: 12px; max-height: 50vh; width: calc(100% - 16px); }
          .hero img { border-radius: 12px; }
          .hero::after { border-radius: 12px; }
          .strip-wrap { padding: 0 4px; width: 100%; }
          .strip { gap: 10px; padding: 12px 0 8px; }
          .thumb { width: 80px; height: 56px; border-radius: 8px; min-width: 80px; }
          .btn { width: 36px; height: 36px; font-size: 14px; min-width: 36px; min-height: 36px; }
        }

        @media (max-width: 480px) {
          .gallery-page { padding-top: var(--navbar-height, 48px); }
          .container { width: 100%; padding: 0 4px; max-width: 100vw; }
          .hero { height: clamp(200px, 45vh, 280px) !important; margin: 10px auto; border-radius: 10px; max-height: 45vh; width: calc(100% - 8px); }
          .hero img { border-radius: 10px; }
          .hero::after { border-radius: 10px; }
          .strip-wrap { padding: 0 2px; width: 100%; }
          .strip { gap: 8px; padding: 10px 0 6px; }
          .thumb { width: 70px; height: 50px; border-radius: 6px; min-width: 70px; }
          .thumb.active { outline-width: 1.5px; }
          .btn { width: 32px; height: 32px; font-size: 12px; min-width: 32px; min-height: 32px; }
        }

        @media (max-width: 360px) {
          .container { padding: 0 2px; }
          .hero { height: clamp(180px, 40vh, 240px) !important; margin: 8px auto; max-height: 40vh; }
          .thumb { width: 60px; height: 42px; min-width: 60px; }
          .strip { gap: 6px; }
          .btn { width: 30px; height: 30px; min-width: 30px; min-height: 30px; }
        }
      `}</style>

      <div className="topbar">
        <div className="brand">ROEL</div>
        <nav className="nav">
          <span>Home</span>
          <span style={{color:'#00d4a6'}}>Portfolio</span>
          <span>Services</span>
          <span>About</span>
        </nav>
      </div>

      <div className="container">
        <section className="hero" ref={heroRef} onMouseMove={onHeroMouseMove} onMouseLeave={onHeroLeave} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <img ref={heroImgRef} src={images[active].src} alt={images[active].alt} />
        </section>
      </div>

      <div className="strip-wrap">
        <div className="controls">
          <button className="btn" onClick={() => setActive((a)=> (a-1+images.length)%images.length)}>{'<'}</button>
          <button className="btn" onClick={() => setActive((a)=> (a+1)%images.length)}>{'>'}</button>
        </div>
        <div className="strip" ref={stripRef}>
          {images.map((img, i)=> (
            <button key={i} className={`thumb ${i===active? 'active':''}`} data-index={i} onClick={()=> setActive(i)}>
              <img src={img.src} alt={img.alt} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
