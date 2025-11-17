import React, { useState, useEffect, useRef } from 'react';

const About = () => {
  const [activeSection, setActiveSection] = useState('event');

  const scrollingLockRef = useRef(false);
  useEffect(() => {
    let ticking = false;
    const updateActive = () => {
      ticking = false;
      if (scrollingLockRef.current) return;
      const sections = ['event', 'tvc', 'tiet'];
      const viewportProbe = window.scrollY + window.innerHeight * 0.35;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (!el) continue;
        const { offsetTop, offsetHeight } = el;
        if (viewportProbe >= offsetTop && viewportProbe < offsetTop + offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActive);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      scrollingLockRef.current = true;
      setActiveSection(sectionId);
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // release the lock after the smooth scroll likely finishes
      setTimeout(() => {
        scrollingLockRef.current = false;
      }, 800);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=EB+Garamond:wght@400;500;600&family=MedievalSharp&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html { scroll-behavior: smooth; }

        .about-container {
          min-height: 100vh;
          background: linear-gradient(rgba(10, 12, 16, 0.92), rgba(10, 12, 16, 0.92)),
                      url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=2000&q=60');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          color: #E8E1D3;
          position: relative;
          overflow-x: hidden;
          padding-top: 148px; /* space for fixed navbar */
        }

        .about-container::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background:
            radial-gradient(ellipse at 20% 30%, rgba(188, 171, 121, 0.10) 0%, transparent 55%),
            radial-gradient(ellipse at 80% 70%, rgba(132, 143, 165, 0.15) 0%, transparent 55%);
          pointer-events: none;
          z-index: 0;
        }

        .about-nav {
          position: fixed;
          top:64px;
          left: 0;
          right: 0;
          background: rgba(53, 58, 71, 0.95);
          backdrop-filter: blur(10px);
          padding: 0.75rem 1rem;
          border-bottom: 2px solid #BCAB79;
          z-index: 1000;
          box-shadow: 0 4px 20px rgba(188, 171, 121, 0.25);
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          contain: paint style;
        }

        .nav-inner {
          max-width: 900px;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          gap: 1.25rem;
        }

        .nav-btn {
          font-family: 'Cinzel', serif;
          font-size: 1rem;
          font-weight: 600;
          color: #BCAB79;
          background: transparent;
          border: 2px solid rgba(188, 171, 121, 0.5);
          padding: 0.6rem 1.5rem;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          letter-spacing: 2px;
          position: relative;
          overflow: hidden;
        }

        .nav-btn::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(188, 171, 121, 0.2) 0%, transparent 70%);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .nav-btn:hover::before {
          width: 300px;
          height: 300px;
        }

        .nav-btn:hover {
          color: #E8E1D3;
          border-color: #BCAB79;
          box-shadow: 0 0 20px rgba(188, 171, 121, 0.35);
          /* remove translate to avoid perceived jiggle of fixed bar */
        }

        .nav-btn.active {
          color: #353A47;
          background: linear-gradient(135deg, rgba(188,171,121,0.95) 0%, rgba(188,171,121,0.85) 100%);
          border-color: #BCAB79;
          box-shadow: 0 4px 15px rgba(188, 171, 121, 0.45);
        }

        .section {
          min-height: auto;
          padding: 3.5rem 2rem;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          scroll-margin-top: 84px; /* align top nicely under fixed navbar */
        }

        .section-content {
          max-width: 1200px;
          width: 100%;
          animation: fadeInUp 0.6s ease-out;
          position: relative;
          z-index: 1;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .section-title {
          font-family: 'Cinzel', serif;
          font-size: 3rem;
          font-weight: 700;
          color: #BCAB79;
          text-align: center;
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 4px;
          text-shadow: 0 0 20px rgba(188, 171, 121, 0.5);
          animation: glow 2s ease-in-out infinite alternate;
        }

        .subtitle {
          font-family: 'EB Garamond', serif;
          font-size: 2rem;
          font-weight: 500;
          color: #848FA5;
          text-align: center;
          margin-bottom: 2rem;
          font-style: italic;
          letter-spacing: 2px;
        }

        @keyframes glow {
          from {
            text-shadow: 0 0 20px rgba(188, 171, 121, 0.5), 0 0 30px rgba(188, 171, 121, 0.35);
          }
          to {
            text-shadow: 0 0 30px rgba(188, 171, 121, 0.8), 0 0 40px rgba(188, 171, 121, 0.55);
          }
        }

        .section-text {
          font-family: 'MedievalSharp', cursive;
          font-size: 1rem;
          line-height: 1.9;
          color: #CFC7B6;
          margin-bottom: 1.5rem;
          text-align: center;
          max-width: 1000px;
          margin-left: auto;
          margin-right: auto;
          opacity: 0.9;
        }

        .rounds-title, .events-title {
          font-family: 'EB Garamond', serif;
          font-size: 2rem;
          font-weight: 600;
          color: #E8E1D3;
          text-align: center;
          margin: 2rem 0 1.5rem;
          letter-spacing: 2px;
        }

        .rounds-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
          perspective: 1000px;
        }

        .round-box {
          background: linear-gradient(135deg, rgba(53, 58, 71, 0.85) 0%, rgba(25, 28, 35, 0.95) 100%);
          border: 2px solid rgba(188, 171, 121, 0.6);
          padding: 2.5rem;
          border-radius: 8px;
          position: relative;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }

        .round-box::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(188, 171, 121, 0.12) 0%, transparent 70%);
          transform: scale(0);
          transition: transform 0.6s;
        }

        .round-box:hover::before {
          transform: scale(1);
        }

        .round-box:hover {
          transform: translateY(-10px) rotateX(5deg);
          box-shadow: 0 20px 50px rgba(188, 171, 121, 0.35);
          border-color: #BCAB79;
        }

        .round-number {
          font-family: 'Cinzel', serif;
          font-size: 3rem;
          font-weight: 700;
          color: #BCAB79;
          text-align: center;
          margin-bottom: 1rem;
          text-shadow: 0 0 20px rgba(188, 171, 121, 0.6);
          white-space: nowrap;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .round-title {
          font-family: 'EB Garamond', serif;
          font-size: 1.5rem;
          font-weight: 600;
          color: #E8E1D3;
          text-align: center;
          margin-bottom: 1.5rem;
          letter-spacing: 1px;
        }

        .round-desc {
          font-family: 'MedievalSharp', cursive;
          font-size: 0.9rem;
          line-height: 1.7;
          color: #CFC7B6;
          text-align: left;
        }

        .round-desc p {
          margin-bottom: 0.8rem;
        }

        .round-desc .highlight {
          color: #D11149;
          font-weight: bold;
          margin-top: 1rem;
        }

        .round-desc ul {
          margin-left: 1.5rem;
          margin-top: 0.5rem;
        }

        .round-desc ul li {
          margin-bottom: 0.4rem;
          color: #848FA5;
        }

        .events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .event-card {
          background: linear-gradient(135deg, rgba(53, 58, 71, 0.75) 0%, rgba(25, 28, 35, 0.85) 100%);
          border: 1px solid rgba(188, 171, 121, 0.35);
          padding: 2rem;
          border-radius: 8px;
          transition: transform 0.3s ease, filter 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .event-card::after {
          content: none;
        }

        .event-card:hover {
          transform: scale(1.05);
          filter: drop-shadow(0 0 14px rgba(188, 171, 121, 0.22));
        }

        .event-card h3 {
          font-family: 'EB Garamond', serif;
          font-size: 1.6rem;
          font-weight: 600;
          color: #BCAB79;
          margin-bottom: 1rem;
          letter-spacing: 1px;
        }

        .event-card p {
          font-family: 'MedievalSharp', cursive;
          font-size: 0.95rem;
          line-height: 1.7;
          color: #CFC7B6;
        }

        .highlight-box {
          background: linear-gradient(135deg, rgba(188, 171, 121, 0.15) 0%, rgba(132, 143, 165, 0.10) 100%);
          border-left: 4px solid #BCAB79;
          padding: 2rem;
          margin: 2rem auto;
          max-width: 900px;
          border-radius: 4px;
          position: relative;
          overflow: hidden;
        }

        .highlight-box::before {
          content: '"';
          position: absolute;
          top: -20px;
          left: 20px;
          font-family: 'Cinzel', serif;
          font-size: 6rem;
          color: rgba(188, 171, 121, 0.2);
          line-height: 1;
        }

        .highlight-text {
          font-family: 'EB Garamond', serif;
          font-size: 1.3rem;
          font-style: italic;
          color: #BCAB79;
          text-align: center;
          line-height: 1.8;
          position: relative;
          z-index: 1;
        }

        .stats-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          margin-top: 4rem;
        }

        .stat-box {
          background: linear-gradient(135deg, rgba(188, 171, 121, 0.10) 0%, rgba(25, 28, 35, 0.85) 100%);
          border: 2px solid rgba(188, 171, 121, 0.45);
          padding: 2rem;
          border-radius: 8px;
          text-align: center;
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }

        .stat-box::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, transparent, #BCAB79, transparent);
          transform: translateX(-100%);
          transition: transform 0.6s;
        }

        .stat-box:hover::after {
          transform: translateX(100%);
        }

        .stat-box:hover {
          border-color: #BCAB79;
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(188, 171, 121, 0.25);
        }

        .stat-number {
          font-family: 'Cinzel', serif;
          font-size: 3rem;
          font-weight: 700;
          color: #BCAB79;
          margin-bottom: 0.5rem;
          text-shadow: 0 0 15px rgba(188, 171, 121, 0.5);
        }

        .stat-label {
          font-family: 'EB Garamond', serif;
          font-size: 1.2rem;
          color: #848FA5;
          letter-spacing: 1px;
        }

        @media (max-width: 768px) {
          .about-nav {
            padding: 0.5rem 0.75rem;
          }

          .nav-inner {
            max-width: 100%;
            gap: 0.75rem;
            padding: 0 0.25rem;
          }

          .nav-btn {
            width: 100%;
            font-size: 0.9rem;
            padding: 0.5rem 1rem;
          }

          .section {
            padding: 3rem 1rem;
          }

          .section-title {
            font-size: 2.5rem;
          }

          .subtitle {
            font-size: 1.5rem;
          }

          .rounds-container, .events-grid {
            grid-template-columns: 1fr;
          }

          .section-text {
            font-size: 1rem;
          }

          .stat-number {
            font-size: 2.5rem;
          }

          .round-desc {
            font-size: 0.9rem;
          }
        }
      `}</style>

      <div className="about-container">
        <nav className="about-nav">
          <div className="nav-inner">
          <button
            className={`nav-btn ${activeSection === 'event' ? 'active' : ''}`}
            onClick={() => scrollToSection('event')}
          >
            ABOUT EVENT
          </button>
          <button
            className={`nav-btn ${activeSection === 'tvc' ? 'active' : ''}`}
            onClick={() => scrollToSection('tvc')}
          >
            ABOUT TVC
          </button>
          <button
            className={`nav-btn ${activeSection === 'tiet' ? 'active' : ''}`}
            onClick={() => scrollToSection('tiet')}
          >
            ABOUT TIET
          </button>
          </div>
        </nav>

        <section id="event" className="section">
          <div className="section-content">
            <h1 className="section-title">Case Quest</h1>
            <h2 className="subtitle">Where Strategy Meets Innovation</h2>
            <p className="section-text">
              Case Quest is one of the flagship events of Thapar Venture Club (TVC), designed to 
              challenge and inspire the next generation of problem-solvers, innovators, and business 
              strategists. It's not just a competition — it's a journey through real-world entrepreneurial 
              challenges that test analytical thinking, creativity, and strategic decision-making.
            </p>
            <p className="section-text">
              Participants are divided across three dynamic tracks, each focusing on different aspects 
              of business and innovation — from marketing strategy and financial modeling to product 
              design and startup scaling. Through these tracks, students experience what it's like to 
              step into the shoes of a founder, consultant, or strategist solving complex problems in 
              today's startup-driven economy.
            </p>

            <h1 className="rounds-title">The Three Trials of Quest</h1>
            <div className="rounds-container">
              <div className="round-box">
                <div className="round-number">ROUND I</div>
                <h3 className="round-title">Exploration & Discovery</h3>
                <div className="round-desc">
                  <p>Teams will be assigned specific campus zones to ensure smooth exploration.</p>
                  <p>Each team must conduct at least 3 short interviews (students, vendors, or staff).</p>
                  <p>Findings should be clearly documented with brief notes or observations.</p>
                  <p className="highlight">The objective is to identify a real problem with strong entrepreneurial potential.</p>
                </div>
              </div>

              <div className="round-box">
                <div className="round-number">ROUND II</div>
                <h3 className="round-title">Ideation & Deck Formation</h3>
                <div className="round-desc">
                  <p>Teams will return to the main venue for brainstorming and analysis.</p>
                  <p>Using insights gathered in Round 1, teams will formulate a viable business idea to tackle the chosen problem.</p>
                  <p>Teams will design a presentation deck that explains their idea in a structured way.</p>
                  <p className="highlight">The presentation must clearly show problem relevance and solution feasibility.</p>
                </div>
              </div>

              <div className="round-box">
                <div className="round-number">ROUND III</div>
                <h3 className="round-title">Final Pitch Round</h3>
                <div className="round-desc">
                  <p>Selected teams will present their ideas live before a judging panel.</p>
                  <p>Each team will get 5 minutes for presentation and 3 minutes for Q&A.</p>
                  <p className="highlight">Presentations should focus on:</p>
                  <ul>
                    <li>The problem discovered</li>
                    <li>The business solution proposed</li>
                    <li>The solution's feasibility and scalability</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="tvc" className="section">
          <div className="section-content">
            <h1 className="section-title">Thapar Venture Club</h1>
            <p className="section-text">
              The Thapar Venture Club (TVC) has been established with the mission to foster and nurture 
              talented young minds with strong entrepreneurial mindsets. In response to the growing startup 
              culture in India, TVC aims to inspire, guide, and empower individuals who are driven by the 
              spirit of entrepreneurship.
            </p>
            <p className="section-text">
              Through a wide range of initiatives and events, the club provides a platform for students to 
              explore innovative ideas, develop business acumen, and build connections within the entrepreneurial 
              ecosystem.
            </p>

            <h2 className="events-title">Our Legendary Events</h2>
            <div className="events-grid">
              <div className="event-card">
                <h3>Entre Eve</h3>
                <p>The club's introductory event — a gateway to TVC. A networking and idea-sharing platform 
                designed to ignite innovation and collaboration.</p>
              </div>
              <div className="event-card">
                <h3>Startup Studio</h3>
                <p>A live podcast experience where entrepreneurial ideas come to life through engaging 
                conversations with visionary founders.</p>
              </div>
              <div className="event-card">
                <h3>E-Summit</h3>
                <p>TVC's most celebrated event, featuring Baggage Battles, Venture Verse, Internship Fair, 
                and the Networking Arena.</p>
              </div>
            </div>

            <div className="highlight-box">
              <p className="highlight-text">
                "In collaboration with Venture Lab Thapar, we bring students closer to real-world startup 
                infrastructure, mentorship, and entrepreneurial resources."
              </p>
            </div>
          </div>
        </section>

        <section id="tiet" className="section">
          <div className="section-content">
            <h1 className="section-title">About TIET</h1>
            <p className="section-text">
              Thapar Institute of Engineering & Technology stands as a fortress of knowledge in Patiala, 
              where the brightest minds gather to forge their destinies. Established in 1956 by Karam Chand 
              Thapar, this prestigious institution has been nurturing engineers and innovators who shape the 
              future of technology and entrepreneurship.
            </p>
            <p className="section-text">
              From its historic halls emerge leaders, innovators, and visionaries who carry the torch of 
              excellence across the realm. TIET's legacy is written in the achievements of its students, 
              who have conquered challenges and established themselves as masters in their chosen fields — 
              from technology and engineering to business and innovation.
            </p>
            <p className="section-text">
              With a commitment to academic excellence, research, and holistic development, TIET provides 
              world-class infrastructure, experienced faculty, and a vibrant campus life that prepares 
              students for the challenges of tomorrow.
            </p>
            
            <div className="stats-container">
              <div className="stat-box">
                <div className="stat-number">68+</div>
                <div className="stat-label">Years of Legacy</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">250+</div>
                <div className="stat-label">Acres of Kingdom</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">10,000+</div>
                <div className="stat-label">Warriors Trained</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;