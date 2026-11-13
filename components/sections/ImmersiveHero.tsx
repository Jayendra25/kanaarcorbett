"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ArchMark } from "@/components/media/ArchMark";
import { IMAGES } from "@/lib/images";
import { ArrowRight, ArrowUpRight } from "@/components/ui/Icons";
import { useHeroScrollTimeline } from "@/animations/useHeroScrollTimeline";

const Hero3DScene = dynamic(
  () => import("@/components/three/Hero3DScene").then((module) => module.Hero3DScene),
  { ssr: false, loading: () => null },
);

function canUseWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function ImmersiveHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [compact, setCompact] = useState(false);

  useHeroScrollTimeline(sectionRef, progressRef);

  useEffect(() => {
    setWebgl(canUseWebGL());
    const query = window.matchMedia("(max-width: 1024px)");
    const update = () => setCompact(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <section
      className="immersive-hero"
      id="top"
      ref={sectionRef}
      data-webgl={webgl === null ? "pending" : webgl ? "true" : "false"}
      aria-label="Hotel Kanaar Corbett — Welcome"
    >
      <div className="immersive-hero__copy">
        <p className="eyebrow">A unit of The Corbett Ramdutt</p>
        <h1 className="immersive-hero__title">
          <span className="line-mask"><span>Experience the</span></span>
          <span className="line-mask"><span><em>Art of Hospitality</em></span></span>
          <span className="line-mask"><span>at Corbett</span></span>
        </h1>
        <p className="immersive-hero__desc">
          Discover a welcoming destination for memorable stays, exceptional dining,
          and grand celebrations near Jim Corbett National Park.
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

      <div className="immersive-hero__stage" aria-hidden="true">
        <svg className="hero-scroll__mask-defs" focusable="false" aria-hidden="true">
          <defs>
            {/* <clipPath id="kanaar-door-arch" clipPathUnits="objectBoundingBox">
              <path d="M0.015,1 L0.015,0.68 Q0.015,0.06,0.5,0.012 Q0.985,0.06,0.985,0.68 L0.985,1 Z" />
            </clipPath> */}
          </defs>
        </svg>
        {/* <div className="hero-scroll__portal-glow" /> */}
        <div className="hero-scroll__fallback">
          {/* <ArchMark showDetails /> */}
        </div>
        <div className="hero-scroll__world">
          {/* {webgl ? <Hero3DScene progressRef={progressRef} compact={compact} /> : null} */}
        </div>
        <div className="hero-scroll__photo">
          <Image
            src={IMAGES.welcome.src}
            alt=""
            fill
            priority
            quality={88}
            sizes="(max-width: 1024px) 100vw, 62vw"
            style={{ objectFit: "cover", objectPosition: "66% 42%" }}
          />
          <div className="hero-scroll__photo-vignette" />
        </div>
        <div className="immersive-hero__scrim" />
        <div className="hero-scroll__caption">
          <p>Discover everything under one roof</p>
          <a className="link-arrow" href="#hotel" tabIndex={-1}>
            Begin exploring <ArrowRight />
          </a>
        </div>
      </div>

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
