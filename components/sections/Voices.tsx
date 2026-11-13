"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/content";
import { ArrowLeft, ArrowRight } from "@/components/ui/Icons";

export function Voices() {
  const [index, setIndex] = useState(0);
  const total = TESTIMONIALS.length;
  const item = TESTIMONIALS[index];

  const go = (direction: number) => {
    setIndex((current) => (current + direction + total) % total);
  };

  return (
    <section className="section voices" aria-labelledby="voices-title">
      <div className="shell">
        <div className="voices__inner">
          <div className="section-label" style={{ justifyContent: "center" }}>
            <span>07</span>
            <span>Guest voices</span>
          </div>
          <h2 id="voices-title" className="sr-only">
            What our guests say
          </h2>
          <div className="voices__mark" aria-hidden="true">
            “
          </div>

          <div className="voices__stage" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <blockquote className="voices__quote">{item.quote}</blockquote>
                <div className="voices__meta">
                  <span className="voices__name">— {item.name}</span>
                  <span className="voices__detail">{item.detail}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="voices__nav">
            <button
              type="button"
              className="voices__btn"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
            >
              <ArrowLeft />
            </button>
            <span className="voices__count">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <button
              type="button"
              className="voices__btn"
              onClick={() => go(1)}
              aria-label="Next testimonial"
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}