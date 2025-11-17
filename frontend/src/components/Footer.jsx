import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-columns" id="contact">
          <section className="footer-left">
            <h3>TVC</h3>
            <p className="footer-tag">Ideate, Ascend, Lead</p>
            <div className="social-row" aria-label="Social links">
              <a className="icon-btn" href='https://www.instagram.com/tvc.tiet?igsh=MTlxbHBsemN2MWZieQ==' aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zm6.5-.75a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0z"/></svg>
              </a>
              <a className="icon-btn" href='https://www.facebook.com/edctiet' aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-4v-7h2.5l.5-3H16V9.5c0-.86.2-1.5 1.5-1.5H19V5.2c-.26-.04-1.15-.2-2.2-.2-2.2 0-3.8 1.34-3.8 3.8V11H10v3h3v7H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/></svg>
              </a>
              <a className="icon-btn" href="https://www.linkedin.com/company/thapar-venture-club-tvc" aria-label="LinkedIn" target="_blank"   rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zm-.5 15.5v-5.3c0-1.4-.5-2.3-1.7-2.3-1 0-1.5.7-1.7 1.3v-1h-2v6.3h2v-3.5c0-.9.3-1.5 1-1.5.7 0 1 .6 1 1.5v3.5h2zm-9.5 0h2V13c0-1.7 1-2.7 2.3-2.7 1.3 0 1.7 1 1.7 2.7v5.5h2V13c0-3-1.6-4.5-4-4.5-1.1 0-2 .5-2.7 1.3V9H9v9.5zM7 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-1 10h2V9H6v9.5z"/></svg>
              </a>
              {/* <a className="icon-btn" href='edc@thapar.edu' aria-label="Email">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>
              </a> */}
            </div>
          </section>

          <section className="footer-right">
            <h3>Contact Us</h3>
            <div className="contact-block">
              <div className="contact-line">
                <p className="address">Thapar Institute of Engineering &amp; Technology, Patiala</p>
              </div>
              <div className="contact-line">
                <svg className="mini-ico" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l1.8-1.8a1.5 1.5 0 0 1 1.5-.37c1.62.54 3.37.84 5 .84a1.5 1.5 0 0 1 1.5 1.5V21a1.5 1.5 0 0 1-1.5 1.5C11.4 22.5 1.5 12.6 1.5 1.5A1.5 1.5 0 0 1 3 0h2.37A1.5 1.5 0 0 1 6.87 1.5c0 1.63.3 3.38.84 5a1.5 1.5 0 0 1-.38 1.5L6.6 10.8z"/></svg>
                <a href="tel:+919041262651">+91 90412 62651</a>
              </div>
              {/* Add email if desired */}
            </div>
          </section>
        </div>

        <section className="footer-brand">        </section>
      </div>
      <div className="footer-bottom">
        <div className="fb-left">© 2025 TVC. All rights reserved.</div>
        <div className="fb-right">Made with <span aria-label="love" role="img">❤️</span> by Team TVC</div>
      </div>
    </footer>
  );
};

export default Footer;
