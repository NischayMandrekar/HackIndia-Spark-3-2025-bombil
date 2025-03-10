"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useTexture, Sphere, Stars } from "@react-three/drei";
import * as THREE from "three";

// Earth component with texture
function Earth(props: any) {
  const earthRef = useRef<THREE.Mesh>(null);

  // Load textures - using the actual texture files
  const [earthTexture, bumpMap] = useTexture([
    "/earth-texture.jpg", // Color map
    "/earth-bump.jpg", // Bump map for terrain
  ]);

  // Make textures repeat properly
  earthTexture.wrapS = earthTexture.wrapT = THREE.RepeatWrapping;
  bumpMap.wrapS = bumpMap.wrapT = THREE.RepeatWrapping;

  // Enhance texture appearance
  earthTexture.anisotropy = 16;

  // Rotate the earth slowly
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <Sphere ref={earthRef} args={[1, 64, 64]} {...props}>
      <meshStandardMaterial
        map={earthTexture}
        bumpMap={bumpMap}
        bumpScale={0.05}
        metalness={0.1}
        roughness={0.6}
        color="#ffffff" // Use white to show the texture's true colors
        emissive="#1a237e"
        emissiveIntensity={0.1} // Reduced for brighter appearance
      />
    </Sphere>
  );
}

// Atmosphere glow effect
function Atmosphere() {
  return (
    <Sphere args={[1.01, 32, 32]}>
      <meshPhongMaterial
        color="#4ca6ff"
        transparent
        opacity={0.15}
        side={THREE.BackSide}
      />
    </Sphere>
  );
}

// Flight path component
function FlightPath({
  startLat,
  startLng,
  endLat,
  endLng,
  color = "#ff0000",
  altitude = 0.05,
}: {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color?: string;
  altitude?: number;
}) {
  const curveRef = useRef<THREE.Line>(null);
  const [hovered, setHovered] = useState(false);

  // Convert lat/lng to 3D coordinates
  const convertLatLngToVector3 = (
    lat: number,
    lng: number,
    radius: number = 1
  ) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);

    return new THREE.Vector3(
      -radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
  };

  // Create a curved path between two points
  const createCurvedPath = (
    start: THREE.Vector3,
    end: THREE.Vector3,
    altitude: number
  ) => {
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    const distance = start.distanceTo(end);

    // Normalize mid point and move it outward by altitude + distance factor
    mid.normalize().multiplyScalar(1 + altitude + distance * 0.1);

    // Create a quadratic bezier curve
    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    return curve;
  };

  // Convert coordinates
  const startPos = convertLatLngToVector3(startLat, startLng);
  const endPos = convertLatLngToVector3(endLat, endLng);

  // Create curve
  const curve = createCurvedPath(startPos, endPos, altitude);

  // Create geometry from curve
  const points = curve.getPoints(50);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  // Animate the path
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 1 ? 0 : prev + 0.005));
    }, 16);

    return () => clearInterval(interval);
  }, []);

  // Create materials
  const lineMaterial = new THREE.LineBasicMaterial({
    color: color,
    opacity: hovered ? 1 : 0.7,
    transparent: true,
    linewidth: 2,
  });

  const dashMaterial = new THREE.LineDashedMaterial({
    color: color,
    dashSize: 0.1,
    gapSize: 0.1,
    opacity: hovered ? 1 : 0.7,
    transparent: true,
  });

  // Custom property for animation
  const customDashOffset = { value: 0 };

  useFrame(() => {
    if (curveRef.current) {
      // Update custom property and force material update
      customDashOffset.value -= 0.01;
      if (curveRef.current.material instanceof THREE.LineDashedMaterial) {
        // Force material update
        curveRef.current.material.needsUpdate = true;
      }
    }
  });

  return (
    <group
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Static path */}
      <primitive object={new THREE.Line(geometry, lineMaterial)} />

      {/* Animated path */}
      <primitive
        ref={curveRef}
        object={new THREE.Line(geometry, dashMaterial)}
        onUpdate={(self: THREE.Line) => {
          if (self instanceof THREE.Line) {
            self.computeLineDistances();
          }
        }}
      />

      {/* Animated point along the path */}
      <mesh position={curve.getPoint(progress)}>
        <sphereGeometry args={[hovered ? 0.03 : 0.02, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>

      {/* Start point */}
      <mesh position={startPos}>
        <sphereGeometry args={[hovered ? 0.03 : 0.02, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>

      {/* End point */}
      <mesh position={endPos}>
        <sphereGeometry args={[hovered ? 0.03 : 0.02, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

// Interactive controls component
function InteractiveControls() {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);

  // Set initial camera position
  useEffect(() => {
    if (controlsRef.current) {
      camera.position.set(0, 0, 2.5);
      controlsRef.current.update();
    }
  }, [camera]);

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={true}
      enablePan={true}
      enableRotate={true}
      minDistance={1.5}
      maxDistance={4}
      rotateSpeed={0.8}
      zoomSpeed={1.0}
      autoRotate={true}
      autoRotateSpeed={0.3}
      // Stop auto-rotation when interacting
      onStart={() => {
        if (controlsRef.current) {
          controlsRef.current.autoRotate = false;
        }
      }}
      onEnd={() => {
        setTimeout(() => {
          if (controlsRef.current) {
            controlsRef.current.autoRotate = true;
          }
        }, 3000);
      }}
    />
  );
}

// Main component
export default function InteractiveGlobe({
  width = "100%",
  height = "100%",
  routes = [],
}: {
  width?: string | number;
  height?: string | number;
  routes?: Array<{
    startLat: number;
    startLng: number;
    endLat: number;
    endLng: number;
    color?: string;
  }>;
}) {
  // Default routes if none provided
  const defaultRoutes =
    routes.length > 0
      ? routes
      : [
          {
            startLat: 40.7128,
            startLng: -74.006,
            endLat: 51.5074,
            endLng: -0.1278,
            color: "#ff4d4d",
          }, // NYC to London
          {
            startLat: 34.0522,
            startLng: -118.2437,
            endLat: 35.6762,
            endLng: 139.6503,
            color: "#4da6ff",
          }, // LA to Tokyo
          {
            startLat: 48.8566,
            startLng: 2.3522,
            endLat: 25.2048,
            endLng: 55.2708,
            color: "#ffaa00",
          }, // Paris to Dubai
          {
            startLat: -33.8688,
            startLng: 151.2093,
            endLat: 1.3521,
            endLng: 103.8198,
            color: "#00cc88",
          }, // Sydney to Singapore
        ];

  return (
    <div style={{ width, height, position: "relative" }}>
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 45 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.8} /> {/* Increased light intensity */}
        <pointLight position={[10, 10, 10]} intensity={1.5} />{" "}
        {/* Increased light intensity */}
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        {/* Stars background */}
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        {/* Earth */}
        <Earth />
        {/* Atmosphere glow */}
        <Atmosphere />
        {/* Flight paths */}
        {defaultRoutes.map((route, index) => (
          <FlightPath
            key={index}
            startLat={route.startLat}
            startLng={route.startLng}
            endLat={route.endLat}
            endLng={route.endLng}
            color={route.color}
            altitude={0.05 + index * 0.02} // Vary altitude to prevent overlap
          />
        ))}
        {/* Interactive controls */}
        <InteractiveControls />
      </Canvas>
    </div>
  );
}
