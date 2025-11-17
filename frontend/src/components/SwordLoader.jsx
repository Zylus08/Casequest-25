import React, { useEffect, useState } from "react";
import sword from "./SwordLoader.png";      
import "./SwordLoader.css";

const ANIMATION_DURATION = 3800; 

export default function SwordLoader({ onFinished }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onFinished) onFinished();
    }, ANIMATION_DURATION);

    return () => clearTimeout(timer);
  }, [onFinished]);

  if (!visible) return null;

  return (
    <div className="sword-loader-root">
      {/* Background wipe OUT -> MIDDLE -> OUT */}
      <div className="sword-loader-wipe" />

      {/* Left sword */}
      <div className="sword-loader-sword sword-loader-left">
        <img src={sword} alt="Sword left" />
      </div>

      {/* Right sword */}
      <div className="sword-loader-sword sword-loader-right">
        <img src={sword} alt="Sword right" />
      </div>

      {/* Clink in the center */}
      <div className="sword-loader-clink" />

      {/* Text at the bottom */}
      <div className="sword-loader-title">
        CASE QUEST
        <span>Loading the realm...</span>
      </div>
    </div>
  );
}
