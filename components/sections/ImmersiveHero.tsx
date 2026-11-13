"use client";

import { useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useIntro } from "@/components/experience/IntroProvider";
import { ArchMark } from "@/components/media/ArchMark";
import { IMAGES } from "@/lib/images";
import { ArrowRight, ArrowUpRight } from "@/components/ui/Icons";
import { useHeroScrollTimeline } from "@/animations/useHeroScrollTimeline";

// Lazy load 3D only on client
const HotelLogo3D = dynamic(
  () => import("@/components/three/HotelLogo3D").then(m => ({ default: m.HotelLogo3D })),
  { ssr: false, loading: () => null }
);

// 3D/icon objects representing hotel facilities
const FACILITY_OBJECTS = [
  { id: "dining",   emoji: "🍽️",  label: "Fine dining",      x: "-38%", y: "-28%", delay: "0s"    },
  { id: "rooms",    emoji: "🛏️",  label: "42 rooms",         x: "38%",  y: "-28%", delay: "0.08s" },
  { id: "banquet",  emoji: "🎊",  label: "Grand banquet",    x: "-44%", y: "12%",  delay: "0.16s" },
  { id: "nature",   emoji: "🌿",  label: "Corbett forest",   x: "44%",  y: "12%",  delay: "0.24s" },
  { id: "events",   emoji: "🏆",  label: "Corporate events", x: "0%",   y: "-44%", delay: "0.32s" },
];

export function ImmersiveHero() {
  const { introDone } = useIntro();
  const sectionRef = useRef<HTMLElement>(null);

  useHeroScrollTimeline(sectionRef);

  return (
    <section className="immersive-hero" id="top" ref={sectionRef} aria-label="Hotel Kanaar Corbett — Welcome">
      {/* ── Static header copy ── */}
      <div className="immersive-hero__copy">
        <p className="eyebrow">A unit of The Corbett Ramdutt</p>
        <h1 className="immersive-hero__title">
          <span className="line-mask"><span>Experience the</span></span>
          <span className="line-mask"><span><em>Art of Hospitality</em></span></span>
          <span className="line-mask"><span>at Corbett</span></span>
        </h1>
        <p className="immersive-hero__desc">
          Discover a welcoming destination for memorable stays, exceptional dining,
          grand celebrations, and meaningful gatherings near Jim Corbett National Park.
        </p>
        <div className="immersive-hero__actions">
          <a className="btn btn--primary" href="#hotel">
            Explore the hotel <ArrowRight />
          </a>
          <a className="btn btn--ghost" href="#celebrations">
            Plan your event <ArrowUpRight />
          </a>
        </div>
      </div>

      {/* ── Scroll-animated stage ── */}
      <div className="immersive-hero__stage" aria-hidden="true">

        {/* Hotel photograph — scales down into gate */}
        <div className="hero-scroll__photo">
          <Image
            src={IMAGES.welcome.src}
            alt={IMAGES.welcome.alt}
            fill
            priority
            quality={88}
            style={{ objectFit: "cover", objectPosition: "66% 42%" }}
            sizes="(max-width: 900px) 100vw, 60vw"
          />
          <div className="hero-scroll__photo-vignette" />
        </div>

        {/* 3D Gate — grows from behind */}
        <div className="hero-scroll__gate">
          {/* SVG arch fallback / overlay */}
          <div className="hero-scroll__gate-svg">
            <ArchMark showDetails={true} />
          </div>
          {/* 3D canvas */}
          <div className="hero-scroll__gate-3d">
            <HotelLogo3D rotY={0} cameraZ={7} />
          </div>
        </div>

        {/* Facility objects orbit */}
        <div className="hero-scroll__objects">
          {FACILITY_OBJECTS.map(obj => (
            <div
              key={obj.id}
              className="hero-scroll__obj"
              style={{
                transform: `translate(${obj.x}, ${obj.y})`,
                animationDelay: obj.delay,
              }}
              title={obj.label}
            >
              <span className="hero-scroll__obj-icon">{obj.emoji}</span>
              <span className="hero-scroll__obj-label">{obj.label}</span>
            </div>
          ))}
        </div>

        {/* Caption after full reveal */}
        <div className="hero-scroll__caption hero-scroll__caption--bottom">
          <p>Discover everything under one roof</p>
          <a className="link-arrow" href="#hotel">Begin exploring <ArrowRight /></a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="immersive-hero__foot">
        <span className="hero__scroll">
          Scroll to discover
          <span className="hero__scroll-line" aria-hidden="true" />
        </span>
        <span className="immersive-hero__foot-right">
          <span>Jim Corbett National Park</span>
          <span>Peerumadara, Uttarakhand</span>
        </span>
      </div>
    </section>
  );
}
