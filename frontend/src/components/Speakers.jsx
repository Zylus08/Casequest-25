// src/components/Speakers.jsx
import React from "react";
import "./css/Speakers.css";

export default function Speakers() {
  const list = [
    { name: "Arya Stark", title: "Strategy Lead, Winterfell", img: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=800&auto=format&fit=crop" },
    { name: "Tyrion Lannister", title: "Chief Advisor, The Hand", img: "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=800&auto=format&fit=crop" },
    { name: "Daenerys Targaryen", title: "Founder, Dragonstone Ventures", img: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=800&auto=format&fit=crop" },
    { name: "Jon Snow", title: "Ops Commander, The Watch", img: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=800&auto=format&fit=crop" },
  ];
  return (
    <section className="speakers-section container" id="speakers">
      <h1 className="speakers-title">Past Speakers</h1>
      <div className="speakers-grid">
        {list.map((s) => (
          <article className="speaker-card" key={s.name}>
            <img src={s.img} alt={s.name} loading="lazy" />
            <div className="speaker-body">
              <h3>{s.name}</h3>
              <p>{s.title}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
