"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useHeroScrollTimeline(sectionRef: React.RefObject<HTMLElement | null>) {
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      // Pin the hero section while scroll progresses
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // Phase 1 (0–0.3): Photo scales down and moves centre
      tl.to(".hero-scroll__photo", {
        scale: 0.52,
        y: "12vh",
        ease: "none",
      }, 0)
      // Phase 1 concurrent: Gate grows in
      .fromTo(".hero-scroll__gate", {
        scale: 0.1,
        opacity: 0,
      }, {
        scale: 1,
        opacity: 1,
        ease: "none",
      }, 0)
      // Phase 2 (0.3–0.65): Photo moves toward gate centre
      .to(".hero-scroll__photo", {
        scale: 0.22,
        y: "0vh",
        opacity: 0,
        ease: "none",
      }, 0.3)
      // Phase 2: Gate becomes full focus
      .to(".hero-scroll__gate", {
        scale: 1.1,
        ease: "none",
      }, 0.3)
      // Phase 3 (0.65–1.0): Objects float in around gate
      .fromTo(".hero-scroll__obj", {
        opacity: 0,
        y: 30,
        scale: 0.6,
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.08,
        ease: "none",
      }, 0.65)
      // Phase 3: Caption fades in
      .fromTo(".hero-scroll__caption", {
        opacity: 0,
        y: 20,
      }, {
        opacity: 1,
        y: 0,
        ease: "none",
      }, 0.78);

    }, section);

    cleanupRef.current = () => ctx.revert();
    return () => ctx.revert();
  }, [sectionRef]);
}
