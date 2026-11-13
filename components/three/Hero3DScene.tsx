"use client";

import { useEffect, type MutableRefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { HotelLogo3D } from "./HotelLogo3D";
import { HospitalityObjects } from "./HospitalityObjects";
import { PortalPhoto } from "./PortalPhoto";

type Hero3DSceneProps = {
  progressRef: MutableRefObject<number>;
  compact?: boolean;
};

function ProgressInvalidator() {
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    const render = () => invalidate();
    window.addEventListener("kanaar:hero-progress", render);
    return () => window.removeEventListener("kanaar:hero-progress", render);
  }, [invalidate]);

  return null;
}

function CameraRig({ progressRef, compact = false }: Hero3DSceneProps) {
  const { camera } = useThree();

  useFrame(() => {
    const p = progressRef.current;
    camera.position.set(
      compact ? 0 : 0.1 - p * 0.12,
      compact ? 0.1 : 0.06 + p * 0.05,
      compact ? 8.4 : 11.2 - p * 3.35,
    );
    camera.lookAt(new THREE.Vector3(0, compact ? 0.1 : 0.05, 0));
  });

  return null;
}

function Scene({ progressRef, compact = false }: Hero3DSceneProps) {
  return (
    <>
      <ambientLight intensity={1.65} color="#fff6e7" />
      <directionalLight position={[-4, 5, 5]} intensity={2.25} color="#ffe7bb" />
      <directionalLight position={[4, 1.5, 3]} intensity={1.15} color="#d8e2ef" />
      <pointLight position={[0, 1.4, 3]} intensity={14} distance={8} color="#f4c878" />
      <group position={[0, compact ? -0.15 : -0.18, 0]}>
        <HotelLogo3D progressRef={progressRef} compact={compact}>
          <PortalPhoto progressRef={progressRef} />
        </HotelLogo3D>
        <HospitalityObjects progressRef={progressRef} compact={compact} />
      </group>
      <CameraRig progressRef={progressRef} compact={compact} />
      <ProgressInvalidator />
    </>
  );
}

export function Hero3DScene({ progressRef, compact = false }: Hero3DSceneProps) {
  return (
    <Canvas
      dpr={[1, 2]}
      frameloop="demand"
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      camera={{ fov: compact ? 32 : 34, position: [0, 0, compact ? 8.2 : 8.6] }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <Scene progressRef={progressRef} compact={compact} />
    </Canvas>
  );
}

export default Hero3DScene;
