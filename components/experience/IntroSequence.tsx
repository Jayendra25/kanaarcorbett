"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArchMark } from "@/components/media/ArchMark";

type IntroSequenceProps = {
  onReveal: () => void;
  onDone: () => void;
};

export function IntroSequence({ onReveal, onDone }: IntroSequenceProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const revealedRef = useRef(false);
  const finishedRef = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (document.documentElement.dataset.intro === "skip" || window.__kanaarIntroMode === "skip") {
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 720px)").matches;

    const reveal = () => {
      if (revealedRef.current) return;
      revealedRef.current = true;
      onReveal();
    };

    const finish = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      reveal();
      onDone();
    };

    if (reduced) {
      finish();
      return;
    }

    const ctx = gsap.context(() => {
      const paths = gsap.utils.toArray<SVGPathElement>(".arch-line");
      paths.forEach((path) => {
        const length = path.getTotalLength();
        path.setAttribute("stroke-dasharray", `${length}`);
        path.setAttribute("stroke-dashoffset", `${length}`);
      });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: finish,
      });
      timelineRef.current = tl;

      const drawSpeed = mobile ? 1.05 : 1.5;

      tl.to(".intro__emblem", { opacity: 1, duration: 0.55, ease: "power1.out" }, 0)
        .to(
          paths,
          {
            attr: { "stroke-dashoffset": 0 },
            duration: drawSpeed,
            stagger: mobile ? 0.1 : 0.16,
            ease: "power2.inOut",
          },
          0.12,
        )
        .to(".arch-detail", { opacity: 0.72, duration: 0.6 }, "-=0.5")
        .to(".intro__hotel", { opacity: 1, duration: 0.55 }, "-=0.6")
        .fromTo(
          ".intro__name",
          { yPercent: 112 },
          { yPercent: 0, duration: 1, ease: "power4.out" },
          "-=0.35",
        )
        .to(
          ".intro__rule",
          { opacity: 1, scaleX: 1, duration: 0.8, ease: "power3.inOut" },
          "-=0.55",
        )
        .to(".intro__tagline", { opacity: 1, duration: 0.7 }, "-=0.55")
        .to(".intro__foot", { opacity: 1, duration: 0.6 }, "-=0.45")
        .to(
          ".intro__progress span",
          { scaleX: 1, duration: mobile ? 1.4 : 1.9, ease: "power1.inOut" },
          0.2,
        )
        .to({}, { duration: mobile ? 0.15 : 0.35 })
        .add(() => reveal())
        .to(
          ".intro__center",
          { opacity: 0, y: -18, scale: 1.055, duration: 0.85, ease: "power2.inOut" },
          "<",
        )
        .to(".intro__foot", { opacity: 0, duration: 0.35 }, "<")
        .to(
          root,
          {
            clipPath: "inset(0% 0% 100% 0%)",
            duration: mobile ? 0.85 : 1.05,
            ease: "power4.inOut",
          },
          "<0.12",
        )
        .add(() => finish(), "-=0.05");
    }, root);

    const skip = () => {
      if (finishedRef.current) return;
      timelineRef.current?.kill();
      reveal();
      gsap.to(root, {
        opacity: 0,
        duration: 0.35,
        ease: "power2.out",
        onComplete: finish,
      });
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") skip();
    };

    const button = root.querySelector<HTMLButtonElement>(".intro__skip");
    button?.addEventListener("click", skip);
    window.addEventListener("keydown", onKey);

    return () => {
      ctx.revert();
      button?.removeEventListener("click", skip);
      window.removeEventListener("keydown", onKey);
      timelineRef.current?.kill();
    };
  }, [onDone, onReveal]);

  return (
    <div className="intro" ref={rootRef} role="presentation" aria-label="Hotel Kanaar Corbett introduction">
      <div className="intro__grain" />
      <div className="intro__glow" />

      <div className="intro__center">
        <ArchMark className="intro__emblem" animated />
        <div className="intro__wordmark">
          <span className="intro__hotel">Hotel</span>
          <span className="intro__mask">
            <span className="intro__name">
              Kanaar <em>Corbett</em>
            </span>
          </span>
        </div>
        <span className="intro__rule" />
        <span className="intro__tagline">A unit of The Corbett Ramdutt</span>
      </div>

      <div className="intro__foot">
        <p className="intro__place">
          Peerumadara, Ramnagar
          <br />
          Uttarakhand, India
        </p>
        <button type="button" className="intro__skip" aria-label="Skip introduction">
          Skip intro
          <span aria-hidden="true">✕</span>
        </button>
      </div>

      <div className="intro__progress" aria-hidden="true">
        <span />
      </div>
    </div>
  );
}