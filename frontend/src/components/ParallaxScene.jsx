// src/components/ParallaxScene.jsx
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * ParallaxScene
 * - Lightweight Three.js background for the landing hero
 * - Adds a subtle gradient background, vignette, and floating ember particles
 * - Parallax responds to mouse movement and slight scroll
 * - Non-interactive (pointer-events: none) and cleans up on unmount
 */
export default function ParallaxScene({ intensity = 0.4 }) {
  const mountRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    const container = mountRef.current;
    if (!container) return;

    // sizes
    const getSize = () => ({ width: container.clientWidth, height: container.clientHeight });
    let { width, height } = getSize();

    // renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // scene + camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 6);

    // background gradient plane
    const bgGeo = new THREE.PlaneGeometry(20, 12, 1, 1);
    const bgMat = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uTop: { value: new THREE.Color(0x0b0d12) },
        uBottom: { value: new THREE.Color(0x07080b) },
        uTime: { value: 0 },
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
        uniform vec3 uTop;
        uniform vec3 uBottom;
        uniform float uTime;
        void main(){
          // slow subtle noise-like shimmer via sin bands
          float n = sin((vUv.y + uTime * 0.01) * 10.0) * 0.02;
          vec3 col = mix(uBottom, uTop, vUv.y + n);
          gl_FragColor = vec4(col, 1.0);
        }
      `,
    });
    const bg = new THREE.Mesh(bgGeo, bgMat);
    bg.position.z = -5;
    scene.add(bg);

    // ember particles (use available /ember_sprite.png)
    const emberTex = new THREE.TextureLoader().load("/ember_sprite.png");
    const emberCount = 240;
    const emberGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(emberCount * 3);
    const sizes = new Float32Array(emberCount);
    const alphas = new Float32Array(emberCount);
    for (let i = 0; i < emberCount; i++) {
      const i3 = i * 3;
      positions[i3 + 0] = (Math.random() - 0.5) * 10;
      positions[i3 + 1] = (Math.random() - 0.3) * 6; // bias upward
      positions[i3 + 2] = -1 - Math.random() * 3; // distributed in depth
      sizes[i] = 6 + Math.random() * 10;
      alphas[i] = 0.25 + Math.random() * 0.35;
    }
    emberGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    emberGeo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    emberGeo.setAttribute("aAlpha", new THREE.BufferAttribute(alphas, 1));

    const emberMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { map: { value: emberTex } },
      vertexShader: `
        attribute float aSize;
        attribute float aAlpha;
        varying float vAlpha;
        void main(){
          vAlpha = aAlpha;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * (300.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        uniform sampler2D map;
        varying float vAlpha;
        void main(){
          vec4 t = texture2D(map, gl_PointCoord);
          gl_FragColor = vec4(t.rgb, t.a * vAlpha);
        }
      `,
    });
    const embers = new THREE.Points(emberGeo, emberMat);
    scene.add(embers);

    // mouse parallax target
    const target = { x: 0, y: 0 };
    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const mx = (e.clientX - rect.left) / rect.width; // 0..1
      const my = (e.clientY - rect.top) / rect.height; // 0..1
      target.x = (mx - 0.5) * intensity; // -i..i
      target.y = (my - 0.5) * intensity;
    };
    window.addEventListener("mousemove", onMouseMove);

    // resize handling to container
    const onResize = () => {
      if (!mounted) return;
      const s = getSize();
      width = s.width; height = s.height;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(container);

    const clock = new THREE.Clock();

    function animate() {
      if (!mounted) return;
      const t = clock.getElapsedTime();
      bgMat.uniforms.uTime.value = t;

      // ease camera and layers toward target
      camera.position.x += (target.x * 1.6 - camera.position.x) * 0.06;
      camera.position.y += (-target.y * 1.6 - camera.position.y) * 0.06;
      camera.lookAt(0, 0, 0);

      // drift embers upward and recycle
      const pos = emberGeo.getAttribute("position");
      for (let i = 0; i < emberCount; i++) {
        const i3 = i * 3;
        pos.array[i3 + 1] += 0.01 + (i % 5) * 0.0006; // slight variance
        pos.array[i3 + 0] += (Math.sin(t * 0.4 + i) * 0.0008);
        if (pos.array[i3 + 1] > 4) {
          pos.array[i3 + 1] = -2.5;
          pos.array[i3 + 0] = (Math.random() - 0.5) * 10;
          pos.array[i3 + 2] = -1 - Math.random() * 3;
        }
      }
      pos.needsUpdate = true;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    animate();

    return () => {
      mounted = false;
      window.removeEventListener("mousemove", onMouseMove);
      try { ro.disconnect(); } catch (_) {}
      try { container.removeChild(renderer.domElement); } catch (_) {}
      renderer.dispose();
      emberGeo.dispose();
      emberMat.dispose();
      bgGeo.dispose();
      bgMat.dispose();
    };
  }, [intensity]);

  return (
    <div ref={mountRef} className="landing-3d" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }} />
  );
}
