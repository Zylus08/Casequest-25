import React from "react";
import ProfileList from "./ProfileList";
import "./css/Speakers.css";

export default function SpeakersSection() {
  return (
    <section
      className="speakers-section"
      id="speakers"
      style={{ background: "url('/images/bg1.png') center/cover fixed no-repeat", color: 'var(--fg)', position: 'relative', zIndex: 1 }}
    >
      <div style={{ width: 'min(1100px, 92%)', margin: '0 auto' }}>
        <ProfileList />
      </div>
    </section>
  );
}
