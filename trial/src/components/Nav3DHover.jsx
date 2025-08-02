import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function Nav3DHover({ label, onClick }) {
  const mountRef = useRef();
  const [hovered, setHovered] = useState(false);
  const frameId = useRef();

  useEffect(() => {
    const mount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      50,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Geometry - Rotating Torus
    const geometry = new THREE.TorusGeometry(0.7, 0.2, 16, 100);
    const material = new THREE.MeshStandardMaterial({ color: 0x25d366 });
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(2, 5, 5);
    scene.add(directionalLight);

    // Animation function
    const animate = () => {
      frameId.current = requestAnimationFrame(animate);
      if (hovered) {
        torus.rotation.x += 0.03;
        torus.rotation.y += 0.04;
      } else {
        torus.rotation.x += 0.01;
        torus.rotation.y += 0.01;
      }
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId.current);
      window.removeEventListener("resize", handleResize);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [hovered]);

  // Styles applied to container
  return (
    <div
      className="nav3dhover-container"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          onClick();
        }
      }}
      aria-label={label}
      style={{ cursor: onClick ? "pointer" : "default" }}
      title={label}
    >
      <canvas
        ref={mountRef}
        className="nav3dhover-canvas"
        width={60}
        height={60}
        aria-hidden="true"
      />
      <span className="nav3dhover-label">{label}</span>
    </div>
  );
}
// Nav3DHover.jsx
export default function Nav3DHover({ label, onClick }) {
  return (
    <button className="nav3dhover-btn" onClick={onClick} type="button">
      {label}
    </button>
  );
}
