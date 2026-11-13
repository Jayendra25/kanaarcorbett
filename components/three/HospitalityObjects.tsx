"use client";

import type { MutableRefObject } from "react";
import { RoundedBox } from "@react-three/drei";
import { FloatingHospitalityObject } from "./FloatingHospitalityObject";

type HospitalityObjectsProps = {
  progressRef: MutableRefObject<number>;
  compact?: boolean;
};

const ivory = "#e7dfd1";
const gold = "#b8965d";
const bronze = "#80613e";
const wood = "#8a6846";
const charcoal = "#4c4033";

function DiningSet() {
  return (
    <group rotation={[0.42, -0.32, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.58, 0.58, 0.08, 40]} />
        <meshPhysicalMaterial color={ivory} roughness={0.44} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0, 0.08]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.34, 0.055, 10, 36]} />
        <meshPhysicalMaterial color={gold} metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0.73, 0, 0.03]} rotation={[0, 0, -0.15]}>
        <cylinderGeometry args={[0.035, 0.035, 0.8, 10]} />
        <meshPhysicalMaterial color={gold} metalness={0.76} roughness={0.25} />
      </mesh>
    </group>
  );
}

function Bed() {
  return (
    <group>
      <RoundedBox args={[1.35, 0.34, 0.92]} radius={0.07} smoothness={3} position={[0, -0.1, 0]}>
        <meshStandardMaterial color={wood} roughness={0.48} />
      </RoundedBox>
      <RoundedBox args={[1.26, 0.2, 0.82]} radius={0.07} smoothness={3} position={[0, 0.15, 0]}>
        <meshStandardMaterial color={ivory} roughness={0.65} />
      </RoundedBox>
      <RoundedBox args={[0.47, 0.1, 0.28]} radius={0.05} smoothness={3} position={[-0.28, 0.3, -0.2]}>
        <meshStandardMaterial color="#f4f0e8" roughness={0.72} />
      </RoundedBox>
      <RoundedBox args={[0.47, 0.1, 0.28]} radius={0.05} smoothness={3} position={[0.28, 0.3, -0.2]}>
        <meshStandardMaterial color="#f4f0e8" roughness={0.72} />
      </RoundedBox>
    </group>
  );
}

function BanquetChair() {
  return (
    <group>
      <RoundedBox args={[0.72, 0.12, 0.66]} radius={0.04} smoothness={3} position={[0, 0.13, 0]}>
        <meshStandardMaterial color={charcoal} roughness={0.52} />
      </RoundedBox>
      <RoundedBox args={[0.7, 0.82, 0.12]} radius={0.05} smoothness={3} position={[0, 0.55, -0.27]}>
        <meshStandardMaterial color={charcoal} roughness={0.52} />
      </RoundedBox>
      {[
        [-0.26, -0.34],
        [0.26, -0.34],
        [-0.26, 0.26],
        [0.26, 0.26],
      ].map(([x, z]) => (
        <mesh key={`${x}-${z}`} position={[x, -0.34, z]}>
          <cylinderGeometry args={[0.035, 0.045, 0.8, 10]} />
          <meshPhysicalMaterial color={gold} metalness={0.76} roughness={0.28} />
        </mesh>
      ))}
    </group>
  );
}

function Lantern() {
  return (
    <group>
      <mesh>
        <cylinderGeometry args={[0.28, 0.38, 0.76, 6]} />
        <meshPhysicalMaterial color="#c7a772" metalness={0.7} roughness={0.31} />
      </mesh>
      <mesh position={[0, 0.43, 0]}>
        <coneGeometry args={[0.42, 0.22, 6]} />
        <meshPhysicalMaterial color={bronze} metalness={0.74} roughness={0.29} />
      </mesh>
      <pointLight color="#ffd996" intensity={0.7} distance={3} position={[0, 0.1, 0.2]} />
    </group>
  );
}

function WindowArch() {
  return (
    <group>
      <RoundedBox args={[0.86, 1.12, 0.12]} radius={0.06} smoothness={3}>
        <meshPhysicalMaterial color={gold} metalness={0.7} roughness={0.3} />
      </RoundedBox>
      <RoundedBox args={[0.61, 0.84, 0.14]} radius={0.04} smoothness={3} position={[0, 0, 0.03]}>
        <meshStandardMaterial color="#51463a" roughness={0.33} />
      </RoundedBox>
      <mesh position={[0, 0, 0.12]}>
        <boxGeometry args={[0.05, 0.78, 0.04]} />
        <meshStandardMaterial color="#bfa16b" roughness={0.35} />
      </mesh>
    </group>
  );
}

export function HospitalityObjects({ progressRef, compact = false }: HospitalityObjectsProps) {
  if (compact) return null;

  return (
    <group>
      <FloatingHospitalityObject progressRef={progressRef} position={[-2.75, 1.24, -0.35]} rotation={[0.08, -0.28, -0.16]} revealAt={0.55} scale={0.78}>
        <DiningSet />
      </FloatingHospitalityObject>
      <FloatingHospitalityObject progressRef={progressRef} position={[2.65, 1.08, -0.52]} rotation={[-0.12, 0.3, 0.08]} revealAt={0.61} scale={0.88}>
        <Bed />
      </FloatingHospitalityObject>
      <FloatingHospitalityObject progressRef={progressRef} position={[-2.7, -1.86, 0.03]} rotation={[0.05, -0.28, 0]} revealAt={0.68} scale={0.82}>
        <BanquetChair />
      </FloatingHospitalityObject>
      <FloatingHospitalityObject progressRef={progressRef} position={[2.73, -1.8, -0.35]} rotation={[0.02, 0.28, 0]} revealAt={0.73} scale={0.72}>
        <Lantern />
      </FloatingHospitalityObject>
      <FloatingHospitalityObject progressRef={progressRef} position={[0, 2.85, -0.6]} rotation={[0, 0, 0]} revealAt={0.79} scale={0.58}>
        <WindowArch />
      </FloatingHospitalityObject>
    </group>
  );
}
