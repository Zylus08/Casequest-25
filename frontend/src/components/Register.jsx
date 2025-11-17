// src/components/Register.jsx
import React, { useEffect } from "react";
import "./css/Register.css";

export default function Register() {
  useEffect(() => {
    window.location.replace("https://saturnalia.in/events/business/bizquest");
  }, []);
  return (
    <main className="register-page container">
      <h1>Register for CASE QUEST</h1>
      <p>Join the TVCxSAT flagship case competition. Form a team and prove your strategy, speed, and storytelling.</p>
      <a className="register-btn-lg" href="https://saturnalia.in/events/business/bizquest">Continue to registration</a>
    </main>
  );
}
