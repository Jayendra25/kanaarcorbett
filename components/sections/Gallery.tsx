"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GALLERY } from "@/lib/content";
import { Plate } from "@/components/media/Plate";
import { lockPageScroll } from "@/lib/scroll";
import { ArrowLeft, ArrowRight, ArrowUpRight, Close } from "@/components/ui/Icons";

const ratios: Record<string, string> = {
  tall: "3 / 4.2",
  wide: "4 / 3",
  normal: "1 / 1.02",
};

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const isOpen = active !== null;

  const go = useCallback((direction: number) => {
    setActive((current) => {
      if (current === null) return current;
      return (current + direction + GALLERY.length) % GALLERY.length;
    });
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    lockPageScroll(true);
    const timer = window.setTimeout(() => closeRef.current?.focus(), 120);
    return () => {
      window.clearTimeout(timer);
      lockPageScroll(false);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, isOpen]);

  const activeItem = active !== null ? GALLERY[active] : null;

  return (
    <section className="section gallery" id="gallery">
      <div className="shell">
        <div className="section-head">
          <div>
            <div className="section-label">
              <span>06</span>
              <span>Gallery</span>
            </div>
            <h2 className="h2 section-head__title" data-reveal-lines>
              <span className="line-mask">
                <span>A glimpse</span>
              </span>
              <span className="line-mask">
                <span>
                  of <em>Kanaar.</em>
                </span>
              </span>
            </h2>
          </div>
          <div className="section-head__aside" data-reveal>
            <p>
              Quiet corners, long tables, and the landscape that surrounds it all.
              A few frames from the property and the world just beyond.
            </p>
          </div>
        </div>

        <div className="gallery__grid">
          {GALLERY.map((item, index) => (
            <button
              type="button"
              className="gallery__item"
              key={item.caption}
              onClick={() => setActive(index)}
              aria-label={`Open image: ${item.caption}`}
            >
              <Plate scene={item.scene} ratio={ratios[item.span] ?? ratios.normal} />
              <span className="gallery__caption">
                {item.caption}
                <ArrowUpRight />
              </span>
            </button>
          ))}
        </div>

        <div className="gallery__foot" data-reveal>
          <p>The property, quietly observed.</p>
          <a className="link-arrow" href="#contact">
            Request the full gallery
            <ArrowRight />
          </a>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && activeItem ? (
          <motion.div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`Gallery viewer: ${activeItem.caption}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="lightbox__top">
              <span className="lightbox__label">
                Gallery — {String((active ?? 0) + 1).padStart(2, "0")} /{" "}
                {String(GALLERY.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                className="lightbox__close"
                onClick={() => setActive(null)}
                ref={closeRef}
                aria-label="Close gallery"
              >
                <Close />
              </button>
            </div>

            <div className="lightbox__stage">
              <AnimatePresence mode="wait">
                <motion.div
                  className="lightbox__figure"
                  key={activeItem.caption}
                  initial={{ opacity: 0, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Plate scene={activeItem.scene} />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="lightbox__foot">
              <span className="lightbox__caption">{activeItem.caption}</span>
              <div className="lightbox__nav">
                <button
                  type="button"
                  className="lightbox__btn"
                  onClick={() => go(-1)}
                  aria-label="Previous image"
                >
                  <ArrowLeft />
                </button>
                <button
                  type="button"
                  className="lightbox__btn"
                  onClick={() => go(1)}
                  aria-label="Next image"
                >
                  <ArrowRight />
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}