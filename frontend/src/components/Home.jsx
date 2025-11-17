// src/components/Home.jsx
import React from "react";
import Navbar from "./components/Navbar";
import Landing from "./Landing";
import Gallery from "./Gallery";
import Speakers from "./Speakers";
import Footer from "./Footer";
import "./css/Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <Navbar />
      <Landing />
      <Gallery />
      <Speakers />
      <Footer />
    </div>
  );
}
