import React from "react";
import "../App.css";

export default function GOTCards() {
  const cards = [
    { title: "Udita Chutani", subtitle: "General Secretary", img: "/images/uc.png", linkedin: 'https://www.linkedin.com/in/udita-chutani-875985298/'},
    { title: "Bhavuk Mahajan", subtitle: "General Secretary", img: "/images/bm.png", linkedin: 'https://www.linkedin.com/in/bhavuk-m007/' },
    { title: "Arnav Gupta", subtitle: "Joint Secretary", img: "/images/ag.png", linkedin: 'https://www.linkedin.com/in/arnavg23/'},
    { title: "Arihan Andotra", subtitle: "Joint Secretary", img: "/images/aa.png", linkedin: 'https://www.linkedin.com/in/arihan-andotra-14a368292/'},
    { title: "Akarsh Dhingra", subtitle: "Joint Secretary", img: "/images/ad.png", linkedin: 'https://www.linkedin.com/in/akarsh-dhingra-7a9804299/'},
    { title: "Mohammad Aaban", subtitle: "Joint Secretary", img: "/images/ma.png", linkedin: 'https://www.linkedin.com/in/mohammad-aaban-347139293/'},
    { title: "Mudit Marwah", subtitle: "Finance Secretary", img: "/images/mm.png", linkedin: 'https://www.linkedin.com/in/mudit-marwah-8aa6b42aa/'},
    { title: "Samar Vir Vinayak", subtitle: "Director of Innovation&Strategy", img: "/images/svv.png", linkedin: 'https://www.linkedin.com/in/samar-vir-vinayak/'},
    { title: "Samyak Jain", subtitle: "Marketing&Externals Secretary", img: "/images/sj.png", linkedin: 'https://www.linkedin.com/in/samyak-jain-01937b291/'},
    { title: "Harshit Kamra", subtitle: "Marketing&Externals Secretary", img: "/images/Harshit.png", linkedin: 'https://www.linkedin.com/in/harshit-kamra-7a2aab284/'},
    { title: "Sarthak Sood", subtitle: "Social media&Design Secretary", img: "/images/ss.png", linkedin: 'https://www.linkedin.com/in/sarthak-sood-753238316/'},
    { title: "Gursharen Kaur Suri", subtitle: "Technical Secretary", img: "/images/gursharen.png", linkedin: 'https://www.linkedin.com/in/gursharen-kaur-suri/'  },
    { title: "Raunit Mittal", subtitle: "Co-convener", img: "/images/rm.png", linkedin: 'https://www.linkedin.com/in/raunit-mittal-b337a9327/'},
    { title: "Tanish Ahuja", subtitle: "Co-convener", img: "/images/ta.png", linkedin: 'https://www.linkedin.com/in/tanish-ahuja-4935b7281/'},
  ];

  return (
    <div className="got-page">
      <h1 className="got-title">Meet Our Team</h1>
      <div className="got-grid">
        {cards.slice(0, 14).map((card, index) => (
          <div className="got-card" key={index}>
            <div className="got-img" style={{ backgroundImage: `url(${card.img})` }}></div>
            <div className="got-top">
              <h2 className="got-name">{card.title}</h2>
              {card.subtitle && <p className="got-role">{card.subtitle}</p>}
            </div>
            <div className="got-footer">
              <div className="got-links">
                {/* <a
                  // className={`got-link ${!card.email ? 'got-link--disabled' : ''}`}
                  // href={card.email ? `mailto:${card.email}` : '#'}
                  // aria-label="Email"
                  // aria-disabled={!card.email}
                  // tabIndex={card.email ? 0 : -1}
                  // onClick={(e) => { if (!card.email) e.preventDefault(); }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16v16H4z"/>
                    <path d="m22 6-10 7L2 6"/>
                  </svg>
                </a> */}
                <a
                  className={`got-link ${!card.linkedin ? 'got-link--disabled' : ''}`}
                  href={card.linkedin ? card.linkedin : '#'}
                  target={card.linkedin ? "_blank" : undefined}
                  rel={card.linkedin ? "noreferrer" : undefined}
                  aria-label="LinkedIn"
                  aria-disabled={!card.linkedin}
                  tabIndex={card.linkedin ? 0 : -1}
                  onClick={(e) => { if (!card.linkedin) e.preventDefault(); }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v16H0V8zm7.5 0h4.8v2.2h.1c.7-1.3 2.4-2.7 4.9-2.7 5.3 0 6.3 3.5 6.3 8.1V24h-5v-7.1c0-1.7 0-3.9-2.4-3.9-2.4 0-2.8 1.8-2.8 3.8V24h-5V8z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Inline styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=EB+Garamond:wght@400;600&family=Medieval+Sharp&display=swap');

        .got-page {
          background: url('/images/bg1.png') center/cover fixed no-repeat;
          min-height: 100vh;
          padding: 40px;
          color: #BCAB79;
          font-family: 'EB Garamond', serif;
          position: relative;
        }
        .got-page::before {
          content: ''; position: absolute; inset: 0; background: rgba(10,12,16,0.8); z-index: 0;
        }

        .got-title {
          text-align: center;
          font-family: 'Cinzel', serif;
          font-size: 3rem;
          color: #BCAB79;
          letter-spacing: 2px;
          margin-bottom: 40px;
          text-shadow: 0 0 10px #BCAB79;
          position: relative; z-index: 1;
        }

        .got-grid {
          display: grid;
          grid-template-columns: repeat(3, 240px);
          gap: 24px;
          justify-content: center;
          justify-items: center;
          align-items: start;
          position: relative; z-index: 1;
        }

        /* Desktop: center two cards on the first row */
        @media (min-width: 1025px) {
          .got-grid > .got-card:nth-child(1) {
            margin-left: calc((240px + 24px) / 2 + 140px);
          }
          /* Force the 3rd card to start on the next row so only 2 appear on the first row */
          .got-grid > .got-card:nth-child(3) {
            grid-column: 1 / 2;
          }
          /* Add a little extra space before the 2nd card */
          .got-grid > .got-card:nth-child(2) {
            margin-left: 260px;
          }
        }

        .got-card {
          background-color: #2c313c;
          width: 240px;
          height: 300px;
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 0 20px rgba(188, 171, 121, 0.15);
          transition: all 0.3s ease;
          will-change: transform;
          cursor: pointer;
        }

        .got-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 0 35px rgba(188, 171, 121, 0.4);
          z-index: 3;
        }

        .got-img {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          transition: all 0.5s ease;
          filter: brightness(0.9);
        }

        .got-card:hover .got-img {
          filter: brightness(0.7);
          transform: scale(1.02);
        }

        .got-top {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          padding: 14px 20px;
          background: linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.35) 100%);
          color: #f1e9c9;
          transform: translateY(-100%);
          opacity: 0;
          transition: transform 0.35s ease, opacity 0.35s ease;
        }

        .got-card:hover .got-top {
          transform: translateY(0);
          opacity: 1;
        }

        .got-name {
          font-family: 'Cinzel', serif;
          font-size: 1.2rem;
          margin: 0 0 4px 0;
          color: #e7d79d;
          text-shadow: 0 1px 2px rgba(0,0,0,0.6);
        }

        .got-role {
          font-family: 'EB Garamond', serif;
          font-size: 0.95rem;
          margin: 0 0 10px 0;
          color: #d0c9b3;
        }

        .got-links {
          display: flex;
          gap: 10px;
        }

        .got-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          color: #f0e7c2;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255,255,255,0.18);
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .got-link:hover {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.22);
        }

        .got-link.got-link--disabled {
          opacity: 0.4;
          pointer-events: none;
        }

        .got-footer {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.35);
          border-top: 1px solid rgba(255,255,255,0.1);
        }

        .got-footer .got-links {
          gap: 14px;
        }

        @media (hover: none) {
          .got-top {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @media (max-width: 1024px) {
          .got-grid {
            grid-template-columns: repeat(2, minmax(0, 220px));
            gap: 16px;
          }
          .got-grid > .got-card:nth-child(1) { margin-left: 0; }
          /* Add extra space between the first two cards on tablet */
          .got-grid > .got-card:nth-child(2) { margin-left: 16px; }
        }

        @media (max-width: 768px) {
          .got-grid {
            grid-template-columns: minmax(0, 220px);
            gap: 14px;
            justify-content: center;
          }
          .got-card {
            width: 220px;
            height: 260px;
          }
          .got-footer { height: 52px; }
        }
      `}</style>
    </div>
  );
}
