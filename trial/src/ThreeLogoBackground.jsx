import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeLogoBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // transparent background
    mountRef.current.appendChild(renderer.domElement);

    // Group for WhatsApp logo parts
    const group = new THREE.Group();

    // Outer circle (green, translucent)
    const circleGeo = new THREE.CircleGeometry(7, 64);
    const circleMat = new THREE.MeshBasicMaterial({
      color: 0x25d366,
      opacity: 0.1,
      transparent: true,
    });
    const circle = new THREE.Mesh(circleGeo, circleMat);
    group.add(circle);

    // Simplified phone shape (green)
    const phoneGeo = new THREE.BoxGeometry(1.5, 3, 0.5);
    const phoneMat = new THREE.MeshBasicMaterial({ color: 0x25d366 });
    const phone = new THREE.Mesh(phoneGeo, phoneMat);
    phone.position.set(0, 0, 1);
    group.add(phone);

    scene.add(group);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      group.rotation.y += 0.005;
      group.rotation.x += 0.003;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
      }}
    />
  );
}
