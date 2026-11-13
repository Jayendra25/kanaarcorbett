"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { NAV_LINKS, CONTACT } from "@/lib/content";
import { useIntro } from "@/components/experience/IntroProvider";
import { Menu } from "@/components/layout/Menu";
import { ArrowRight } from "@/components/ui/Icons";

export function Header() {
  const { introDone } = useIntro();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
        <motion.div
          className="site-header__inner shell"
          initial={{ opacity: 0, y: -14 }}
          animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: -14 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <a className="brand" href="#top" aria-label="Hotel Kanaar Corbett, back to top">
            <span className="brand__name">
              Kanaar <em>Corbett</em>
            </span>
            <span className="brand__sub">A unit of The Corbett Ramdutt</span>
          </a>

          <nav className="site-nav" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <a className="header-phone" href={CONTACT.phonePrimaryHref}>
              {CONTACT.phonePrimary}
            </a>
            <a className="btn btn--primary header-reserve" href="#contact">
              Reserve
              <ArrowRight />
            </a>
            <button
              type="button"
              className="menu-toggle"
              aria-label="Open menu"
              aria-expanded={open}
              aria-haspopup="dialog"
              onClick={() => setOpen(true)}
            >
              Menu
              <span className="menu-toggle__lines" aria-hidden="true">
                <span />
                <span />
              </span>
            </button>
          </div>
        </motion.div>
      </header>

      <Menu open={open} onClose={() => setOpen(false)} />
    </>
  );
}