import { CONTACT, NAV_LINKS } from "@/lib/content";
import { ArchMark } from "@/components/media/ArchMark";
import { ReplayIntro } from "@/components/layout/ReplayIntro";
import { ArrowRight, ArrowUp } from "@/components/ui/Icons";

const experienceLinks = [
  { label: "Rooms & suites", href: "#stays" },
  { label: "Dining", href: "#dining" },
  { label: "Banquet & halls", href: "#celebrations" },
  { label: "Weddings & events", href: "#celebrations" },
  { label: "Conference", href: "#celebrations" },
  { label: "Gallery", href: "#gallery" },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer__top">
          <div className="footer__brand">
            <a className="brand" href="#top" aria-label="Hotel Kanaar Corbett, back to top">
              <span className="brand__hotel">Hotel</span>
              <span className="brand__name">
                Kanaar <em>Corbett</em>
              </span>
              <span className="brand__sub">A unit of The Corbett Ramdutt</span>
            </a>
            <p>
              A premier destination in Peerumadara, Ramnagar — for quiet stays,
              considered dining, grand celebrations, and gathering well, near Jim
              Corbett National Park.
            </p>
            <p className="footer__sig">Stay. Celebrate. Gather.</p>
          </div>

          <div className="footer__col">
            <h3>Explore</h3>
            <ul>
              {NAV_LINKS.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
              <li>
                <a href="#gallery">Gallery</a>
              </li>
            </ul>
          </div>

          <div className="footer__col">
            <h3>Experience</h3>
            <ul>
              {experienceLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col footer__col--contact">
            <h3>Contact</h3>
            <p>
              Hotel Kanaar Corbett
              <br />
              {CONTACT.address}
            </p>
            <ul>
              <li>
                <a href={CONTACT.phonePrimaryHref}>{CONTACT.phonePrimary}</a>
              </li>
              <li>
                <a href={CONTACT.phoneSecondaryHref}>{CONTACT.phoneSecondary}</a>
              </li>
              <li>
                <a href={CONTACT.emailHref}>{CONTACT.email}</a>
              </li>
              <li>
                <a href={CONTACT.mapUrl} target="_blank" rel="noreferrer">
                  Get directions
                </a>
              </li>
            </ul>
            <a className="btn btn--primary footer__cta" href="#contact">
              Begin your stay
              <ArrowRight />
            </a>
          </div>
        </div>

        <div className="footer__mark">
          <div className="footer__wordmark">
            <span className="footer__hotel">Hotel</span>
            <p>Kanaar <em>Corbett</em></p>
          </div>
          <ArchMark className="footer__monogram" showDetails={false} />
        </div>

        <div className="footer__bottom">
          <span>© 2026 Hotel Kanaar Corbett</span>
          <span>Peerumadara · Ramnagar · Uttarakhand</span>
          <ReplayIntro />
          <a className="to-top" href="#top">
            Back to top
            <ArrowUp />
          </a>
        </div>
      </div>
    </footer>
  );
}
