"use client";

import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { IMAGES } from "@/lib/images";

type PortalPhotoProps = {
  progressRef: MutableRefObject<number>;
};

const openingWidth = 1.52;
const openingHeight = 4.51;
const openingCenterY = (-2.75 + 1.76) / 2;

/** A centred, cover-scaled image plane fixed behind the gate. */
export function PortalPhoto({ progressRef }: PortalPhotoProps) {
  const root = useRef<THREE.Group>(null);
  const sourceTexture = useTexture(IMAGES.welcome.src);
  const texture = useMemo(() => {
    const cloned = sourceTexture.clone();
    cloned.colorSpace = THREE.SRGBColorSpace;
    cloned.needsUpdate = true;
    return cloned;
  }, [sourceTexture]);
  const photoGeometry = useMemo(() => {
    const textureAspect = IMAGES.welcome.width / IMAGES.welcome.height;
    const width = Math.max(openingWidth, openingHeight * textureAspect);
    const height = Math.max(openingHeight, openingWidth / textureAspect);
    return new THREE.PlaneGeometry(width, height);
  }, []);

  useEffect(
    () => () => {
      texture.dispose();
      photoGeometry.dispose();
    },
    [photoGeometry, texture],
  );

  useFrame(() => {
    if (!root.current) return;
    const entered = THREE.MathUtils.clamp((progressRef.current - 0.56) / 0.44, 0, 1);
    // A restrained counter-shift helps the image read as recessed, not pasted on.
    root.current.position.x = -0.028 * entered;
    root.current.position.y = 0.014 * entered;
  });

  return (
    <group ref={root}>
      <mesh geometry={photoGeometry} position={[0, openingCenterY, -0.3]} renderOrder={0}>
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
    </group>
  );
}

useTexture.preload(IMAGES.welcome.src);
