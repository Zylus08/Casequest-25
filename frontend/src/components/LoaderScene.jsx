import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import gsap from "gsap";
import "./LoaderScene.css";

export default function LoaderScene({ onFinish }) {
  const mountRef = useRef();

  useEffect(() => {
    let mounted = true;
    const container = mountRef.current;

    // 🎨 Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.06);

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.25, 5);
    camera.lookAt(0, 1.05, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);

    // 🌫️ Post-processing
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.9,
      0.5,
      0.1
    );
    composer.addPass(bloom);

    // 🔥 Heat Distortion Shader
    const HeatShader = {
      uniforms: {
        tDiffuse: { value: null },
        time: { value: 0 },
        intensity: { value: 0.0 },
        scale: { value: 1.5 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main(){
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform sampler2D tDiffuse;
        uniform float time;
        uniform float intensity;
        uniform float scale;

        float rand(vec2 co){
          return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
        }

        float noise(vec2 p){
          vec2 i = floor(p);
          vec2 f = fract(p);
          float a = rand(i);
          float b = rand(i + vec2(1.0, 0.0));
          float c = rand(i + vec2(0.0, 1.0));
          float d = rand(i + vec2(1.0, 1.0));
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
        }

        void main(){
          float n = noise(vUv * scale * 3.0 + vec2(time * 0.6, time * 0.4));
          vec2 offset = vec2((n - 0.5) * 0.02, (n - 0.5) * 0.02) * intensity;
          vec4 col = texture2D(tDiffuse, clamp(vUv + offset, 0.0, 1.0));
          gl_FragColor = col;
        }
      `,
    };
    const heatPass = new ShaderPass(HeatShader);
    composer.addPass(heatPass);

    // 💡 Lighting
    scene.add(new THREE.AmbientLight(0x333333, 1.6));
    const key = new THREE.DirectionalLight(0xffe0b8, 2.2);
    key.position.set(3, 6, 5);
    scene.add(key);

    // 🐉 Load dragon
    const gltfLoader = new GLTFLoader();
    let dragonObj = null;
    gltfLoader.load(
      "/Titanium_dragon.glb",
      (gltf) => {
        dragonObj = gltf.scene;
        dragonObj.scale.set(0.45, 0.45, 0.45);
        dragonObj.rotation.set(0, Math.PI, 0);
        dragonObj.position.set(0, -1.6, 0);
        const box = new THREE.Box3().setFromObject(dragonObj);
        const center = new THREE.Vector3();
        box.getCenter(center);
        dragonObj.position.sub(center.multiplyScalar(1.0));
        scene.add(dragonObj);
      },
      undefined,
      (err) => console.error("GLTF load error:", err)
    );

    // 🔊 Audio
    const roar = new Audio("/sounds/dragon_roar.mp3");
    roar.volume = 0.9;
    const unlockAudio = () => {
      roar.play().then(() => {
        roar.pause();
        roar.currentTime = 0;
      }).catch(() => {});
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };
    window.addEventListener("click", unlockAudio);
    window.addEventListener("keydown", unlockAudio);

    // 🎬 GSAP Timeline
    const tl = gsap.timeline({ delay: 0.2 });

    // Camera zoom-in
    tl.to(camera.position, { z: 3.2, duration: 1.0, ease: "power2.inOut" });

    // Roar + heat wave
    tl.call(() => {
      gsap.to(heatPass.uniforms.intensity, { value: 1.0, duration: 0.25, ease: "power2.out" });
      gsap.to(bloom, { strength: 1.8, duration: 0.3 });
      roar.currentTime = 0;
      roar.play().catch(() => {});
    });

    // Short pause
    // Short pause (slightly longer so dragon + logo sync properly)
    tl.to({}, { duration: 1.0 });

    // Heat fade + logo fade-in (sync, slightly slower for smooth reveal)
    tl.call(() => {
      gsap.to(heatPass.uniforms.intensity, { value: 0.0, duration: 1.0 });
      gsap.to(bloom, { strength: 0.6, duration: 1.0 });
      gsap.fromTo(
        ".logo-text",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1.25, duration: 0.9, ease: "power3.out" }
      );
    });

    // Hold logo a bit longer before transition
    tl.to({}, { duration: 1.2 });

    // 🎬 Shadow-first handoff: briefly show a shadow overlay, then reveal landing
    tl.call(() => {
      const overlay = document.querySelector(".transition-overlay");

      // Subtle camera pullback for continuity
      gsap.to(camera.position, {
        z: 6.0,
        duration: 1.2,
        ease: "power2.inOut",
      });

      // Bring in a semi-transparent shadow
      if (overlay) {
        gsap.set(overlay, { background: "rgba(0,0,0,1)" });
        gsap.to(overlay, { opacity: 1, duration: 0.25, ease: "power2.out" });
      }

      // Fade out the loader beneath the shadow
      gsap.to(".loader-container", {
        opacity: 0,
        duration: 0.9,
        ease: "power2.inOut",
        onComplete: () => {
          if (onFinish) onFinish();
          // After landing mounts, fade the shadow away
          if (overlay) {
            gsap.to(overlay, { opacity: 0, duration: 0.6, ease: "power2.inOut", delay: 0.15 });
          }
        },
      });
    });

    // Animation loop
    const clock = new THREE.Clock();
    function animate() {
      if (!mounted) return;
      heatPass.uniforms.time.value = clock.getElapsedTime() * 0.9;
      composer.render();
      requestAnimationFrame(animate);
    }
    animate();

    // Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      mounted = false;
      window.removeEventListener("resize", handleResize);
      container.removeChild(renderer.domElement);
      renderer.dispose();
      composer.dispose();
    };
  }, [onFinish]);

  return (
    <div className="loader-container">
      <div ref={mountRef} className="canvas-holder"></div>
      <img src="/casequest.png" alt="Case Quest Logo" className="logo-text" />
    </div>
  );
}
