import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoaderScene from "./components/LoaderScene";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollShowcase from "./components/ScrollShowcase";
import GallerySection from "./components/GallerySection";
import SpeakersSection from "./components/SpeakersSection";
import About from "./components/About";
import Teams from "./components/Team";
import Register from "./components/Register";
import { Rulebook } from "./components/Rulebook";
import PageTransitionWrapper from "./components/PageTransitionWrapper";
import "./App.css";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded ? (
        <LoaderScene onFinish={() => setLoaded(true)} />
      ) : (
        <BrowserRouter>
          <Navbar />
          <PageTransitionWrapper>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Landing />
                  <div style={{ background: "url('/images/bg1.png') center/cover fixed no-repeat" }}>
                    <ScrollShowcase />
                    <GallerySection />
                    <SpeakersSection />
                  </div>
                </>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Teams />} />
            <Route path="/register" element={<Register />} />
            <Route path="/rulebook" element={<Rulebook />} />
          </Routes>
          </PageTransitionWrapper>
          <Footer />
        </BrowserRouter>
      )}
    </>
  );
}
