import { CONTACT } from "@/lib/content";
import { Instagram, WhatsApp } from "@/components/ui/Icons";

const INSTAGRAM_URL = "https://www.instagram.com/kanaarcorbett";

/**
 * Fixed shortcut to the two channels guests use most: WhatsApp for reservations
 * and Instagram for the latest from the property. Sits below the header, menu
 * and lightbox so those overlays always take precedence.
 */
export function ContactRail() {
  return (
    <aside className="contact-rail" aria-label="Chat and follow Hotel Kanaar Corbett">
      <a
        className="contact-rail__link"
        href={CONTACT.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Hotel Kanaar Corbett on WhatsApp"
        title="WhatsApp"
      >
        <WhatsApp />
      </a>
      <a
        className="contact-rail__link"
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Follow Hotel Kanaar Corbett on Instagram"
        title="Instagram"
      >
        <Instagram />
      </a>
    </aside>
  );
}
