"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Sphere, Stars } from "@react-three/drei";
import * as THREE from "three";

// Earth component with better materials
function Earth(props: any) {
  const earthRef = useRef<THREE.Mesh>(null);

  // Load Earth textures
  const textureLoader = new THREE.TextureLoader();
  const [earthTexture, bumpMap, specularMap] = useMemo(() => {
    return [
      textureLoader.load("/earth-texture.jpg"),
      textureLoader.load("/earth-bump.jpg"),
      textureLoader.load("/earth-specular.jpg"),
    ];
  }, []);

  // Rotate the earth
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <Sphere ref={earthRef} args={[1, 64, 64]} {...props}>
      <meshPhongMaterial
        map={earthTexture}
        bumpMap={bumpMap}
        bumpScale={0.05}
        specularMap={specularMap}
        specular={new THREE.Color("#909090")}
        shininess={5}
      />
    </Sphere>
  );
}

// Realistic airplane model
function Airplane({ scale = 0.008 }) {
  return (
    <group scale={scale}>
      {/* Main Fuselage */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.8, 8, 12]} />
        <meshPhongMaterial color="#ffffff" />
      </mesh>
      
      {/* Fuselage Nose Cone */}
      <mesh position={[0, 0, 4]}>
        <coneGeometry args={[0.8, 2, 12]} />
        <meshPhongMaterial color="#ffffff" />
      </mesh>

      {/* Main Wings */}
      <group position={[0, 0, 0]}>
        {/* Left Wing */}
        <mesh position={[-2.5, 0, 0]} rotation={[0, 0, Math.PI * 0.06]}>
          <boxGeometry args={[4.5, 0.2, 1.8]} />
          <meshPhongMaterial color="#ffffff" />
        </mesh>
        {/* Right Wing */}
        <mesh position={[2.5, 0, 0]} rotation={[0, 0, -Math.PI * 0.06]}>
          <boxGeometry args={[4.5, 0.2, 1.8]} />
          <meshPhongMaterial color="#ffffff" />
        </mesh>
        {/* Wing Tips - for better aerodynamic look */}
        <mesh position={[-4.5, 0.3, 0]} rotation={[0, 0, Math.PI * 0.12]}>
          <boxGeometry args={[0.8, 0.1, 0.8]} />
          <meshPhongMaterial color="#ffffff" />
        </mesh>
        <mesh position={[4.5, 0.3, 0]} rotation={[0, 0, -Math.PI * 0.12]}>
          <boxGeometry args={[0.8, 0.1, 0.8]} />
          <meshPhongMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* Tail Section */}
      <group position={[0, 0, -3.5]}>
        {/* Vertical Stabilizer */}
        <mesh position={[0, 1.2, 0]}>
          <boxGeometry args={[0.2, 2.2, 1.3]} />
          <meshPhongMaterial color="#ffffff" />
        </mesh>
        {/* Horizontal Stabilizers */}
        <mesh position={[-1.5, 0.6, 0]} rotation={[0, 0, Math.PI * 0.08]}>
          <boxGeometry args={[1.8, 0.15, 0.9]} />
          <meshPhongMaterial color="#ffffff" />
        </mesh>
        <mesh position={[1.5, 0.6, 0]} rotation={[0, 0, -Math.PI * 0.08]}>
          <boxGeometry args={[1.8, 0.15, 0.9]} />
          <meshPhongMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* Engines */}
      <group>
        {/* Left Engine */}
        <mesh position={[-2, -0.2, 0.5]}>
          <cylinderGeometry args={[0.35, 0.35, 1.8, 12]} />
          <meshPhongMaterial color="#2a2a2a" />
        </mesh>
        {/* Right Engine */}
        <mesh position={[2, -0.2, 0.5]}>
          <cylinderGeometry args={[0.35, 0.35, 1.8, 12]} />
          <meshPhongMaterial color="#2a2a2a" />
        </mesh>
      </group>

      {/* Windows */}
      <group position={[0, 0.3, 1]}>
        {[...Array(6)].map((_, i) => (
          <mesh key={i} position={[0, 0, i * 0.8 - 2]}>
            <boxGeometry args={[1.4, 0.15, 0.1]} />
            <meshPhongMaterial color="#87ceeb" opacity={0.6} transparent />
          </mesh>
        ))}
      </group>

      {/* Cockpit Windows */}
      <group position={[0, 0.4, 3]}>
        <mesh rotation={[0, 0, 0]}>
          <boxGeometry args={[1.1, 0.35, 0.7]} />
          <meshPhongMaterial color="#87ceeb" opacity={0.6} transparent />
        </mesh>
      </group>

      {/* Livery Stripe */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.41, 0.81, 8.01, 12]} />
        <meshPhongMaterial color="#1a75ff" />
      </mesh>
    </group>
  );
}

// Enhanced atmosphere effect
function Atmosphere() {
  return (
    <group>
      {/* Inner glow */}
      <Sphere args={[1.01, 32, 32]}>
        <meshPhongMaterial
          color="#4ca6ff"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>
      {/* Outer glow */}
      <Sphere args={[1.02, 32, 32]}>
        <meshPhongMaterial
          color="#4ca6ff"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
}

// Flight path component with animation
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

  // Animation state
  const [progress, setProgress] = useState(0);
  const [hovered, setHovered] = useState(false);
  const airplaneRef = useRef<THREE.Group>(null);

  // Animate the flight path
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 1 ? 0 : prev + 0.003));
    }, 16);

    return () => clearInterval(interval);
  }, []);

  // Create materials using useMemo
  const pathMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: color,
      opacity: hovered ? 0.8 : 0.4,
      transparent: true,
      linewidth: 1,
    });
  }, [color, hovered]);

  // Create line
  const line = useMemo(() => {
    return new THREE.Line(geometry, pathMaterial);
  }, [geometry, pathMaterial]);

  // Update airplane position and rotation
  useFrame(() => {
    if (airplaneRef.current) {
      const point = curve.getPoint(progress);
      const lookAtPoint = curve.getPoint(Math.min(progress + 0.01, 1));
      
      airplaneRef.current.position.copy(point);
      airplaneRef.current.lookAt(lookAtPoint);
      // Adjust rotation for better orientation
      airplaneRef.current.rotateZ(Math.PI / 2);
      airplaneRef.current.rotateX(Math.PI / 12); // Reduced tilt angle
    }
  });

  return (
    <group
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Path */}
      <primitive object={line} />

      {/* Airplane */}
      <group ref={airplaneRef}>
        <Airplane />
      </group>

      {/* Start point */}
      <mesh position={startPos}>
        <sphereGeometry args={[0.01, 16, 16]} />
        <meshBasicMaterial color={color} opacity={0.8} transparent />
      </mesh>

      {/* End point */}
      <mesh position={endPos}>
        <sphereGeometry args={[0.01, 16, 16]} />
        <meshBasicMaterial color={color} opacity={0.8} transparent />
      </mesh>
    </group>
  );
}

// Interactive controls component with mouse interaction
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
      // Handle events
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

// Helper function to convert lat/lng to 3D coordinates
function convertLatLngToVector3(lat: number, lng: number, radius: number = 1) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

// Main component
export default function SimpleGlobe({
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
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <pointLight position={[-10, -10, -10]} intensity={0.4} />
        <directionalLight position={[5, 3, 5]} intensity={0.8} />

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
