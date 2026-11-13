import type { Metadata, Viewport } from "next";
import { IntroProvider } from "@/components/experience/IntroProvider";
import { MotionDirector } from "@/components/experience/MotionDirector";
import { SmoothScroll } from "@/components/experience/SmoothScroll";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CONTACT } from "@/lib/content";
import "./globals.css";
import "./sections.css";
import "./extras.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kanaarcorbett.com"),
  title: {
    default: "Hotel Kanaar Corbett — Stay. Celebrate. Gather.",
    template: "%s — Hotel Kanaar Corbett",
  },
  description:
    "Hotel Kanaar Corbett is a premier destination in Peerumadara, Ramnagar near Jim Corbett National Park — for comfortable stays, multi-cuisine dining, grand celebrations, and corporate gatherings.",
  alternates: {
    canonical: "https://kanaarcorbett.com",
  },
  keywords: [
    "Hotel Kanaar Corbett",
    "Kanaar Corbett",
    "hotel near Jim Corbett",
    "Peerumadara hotel",
    "Ramnagar hotel",
    "wedding venue Jim Corbett",
    "banquet hall Ramnagar",
    "conference hotel Uttarakhand",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://kanaarcorbett.com",
    siteName: "Hotel Kanaar Corbett",
    title: "Hotel Kanaar Corbett — Stay. Celebrate. Gather.",
    description:
      "A quiet address at the edge of the wild. Stays, dining, celebrations, and gatherings in Peerumadara, Ramnagar, near Jim Corbett National Park.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotel Kanaar Corbett",
    description:
      "Stay. Celebrate. Gather. A premier destination in Peerumadara, Ramnagar, near Jim Corbett National Park.",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#faf9f6",
  colorScheme: "light",
};

const introInit = `(function(){try{var d=document.documentElement;var s=window.location.search;var r=window.matchMedia('(prefers-reduced-motion: reduce)').matches;var seen=sessionStorage.getItem('kanaar-intro')==='1';var force=s.indexOf('intro=1')>-1;var skip=s.indexOf('intro=0')>-1||s.indexOf('nointro=1')>-1;var mode=(skip||r||(!force&&seen))?'skip':'play';window.__kanaarIntroMode=mode;d.dataset.intro=mode;}catch(e){document.documentElement.dataset.intro='play';}})();`;

const hotelSchema = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  name: "Hotel Kanaar Corbett",
  description:
    "A premier destination in Peerumadara, Ramnagar near Jim Corbett National Park, offering rooms and suites, multi-cuisine dining, banquet halls, wedding celebrations, and conference facilities.",
  url: "https://kanaarcorbett.com",
  telephone: "+91-8954389999",
  email: CONTACT.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Peerumadara",
    addressLocality: "Ramnagar",
    addressRegion: "Uttarakhand",
    addressCountry: "IN",
  },
  amenityFeature: [
    "Free Wi-Fi",
    "Multi-cuisine restaurant",
    "Banquet halls",
    "Conference facilities",
    "Indoor and outdoor parking",
    "Air conditioning",
  ].map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true })),
  parentOrganization: { "@type": "Organization", name: "The Corbett Ramdutt" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: introInit }} />
        <noscript>
          <style>{`.intro{display:none!important}.hero__arch{clip-path:inset(0)!important}`}</style>
        </noscript>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <IntroProvider>
          <SmoothScroll />
          <MotionDirector />
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </IntroProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelSchema) }}
        />
      </body>
    </html>
  );
}