"use client";

import { useLayoutEffect, type MutableRefObject, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function renderProgress(progressRef: MutableRefObject<number>, value: number) {
  progressRef.current = value;
  window.dispatchEvent(new Event("kanaar:hero-progress"));
}

/**
 * One master scroll timeline for every visual layer in the hero. The canvas
 * consumes the same progress ref, so camera, door, portal image, and props
 * remain tied to the DOM handoff without any React render loop.
 */
export function useHeroScrollTimeline(
  sectionRef: RefObject<HTMLElement | null>,
  progressRef: MutableRefObject<number>,
) {
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const photo = section.querySelector<HTMLElement>(".hero-scroll__photo");
      const world = section.querySelector<HTMLElement>(".hero-scroll__world");
      const copy = section.querySelector<HTMLElement>(".immersive-hero__copy");
      const foot = section.querySelector<HTMLElement>(".immersive-hero__foot");
      const caption = section.querySelector<HTMLElement>(".hero-scroll__caption");
      const glow = section.querySelector<HTMLElement>(".hero-scroll__portal-glow");
      const scrim = section.querySelector<HTMLElement>(".immersive-hero__scrim");
      if (!photo || !world || !copy || !foot || !caption || !glow || !scrim) return;

      const state = { progress: 0 };
      const sync = () => renderProgress(progressRef, state.progress);
      const media = gsap.matchMedia();

      media.add(
        "(min-width: 1025px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.set(world, { autoAlpha: 0, scale: 0.92 });
          gsap.set([caption, glow], { autoAlpha: 0 });
          gsap.set(photo, {
            autoAlpha: 1,
            scaleX: 1,
            scaleY: 1,
            x: 0,
            y: 0,
            zIndex: 1,
            clipPath: "none",
          });
          gsap.set([copy, foot, scrim], { autoAlpha: 1 });

          const timeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=450%",
              pin: true,
              scrub: 0.8,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          timeline
            .to(state, { progress: 1, duration: 1, onUpdate: sync }, 0)
            // Phase 0: copy leaves before the image begins its portal morph.
            .to(copy, { autoAlpha: 0, yPercent: -7, duration: 0.15 }, 0)
            .to(foot, { autoAlpha: 0, duration: 0.13 }, 0.02)
            .to(scrim, { autoAlpha: 0, duration: 0.17 }, 0.04)
            // Phase 1: a full-screen image becomes the narrow, tall arch.
            .to(photo, { scaleX: 0.18, scaleY: 0.76, duration: 0.42 }, 0.14)
            .set(photo, { clipPath: "url(#kanaar-door-arch)" }, 0.5)
            // Phase 2: the R3F door and its texture-mapped inner photo take over.
            .to(world, { autoAlpha: 1, scale: 1, duration: 0.09 }, 0.56)
            .to(glow, { autoAlpha: 0.76, scale: 1.08, duration: 0.14 }, 0.58)
            .to(photo, { autoAlpha: 0, duration: 0.08 }, 0.6)
            // Phase 3 remains canvas-only: the camera pushes in via progressRef.
            .to(glow, { autoAlpha: 0.18, scale: 1.4, duration: 0.18 }, 0.72)
            // Phase 4 is intentionally last, after the prop composition settles.
            .to(caption, { autoAlpha: 1, y: 0, duration: 0.06 }, 0.95);

          return () => timeline.kill();
        },
      );

      // The compact hero uses the twilight photograph in place of the gate
      // photo, so the resolved portal state is not shown there.
      media.add("(max-width: 1024px)", () => {
        renderProgress(progressRef, 0.82);
        gsap.set(world, { autoAlpha: 1, scale: 1 });
        gsap.set(photo, {
          autoAlpha: 0,
          scaleX: 0.18,
          scaleY: 0.76,
          clipPath: "url(#kanaar-door-arch)",
        });
        gsap.set(glow, { autoAlpha: 0.24, scale: 1.18 });
        gsap.set(caption, { autoAlpha: 1, y: 0 });
        gsap.set([copy, foot], { autoAlpha: 1 });
        // The mobile photograph has its own vertical scrim.
        gsap.set(scrim, { autoAlpha: 0 });
      });

      // Reduced motion keeps the resolved portal state without pinning.
      media.add("(min-width: 1025px) and (prefers-reduced-motion: reduce)", () => {
        renderProgress(progressRef, 0.82);
        gsap.set(world, { autoAlpha: 1, scale: 1 });
        gsap.set(photo, {
          autoAlpha: 0,
          scaleX: 0.18,
          scaleY: 0.76,
          clipPath: "url(#kanaar-door-arch)",
        });
        gsap.set(glow, { autoAlpha: 0.24, scale: 1.18 });
        gsap.set(caption, { autoAlpha: 1, y: 0 });
        gsap.set([copy, foot, scrim], { autoAlpha: 1 });
      });

      return () => media.revert();
    }, section);

    return () => ctx.revert();
  }, [progressRef, sectionRef]);
}
