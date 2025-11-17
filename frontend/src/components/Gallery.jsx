// src/components/Gallery.jsx
import React from "react";
import "./css/Gallery.css";

export default function Gallery() {
  const images = [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519066629447-267fffa62d5b?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1468573048042-d0253da8b8f3?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop",
  ];
  return (
    <section className="gallery-section container" id="gallery">
      <h2 className="gallery-title">Gallery</h2>
      <p className="gallery-sub">Scenes from expeditions and on-board moments.</p>
      <div className="gallery-grid">
        {images.map((src, i) => (
          <div className="gallery-item" key={i}>
            <img src={src} alt={`Gallery ${i + 1}`} loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
}
