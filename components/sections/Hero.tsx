"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useIntro } from "@/components/experience/IntroProvider";
import { IMAGES } from "@/lib/images";
import { Plate } from "@/components/media/Plate";
import { ArchMark } from "@/components/media/ArchMark";
import { ArrowRight, ArrowUpRight } from "@/components/ui/Icons";

export function Hero() {
  const { introDone } = useIntro();
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!introDone || !rootRef.current) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(".hero__arch", { clipPath: "inset(0% 0% 0% 0%)" });
      return;
    }

    const mobile = window.matchMedia("(max-width: 900px)").matches;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero__eyebrow", { autoAlpha: 0, y: 12, duration: 0.7 }, 0)
        .from(
          ".hero__title .line-mask > span",
          { yPercent: 112, duration: 1.15, stagger: 0.1, ease: "power4.out" },
          0.05,
        );

      if (!mobile) {
        tl.to(
          ".hero__arch",
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "power4.inOut" },
          0.12,
        ).from(
          ".hero__arch .plate__art",
          { scale: 1.18, duration: 1.8, ease: "power3.out" },
          0.18,
        );
      } else {
        tl.from(".hero__aside", { autoAlpha: 0, y: 22, duration: 1 }, 0.25);
      }

      tl.from(".hero__frame", { autoAlpha: 0, duration: 1.1 }, 0.85)
        .from(".hero__mini", { autoAlpha: 0, y: 24, duration: 1 }, 0.8)
        .from(".hero__caption, .hero__vertical", { autoAlpha: 0, duration: 0.8 }, 1)
        .from(".hero__desc", { autoAlpha: 0, y: 16, duration: 0.9 }, 0.45)
        .from(
          ".hero__actions .btn",
          { autoAlpha: 0, y: 14, duration: 0.7, stagger: 0.08 },
          0.55,
        )
        .from(
          ".hero__foot > *",
          { autoAlpha: 0, y: 10, duration: 0.8, stagger: 0.08 },
          0.85,
        );
    }, rootRef);

    return () => ctx.revert();
  }, [introDone]);

  return (
    <section className="hero" id="top" ref={rootRef}>
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__bg-arch">
          <ArchMark showDetails={false} />
        </div>
        <div className="hero__bg-line" />
      </div>

      <div className="hero__inner">
        <div className="hero__copy">
          <p className="eyebrow hero__eyebrow">A unit of The Corbett Ramdutt</p>

          <h1 className="hero__title">
            <span className="line-mask">
              <span>Experience the</span>
            </span>
            <span className="line-mask">
              <span>
                <em>Art of Hospitality</em>
              </span>
            </span>
            <span className="line-mask">
              <span>at Corbett</span>
            </span>
          </h1>

          <div className="hero__sub">
            <p className="hero__desc">
              Discover a welcoming destination for memorable stays, exceptional
              dining, grand celebrations, and meaningful gatherings in
              Peerumadara, near Jim Corbett National Park.
            </p>
            <div className="hero__actions">
              <a className="btn btn--primary" href="#hotel">
                Explore the hotel
                <ArrowRight />
              </a>
              <a className="btn btn--ghost" href="#celebrations">
                Plan your event
                <ArrowUpRight />
              </a>
            </div>
          </div>
        </div>

        <div className="hero__aside">
          <figure className="hero__figure">
            <div className="hero__arch">
              <Plate scene="facade" image={IMAGES.welcome} imagePosition="66% 42%" priority />
            </div>
            <span className="hero__frame" aria-hidden="true" />
            <div className="hero__mini" aria-hidden="true">
              <Plate scene="forest" />
            </div>
            <span className="hero__vertical">Peerumadara · Ramnagar</span>
          </figure>
        </div>
      </div>

      <div className="hero__foot">
        <span className="hero__scroll">
          Scroll to discover
          <span className="hero__scroll-line" aria-hidden="true" />
        </span>
        <span className="hero__foot-right">
          <span>Jim Corbett National Park</span>
          <span>Peerumadara, Uttarakhand</span>
        </span>
      </div>
    </section>
  );
}