"use client";
import Image from "next/image";
type HotelLogo3DProps = { className?: string; rotY?: number; cameraZ?: number; };
export function HotelLogo3D({ className = "" }: HotelLogo3DProps) {
  return (
    <div className={`hotel-logo-3d ${className}`} style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "relative", width: "240px", height: "240px", filter: "drop-shadow(0 8px 32px rgba(185,154,103,0.5))", transform: "perspective(600px) rotateY(-8deg) rotateX(3deg)" }}>
        <Image src="/images/hotel/kanaar-logo-gate.webp" alt="Hotel Kanaar Corbett Gate Logo" fill style={{ objectFit: "contain" }} />
      </div>
    </div>
  );
}
export default HotelLogo3D;

