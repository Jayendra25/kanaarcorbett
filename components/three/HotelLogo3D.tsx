"use client";

import { useEffect, useMemo, useRef, type MutableRefObject, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type HotelLogo3DProps = {
  progressRef?: MutableRefObject<number>;
  compact?: boolean;
  children?: ReactNode;
};

const champagne = "#b8965d";
const bronze = "#80613e";

function createGateShape() {
  const shape = new THREE.Shape();

  // Outer tapered facade with the arched doorway cut into the bottom edge,
  // so the centre is genuinely open (no hole/outline overlap).
  shape.moveTo(-2.1, -2.62);
  shape.lineTo(-0.73, -2.62);
  shape.lineTo(-0.73, 0.32);
  shape.quadraticCurveTo(-0.73, 1.42, 0, 1.7);
  shape.quadraticCurveTo(0.73, 1.42, 0.73, 0.32);
  shape.lineTo(0.73, -2.62);
  shape.lineTo(2.1, -2.62);
  shape.lineTo(1.92, 2.56);
  shape.lineTo(-1.92, 2.56);
  shape.closePath();

  return shape;
}

function ArchRib({ width, height, z, thickness = 0.07 }: { width: number; height: number; z: number; thickness?: number }) {
  const geometry = useMemo(() => {
    const half = width / 2;
    const curve = new THREE.CurvePath<THREE.Vector3>();
    curve.add(new THREE.LineCurve3(new THREE.Vector3(-half, -2.48, z), new THREE.Vector3(-half, height - 0.72, z)));
    curve.add(
      new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-half, height - 0.72, z),
        new THREE.Vector3(0, height, z),
        new THREE.Vector3(half, height - 0.72, z),
      ),
    );
    curve.add(new THREE.LineCurve3(new THREE.Vector3(half, height - 0.72, z), new THREE.Vector3(half, -2.48, z)));
    return new THREE.TubeGeometry(curve, 36, thickness, 8, false);
  }, [height, thickness, width, z]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <mesh geometry={geometry} castShadow receiveShadow>
      <meshPhysicalMaterial color={bronze} metalness={0.76} roughness={0.31} />
    </mesh>
  );
}

function ReliefDetails() {
  const motifPositions = [-1.38, -0.98, 0.98, 1.38] as const;

  return (
    <group>
      <mesh position={[0, 2.08, 0.27]} castShadow>
        <boxGeometry args={[3.34, 0.12, 0.16]} />
        <meshPhysicalMaterial color="#d4b77d" metalness={0.72} roughness={0.27} />
      </mesh>
      <mesh position={[0, 1.84, 0.27]} castShadow>
        <boxGeometry args={[3.06, 0.07, 0.13]} />
        <meshPhysicalMaterial color={bronze} metalness={0.68} roughness={0.34} />
      </mesh>
      {([-1.385, 1.385] as const).map((x) => (
  <mesh key={x} position={[x, -2.37, 0.29]} castShadow>
    <boxGeometry args={[1.31, 0.14, 0.2]} />
    <meshPhysicalMaterial color="#c9aa70" metalness={0.76} roughness={0.3} />
  </mesh>
))}
      {motifPositions.map((x) => (
        <mesh key={x} position={[x, -1.32, 0.3]} rotation={[0, 0, Math.PI / 4]} castShadow>
          <boxGeometry args={[0.18, 0.18, 0.08]} />
          <meshPhysicalMaterial color="#e0c692" metalness={0.65} roughness={0.34} />
        </mesh>
      ))}
      <mesh position={[0, 2.8, 0.25]} rotation={[0, 0, Math.PI / 4]} castShadow>
        <octahedronGeometry args={[0.13, 0]} />
        <meshPhysicalMaterial color="#dfc58e" metalness={0.7} roughness={0.25} />
      </mesh>
    </group>
  );
}

/**
 * A physical, extruded interpretation of the Kanaar entrance-gate logo.
 * The silhouette is made from geometry rather than a raster plane so the
 * opening can participate in the hero's depth transition.
 */
export function HotelLogo3D({ progressRef, compact = false, children }: HotelLogo3DProps) {
  const root = useRef<THREE.Group>(null);
  const gateGeometry = useMemo(
    () =>
      new THREE.ExtrudeGeometry(createGateShape(), {
        depth: 0.42,
        bevelEnabled: true,
        bevelSegments: 3,
        bevelSize: 0.045,
        bevelThickness: 0.045,
        curveSegments: 20,
      }),
    [],
  );

  useEffect(() => () => gateGeometry.dispose(), [gateGeometry]);

  useFrame(() => {
    if (!root.current) return;
    const progress = progressRef?.current ?? 0.55;
    root.current.rotation.y = -0.24 + progress * 0.16;
    root.current.rotation.x = 0.035 - progress * 0.025;
    root.current.position.y = -0.08 + progress * 0.08;
  });

  return (
    <group ref={root} scale={compact ? 0.82 : 1}>
      <mesh geometry={gateGeometry} position={[0, 0, -0.21]} castShadow receiveShadow>
        <meshPhysicalMaterial
          color={champagne}
          metalness={0.82}
          roughness={0.3}
          clearcoat={0.12}
          clearcoatRoughness={0.4}
        />
      </mesh>
      <ArchRib width={1.72} height={1.98} z={0.29} thickness={0.065} />
      <ArchRib width={1.35} height={1.62} z={0.34} thickness={0.045} />
      <ReliefDetails />
      {children}
    </group>
  );
}

export default HotelLogo3D;
