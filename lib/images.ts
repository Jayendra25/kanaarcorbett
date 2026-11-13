export type SiteImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/**
 * Central registry for the property photography.
 *
 * Add or replace a file in `public/images/` and update its entry here; every
 * section and gallery frame reads from this object so paths stay consistent.
 */
export const IMAGES = {
  welcome: {
    src: "/images/hotel/kanaar-welcome-reception.png",
    alt: "Two members of the Kanaar Corbett team in traditional attire welcoming guests at the reception desk",
    width: 1536,
    height: 1024,
  },
  standardRoom: {
    src: "/images/rooms/standard-room.png",
    alt: "Standard room at Hotel Kanaar Corbett with a double bed, wall-mounted television, air conditioning, and tea station",
    width: 1536,
    height: 1024,
  },
  luxuryRoom: {
    src: "/images/rooms/luxury-room.png",
    alt: "Luxury room at Hotel Kanaar Corbett with a king bed, green lounge chair, and framed mountain photography",
    width: 1536,
    height: 1024,
  },
  elegantRoom: {
    src: "/images/rooms/elegant-room.png",
    alt: "Elegantly furnished room at Hotel Kanaar Corbett with warm cove lighting, soft curtains, and a seating corner",
    width: 1024,
    height: 1536,
  },
  banquet: {
    src: "/images/banquet/grand-banquet-hall.webp",
    alt: "The grand banquet hall at Hotel Kanaar Corbett with sculptural ceiling lights, gold panelling, and a red carpet",
    width: 1250,
    height: 1000,
  },
  conference: {
    src: "/images/Conference.png",
    alt: "Hotel Kanaar Corbett architectural gate logo — ornate Indian arch design in amber gold",
    width: 500,
    height: 500,
  },
  logoGate: {
    src: "/images/hotel/kanaar-logo-gate.webp",
    alt: "Hotel Kanaar Corbett architectural gate logo — ornate Indian arch design in amber gold",
    width: 500,
    height: 500,
  },
} as const satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof IMAGES;
