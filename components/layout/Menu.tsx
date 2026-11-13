"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS, CONTACT } from "@/lib/content";
import { lockPageScroll } from "@/lib/scroll";
import { ArchMark } from "@/components/media/ArchMark";
import { ArrowRight, Close } from "@/components/ui/Icons";

type MenuProps = {
  open: boolean;
  onClose: () => void;
};

const ease = [0.22, 1, 0.36, 1] as const;

const navVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.055, delayChildren: 0.22 },
  },
};

const itemVariants = {
  hidden: { y: 26, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.85, ease },
  },
};

export function Menu({ open, onClose }: MenuProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    lockPageScroll(true);
    const timer = window.setTimeout(() => closeRef.current?.focus(), 120);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
      lockPageScroll(false);
    };
  }, [open, onClose]);

  const links = [...NAV_LINKS, { label: "Contact", href: "#contact" }];

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="menu"
          role="dialog"
          aria-modal="true"
          aria-label="Hotel Kanaar Corbett menu"
          initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="menu__top">
            <a className="brand" href="#top" onClick={onClose} aria-label="Hotel Kanaar Corbett, home">
              <span className="brand__name">
                Kanaar <em>Corbett</em>
              </span>
              <span className="brand__sub">A unit of The Corbett Ramdutt</span>
            </a>
            <button
              type="button"
              className="menu__close"
              onClick={onClose}
              ref={closeRef}
              aria-label="Close menu"
            >
              Close
              <Close />
            </button>
          </div>

          <div className="menu__body">
            <motion.nav
              className="menu__nav"
              aria-label="Primary"
              variants={navVariants}
              initial="hidden"
              animate="show"
            >
              {links.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="menu__link"
                  variants={itemVariants}
                  onClick={onClose}
                >
                  <small>{String(index + 1).padStart(2, "0")}</small>
                  {link.label}
                </motion.a>
              ))}
            </motion.nav>

            <motion.aside
              className="menu__aside"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.45, ease }}
            >
              <ArchMark className="menu__mark" />
              <div>
                <h4>Reservations</h4>
                <p>
                  <a href={CONTACT.phonePrimaryHref}>{CONTACT.phonePrimary}</a>
                  <br />
                  <a href={CONTACT.phoneSecondaryHref}>{CONTACT.phoneSecondary}</a>
                </p>
              </div>
              <div>
                <h4>Enquiries</h4>
                <p>
                  <a href={CONTACT.emailHref}>{CONTACT.email}</a>
                </p>
              </div>
              <div>
                <h4>Find us</h4>
                <p>
                  {CONTACT.address}
                  <br />
                  <a href={CONTACT.mapUrl} target="_blank" rel="noreferrer">
                    Get directions
                  </a>
                </p>
              </div>
              <a className="btn btn--primary" href="#contact" onClick={onClose}>
                Plan your visit
                <ArrowRight />
              </a>
            </motion.aside>
          </div>

          <div className="menu__foot">
            <span>Peerumadara · Ramnagar · Uttarakhand</span>
            <span>Near Jim Corbett National Park</span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}