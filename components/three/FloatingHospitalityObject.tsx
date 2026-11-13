"use client";

import { useRef, type MutableRefObject, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type FloatingHospitalityObjectProps = {
  children: ReactNode;
  progressRef: MutableRefObject<number>;
  position: [number, number, number];
  rotation?: [number, number, number];
  revealAt: number;
  scale?: number;
};

export function FloatingHospitalityObject({
  children,
  progressRef,
  position,
  rotation = [0, 0, 0],
  revealAt,
  scale = 1,
}: FloatingHospitalityObjectProps) {
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!group.current) return;
    const local = THREE.MathUtils.clamp((progressRef.current - revealAt) / (1 - revealAt), 0, 1);
    const eased = 1 - Math.pow(1 - local, 3);
    group.current.scale.setScalar(Math.max(0.001, scale * eased));
    group.current.position.set(position[0], position[1] - (1 - eased) * 0.42, position[2]);
    group.current.rotation.set(rotation[0], rotation[1] + (1 - eased) * 0.36, rotation[2]);
  });

  return <group ref={group}>{children}</group>;
}
