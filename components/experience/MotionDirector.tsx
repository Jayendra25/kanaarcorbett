"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * A single motion director for scroll-driven choreography.
 * Hero entrance is handled separately so that it can wait for the intro.
 */
export function MotionDirector() {
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      /* Section reveals --------------------------------------------------- */
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        const kind = el.dataset.reveal || "up";
        const delay = Number(el.dataset.revealDelay || 0);
        const trigger = el.dataset.revealTrigger
          ? document.querySelector<HTMLElement>(el.dataset.revealTrigger) ?? el
          : el;

        if (kind === "clip") {
          gsap.from(el, {
            clipPath: "inset(0% 0% 100% 0%)",
            duration: 1.35,
            delay,
            ease: "power4.inOut",
            scrollTrigger: { trigger, start: "top 92%", once: true },
          });
        } else if (kind === "fade") {
          gsap.from(el, {
            autoAlpha: 0,
            duration: 1.1,
            delay,
            ease: "power2.out",
            scrollTrigger: { trigger, start: "top 92%", once: true },
          });
        } else if (kind === "line") {
          gsap.from(el, {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 1.2,
            delay,
            ease: "power3.inOut",
            scrollTrigger: { trigger, start: "top 94%", once: true },
          });
        } else {
          gsap.from(el, {
            y: 34,
            autoAlpha: 0,
            duration: 1.05,
            delay,
            ease: "power3.out",
            scrollTrigger: { trigger, start: "top 90%", once: true },
          });
        }
      });

      /* Line-by-line headings --------------------------------------------- */
      gsap.utils.toArray<HTMLElement>("[data-reveal-lines]").forEach((el) => {
        const spans = el.querySelectorAll<HTMLElement>(".line-mask > span");
        if (!spans.length) return;
        gsap.from(spans, {
          yPercent: 112,
          duration: 1.15,
          stagger: 0.09,
          ease: "power4.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      /* Staggered groups --------------------------------------------------- */
      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((el) => {
        const items = el.querySelectorAll<HTMLElement>("[data-stagger-item]");
        if (!items.length) return;
        gsap.from(items, {
          y: 24,
          autoAlpha: 0,
          duration: 0.95,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      /* Slow image drift -------------------------------------------------- */
      const drifts: Array<[string, number]> = [
        [".about__media-main .plate__img, .about__media-main .plate__art", 5],
        [".dining__main .plate__img, .dining__main .plate__art", 5],
        [".hero__arch .plate__img, .hero__arch .plate__art", 4],
      ];

      drifts.forEach(([selector, amount]) => {
        const el = document.querySelector<HTMLElement>(selector);
        const section = el?.closest("section");
        if (!el || !section) return;
        gsap.fromTo(
          el,
          { yPercent: -amount / 2, scale: 1.07 },
          {
            yPercent: amount / 2,
            scale: 1.07,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      /* Hero departure ----------------------------------------------------- */
      gsap.to(".hero__copy", {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".hero__foot", {
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "35% top",
          scrub: true,
        },
      });

      /* Gallery reveal ----------------------------------------------------- */
      gsap.utils.toArray<HTMLElement>(".gallery__item").forEach((item, index) => {
        gsap.from(item, {
          y: 30,
          autoAlpha: 0,
          duration: 0.95,
          delay: (index % 3) * 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 94%", once: true },
        });
      });

      /* Stat numbers ------------------------------------------------------- */
      gsap.from(".stat", {
        y: 20,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about__stats", start: "top 90%", once: true },
      });
    });

    /* The pinned wilderness story — desktop only, motion allowed ---------- */
    mm.add(
      "(prefers-reduced-motion: no-preference) and (min-width: 901px)",
      () => {
        const story = document.querySelector<HTMLElement>(".story");
        if (!story) return;

        const scenes = gsap.utils.toArray<HTMLElement>(".story__scene");
        const panels = gsap.utils.toArray<HTMLElement>(".story__panel");
        const count = document.querySelector<HTMLElement>("[data-story-count]");
        if (scenes.length < 2 || panels.length < 2) return;

        gsap.set(scenes.slice(1), { autoAlpha: 0 });
        gsap.set(panels.slice(1), { autoAlpha: 1, yPercent: 100 });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: story,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            onUpdate() {
              if (!count) return;
              const opacities = scenes.map((scene) =>
                Number.parseFloat(getComputedStyle(scene).opacity) || 0,
              );
              const index = opacities.indexOf(Math.max(...opacities));
              count.textContent = String(index + 1).padStart(2, "0");
            },
          },
        });

        panels.forEach((panel, index) => {
          if (index === 0) return;
          tl.to(
            panels[index - 1],
            { yPercent: -100, duration: 0.65, ease: "power2.inOut" },
            ">",
          )
            .fromTo(
              panel,
              { yPercent: 100 },
              { yPercent: 0, duration: 0.65, ease: "power2.inOut" },
              "<",
            )
            .to(scenes[index - 1], { autoAlpha: 0, duration: 0.55 }, "<")
            .fromTo(
              scenes[index],
              { autoAlpha: 0, scale: 1.06 },
              { autoAlpha: 1, scale: 1, duration: 0.6 },
              "<",
            );
        });

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      },
    );

    return () => {
      mm.revert();
    };
  }, []);

  return null;
}