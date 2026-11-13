export const NAV_LINKS = [
  { label: "The Hotel", href: "#hotel" },
  { label: "Stays", href: "#stays" },
  { label: "Dining", href: "#dining" },
  { label: "Celebrations", href: "#celebrations" },
  { label: "Corbett", href: "#corbett" },
  { label: "Gallery", href: "#gallery" },
];

export const CONTACT = {
  name: "Hotel Kanaar Corbett",
  strapline: "A unit of The Corbett Ramdutt",
  address: "Peerumadara, Ramnagar, Dist. Nainital, Uttarakhand",
  mapUrl:
    "https://maps.google.com/?q=Peerumadara+Ramnagar+Nainital+Uttarakhand",
  phonePrimary: "+91 89543 89999",
  phonePrimaryHref: "tel:+918954389999",
  phoneSecondary: "+91 74177 47918",
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
  },
  {
    index: "02",
    name: "Luxury Room",
    kicker: "Signature Stay",
    description:
      "Generous in scale and lavishly appointed, with a private balcony, a seating lounge, and views across the Kumaon landscape.",
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
    featured: true,
  },
];

export const EVENT_SPACES = [
  {
    index: "01",
    name: "Grand Banquet Hall",
    type: "Weddings & receptions",
    capacity: "200 – 500+ guests",
    description:
      "Crystal chandeliers, a grand stage, considered acoustics, and graceful dining arrangements for the most important days.",
    details: ["Central air conditioning", "Grand stage setup", "Crystal lighting", "Buffet dining"],
    scene: "banquet" as const,
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
  },
];

export const EXPERIENCES = [
  {
    index: "01",
    title: "Forest mornings",
    copy: "Mist in the sal trees, birdsong before breakfast, and the particular quiet of the Kumaon foothills at first light.",
    scene: "forest" as const,
  },
  {
    index: "02",
    title: "River country",
    copy: "The Kosi runs through Ramnagar, tracing the edge of the terai. Days here are measured in water, light, and long lunches.",
    scene: "river" as const,
  },
  {
    index: "03",
    title: "Slow evenings",
    copy: "Return from the wild to warm light, a table set for everyone you love, and nowhere else to be.",
    scene: "terrace" as const,
  },
];

export const GALLERY = [
  { caption: "The arrival court", scene: "facade" as const, span: "tall" },
  { caption: "Garden-facing arches", scene: "arch" as const, span: "wide" },
  { caption: "Breakfast, unhurried", scene: "dining" as const, span: "normal" },
  { caption: "A room to return to", scene: "room" as const, span: "normal" },
  { caption: "Celebrations, held here", scene: "banquet" as const, span: "wide" },
  { caption: "Into the wild", scene: "forest" as const, span: "tall" },
  { caption: "Afternoons by the water", scene: "pool" as const, span: "normal" },
  { caption: "The long verandah", scene: "terrace" as const, span: "normal" },
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
