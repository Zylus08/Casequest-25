import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const resetForm = () => { setName(""); setEmail(""); setMessage(""); setError(""); setSent(false); };
const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setSent(false);

  if (!name || !email || !message) {
    setError("Please fill out all fields.");
    return;
  }

  if (!validateEmail(email)) {
    setError("Please enter a valid email address.");
    return;
  }

  try {
    const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://casequest-25.onrender.com";
    const response = await fetch(`${API_BASE}/send-feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await response.json();

    if (data.success) {
      setSent(true);
      resetForm();
      setTimeout(() => setFeedbackOpen(false), 2000);
    } else {
      setError(data.error || "Something went wrong.");
    }
  } catch (err) {
    console.error(err);
    setError("Failed to send feedback. Please try again later.");
  }
};

  return (
    <>
    <header className={`navbar ${scrolled ? "is-solid" : "is-transparent"}`}>
      <div className="nav-inner">
        <div className="nav-left">
          <a href="/" className="brand">
            <img src="/images/logo.png" alt="Logo" className="brand-logo" />
          </a>
        </div>

        <button
          className={`nav-toggle ${open ? "is-open" : ""}`}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className="nav-center">
          <ul className={`nav-links ${open ? "show" : ""}`} onClick={() => setOpen(false)}>
            <li><NavLink to="/" end className={({isActive}) => isActive ? "active" : undefined}>Home</NavLink></li>          
            <li><NavLink to="/about" className={({isActive}) => isActive ? "active" : undefined}>About Us</NavLink></li>
            <li><NavLink to="/rulebook" className={({isActive}) => isActive ? "active" : undefined}>Rulebook</NavLink></li>
            <li><NavLink to="/team" className={({isActive}) => isActive ? "active" : undefined}>Team</NavLink></li>            
            <li>
              <a href="#contact" onClick={(e) => { e.preventDefault(); setOpen(false); setFeedbackOpen(true); }}>
                Contact us
              </a>
            </li>
          </ul>
        </nav>

        <div className="nav-right">
          <a
            className="cta-link"
            href="https://saturnalia.in/events/business/bizquest"
          >
            Register
          </a>
        </div>
      </div>
    </header>
    {feedbackOpen && (
      <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="feedback-title" onClick={() => { setFeedbackOpen(false); resetForm(); }}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" aria-label="Close" onClick={() => { setFeedbackOpen(false); resetForm(); }}>×</button>
          <h3 id="feedback-title">Send Feedback</h3>
          <form className="feedback-form" onSubmit={handleSubmit} noValidate>
            {error && <div className="feedback-error" role="alert">{error}</div>}
            {sent && <div className="feedback-success" role="status">Thank you for your feedback!!</div>}
            <div className="form-row">
              <label htmlFor="fb-name-nav">Name</label>
              <input id="fb-name-nav" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
            </div>
            <div className="form-row">
              <label htmlFor="fb-email-nav">Email</label>
              <input id="fb-email-nav" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
            </div>
            <div className="form-row">
              <label htmlFor="fb-message-nav">Message</label>
              <textarea id="fb-message-nav" rows="4" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Share your feedback..." required />
            </div>
            <div className="modal-actions">
              <button type="button" className="btn-secondary" onClick={() => { setFeedbackOpen(false); resetForm(); }}>Cancel</button>
              <button type="submit" className="feedback-submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    )}
    </>
  );
};

export default Navbar;
