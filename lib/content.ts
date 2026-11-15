import type { Scene } from "@/components/media/Plate";
import { IMAGES, type SiteImage } from "./images";

export const NAV_LINKS = [
  { label: "The Hotel", href: "#hotel" },
  { label: "Stays", href: "#stays" },
  { label: "Dining", href: "#dining" },
  { label: "Celebrations", href: "#celebrations" },
  { label: "Corbett", href: "#corbett" },
  { label: "Gallery", href: "#gallery" },
  { label: "Parking", href: "#parking" },
];

export const CONTACT = {
  name: "Hotel Kanaar Corbett",
  strapline: "A unit of The Corbett Ramdutt",
  address: "Jim Corbett, Peerumadara, Ramnagar, Dist. Nainital, Uttarakhand.",
  mapUrl:
    "https://www.google.com/maps/dir/?api=1&destination=29.3377768,79.0581322",
  phonePrimary: "+91 8954389999",
  phonePrimaryHref: "tel:+918954389999",
  phoneSecondary: "+91 7417747918",
  phoneSecondaryHref: "tel:+917417747918",
  whatsapp: "https://wa.me/917417747918",
  email: "thekanaarcorbett@gmail.com",
  emailHref: "mailto:thekanaarcorbett@gmail.com",
};

export const ROOMS = [
  {
    index: "01",
    name: "Standard Room",
    kicker: "Garden Wing",
    description:
      "An elegantly furnished retreat with a queen or king bed, soft natural light, and every quiet convenience considered.",
    size: "350 sq ft",
    occupancy: "2 adults + 1 child",
    bed: "Queen / King",
    amenities: [
      "Air conditioning",
      "High-speed Wi-Fi",
      "Flat-screen television",
      "Tea & coffee maker",
    ],
    scene: "room" as const,
    image: IMAGES.standardRoom,
    imagePosition: "66% 50%",
  },
  {
    index: "02",
    name: "Luxury Room",
    kicker: "Signature Stay",
    description:
      "Generous in scale and lavishly appointed, with a private balcony, a seating lounge, and views across the Uttarakhand hills.",
    size: "550 sq ft",
    occupancy: "2 adults + 2 children",
    bed: "Super king",
    amenities: [
      "Private balcony",
      "Seating lounge",
      '50" 4K smart television',
      "Nespresso coffee station",
    ],
    scene: "suite" as const,
    image: IMAGES.luxuryRoom,
    imagePosition: "48% 55%",
    featured: true,
  },
];

type EventSpace = {
  index: string;
  name: string;
  type: string;
  capacity: string;
  description: string;
  details: string[];
  scene: Scene;
  image: SiteImage;
  imagePosition: string;
};

export const EVENT_SPACES: EventSpace[] = [
  {
    index: "01",
    name: "Grand Banquet Hall",
    type: "Weddings & receptions",
    capacity: "200 – 500+ guests",
    description:
      "Crystal chandeliers, a grand stage, considered acoustics, and graceful dining arrangements for the most important days.",
    details: ["Central air conditioning", "Grand stage setup", "Crystal lighting", "Buffet dining"],
    scene: "banquet" as const,
    image: IMAGES.banquet,
    imagePosition: "50% 50%",
  },
  {
    index: "02",
    name: "Executive Conference Hall",
    type: "Corporate & seminars",
    capacity: "50 – 150 delegates",
    description:
      "A focused, professional environment with 4K projection, fast connectivity, and the quiet service that good work needs.",
    details: ["4K AV projection", "High-speed Wi-Fi", "Podium & microphones", "Flexible seating"],
    scene: "conference" as const,
    image: IMAGES.conference,
    imagePosition: "50% 50%",
  },
  {
    index: "03",
    name: "Mini Celebration Hall",
    type: "Intimate gatherings",
    capacity: "30 – 80 guests",
    description:
      "A warm, private room for birthdays, anniversaries, ring ceremonies, and family evenings that deserve their own stage.",
    details: ["Party sound system", "Custom theme decor", "Private dining", "Warm, intimate scale"],
    scene: "dining" as const,
    image: IMAGES.celebrationStage,
    imagePosition: "50% 58%",
  },
];

type Experience = {
  index: string;
  title: string;
  copy: string;
  scene: Scene;
  image?: SiteImage;
  imagePosition?: string;
};

export const EXPERIENCES: Experience[] = [
  {
    index: "01",
    title: "Forest mornings",
    copy: "Mist in the sal trees, birdsong before breakfast, and the particular quiet of the Uttarakhand foothills at first light.",
    scene: "forest" as const,
    // Morning light on the property's planted entrance is the closest
    // available photograph to the section's outdoors-at-first-light mood.
    image: IMAGES.festiveEntrance,
    imagePosition: "50% 46%",
  },
  {
    index: "02",
    title: "River country",
    copy: "The Kosi runs through Ramnagar, tracing the edge of the terai. Days here are measured in water, light, and long lunches.",
    scene: "river" as const,
    // The set banquet tables carry the "long lunches" half of the panel.
    image: IMAGES.magentaBanquet,
    imagePosition: "50% 46%",
  },
  {
    index: "03",
    title: "Slow evenings",
    copy: "Return from the wild to warm light, a table set for everyone you love, and nowhere else to be.",
    scene: "terrace" as const,
    image: IMAGES.twilight,
    imagePosition: "50% 52%",
  },
];

type GalleryItem = {
  caption: string;
  scene: Scene;
  span: "tall" | "wide" | "normal";
  image: SiteImage;
  imagePosition: string;
};

export const GALLERY: GalleryItem[] = [
  {
    caption: "The Kanaar welcome",
    scene: "facade",
    span: "tall",
    image: IMAGES.welcome,
    imagePosition: "66% 42%",
  },
  {
    caption: "An entrance in bloom",
    scene: "facade",
    span: "wide",
    image: IMAGES.festiveEntrance,
    imagePosition: "50% 52%",
  },
  {
    caption: "Warm light, soft linens",
    scene: "arch",
    span: "wide",
    image: IMAGES.elegantRoom,
    imagePosition: "50% 44%",
  },
  {
    caption: "A room to return to",
    scene: "room",
    span: "normal",
    image: IMAGES.luxuryRoom,
    imagePosition: "48% 55%",
  },
  {
    caption: "After dark, aglow",
    scene: "facade",
    span: "tall",
    image: IMAGES.twilight,
    imagePosition: "50% 52%",
  },
  {
    caption: "Space to settle in",
    scene: "suite",
    span: "normal",
    image: IMAGES.standardRoom,
    imagePosition: "58% 50%",
  },
  {
    caption: "The grand banquet hall",
    scene: "banquet",
    span: "wide",
    image: IMAGES.banquet,
    imagePosition: "50% 50%",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Beautiful property and a great place for celebrations. We hosted a family wedding reception in the banquet hall and everything was executed flawlessly.",
    name: "Vikramaditya Singhania",
    detail: "Wedding celebration",
  },
  {
    quote:
      "Extremely comfortable rooms with top-notch amenities. The restaurant food quality and indoor parking made our stay completely stress-free.",
    name: "Dr. Rajeshwar Sharma",
    detail: "Room stay",
  },
  {
    quote:
      "We conducted our annual leadership conference here. The conference hall AV setup, internet speed, and catering were top tier.",
    name: "Ananya Roy",
    detail: "Corporate conference",
  },
];

export const AMENITIES = [
  "42 rooms & suites",
  "Multi-cuisine restaurant",
  "Banquets for 500+",
  "Conference facilities",
  "Indoor & outdoor parking",
  "Weddings & celebrations",
];

export const OFFERINGS = [
  "Comfortable rooms & suites",
  "Multi-cuisine restaurant & dining",
  "Grand banquet halls & lawns",
  "Weddings & special celebrations",
  "Conference facilities",
  "Indoor & outdoor parking",
];

export const STATS = [
  { value: "42", label: "Rooms & suites" },
  { value: "03", label: "Event spaces" },
  { value: "500", label: "Guests, at ease" },
  { value: "01", label: "Rare address" },
];
