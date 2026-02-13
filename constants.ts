
import { Item, Package, Testimonial, FaqItem } from './types';

export const OCCASIONS: Item[] = [
  {
    id: "proposal",
    title: "Marriage Proposal",
    tagline: "The big question",
    image: "https://drive.google.com/thumbnail?id=1N8u2JRnIltzbQm7cvcqeUQGGJZNzGg1O&sz=s800",
    details: "A perfectly orchestrated moment on the golden sands of Coastal Virginia to ask the most important question of your life.",
    price: 0,
    category: 'occasion'
  },
  {
    id: "anniversary",
    title: "Anniversary",
    tagline: "Celebrate your love",
    image: "https://drive.google.com/thumbnail?id=1rD2xbzV8IrV-P3pEP2f9PZGPYMhAPvyk&sz=s800",
    details: "Rekindle the romance with a private seaside dinner as the Atlantic waves provide the soundtrack.",
    price: 0,
    category: 'occasion'
  },
  {
    id: "date_night",
    title: "Romantic Date Night",
    tagline: "Just because",
    image: "https://drive.google.com/thumbnail?id=1m7blVxMDhDDTT6wt7GD6sQve_k8wnGU3&sz=s800",
    details: "Escape the ordinary with a curated luxury picnic at Sandbridge or First Landing.",
    price: 0,
    category: 'occasion'
  }
];

export const CENTERPIECES: Item[] = [
  {
    id: "rose_heart_arc",
    title: "Rose Heart Arc",
    subtitle: "Romantic and timeless",
    image: "https://drive.google.com/thumbnail?id=1p-OfTTBm-YPJwd6tXkERmM65J98xLcQF&sz=s800",
    details: "A heart shaped arc with red roses and a warm 'Will you marry me?' neon sign, stunning against a sunset horizon.",
    price: 495,
    category: 'centerpiece'
  },
  {
    id: "marry_me_letters",
    title: "4 ft 'MARRY ME' Letters",
    subtitle: "Bold illuminated marquee",
    image: "https://drive.google.com/thumbnail?id=1HxXkf6IZMZ4na2mVtH0HgWMZDSavFzhV&sz=s800",
    details: "Bright white marquee letters that stand tall on the sand for a dramatic reveal.",
    price: 295,
    category: 'centerpiece'
  },
  {
    id: "ultimate_combo",
    title: "Coastal Romance Combo",
    subtitle: "Maximum impact",
    image: "https://drive.google.com/thumbnail?id=12CR1ZG51N0QrfkL9Mrjp1F9ycVApRjca&sz=s800",
    details: "The ultimate setup: MARRY ME Letters combined with our signature Rose Heart Arc.",
    price: 695,
    category: 'centerpiece'
  }
];

export const TABLE_STYLES: Item[] = [
  {
    id: "classic_romance",
    title: "Classic Romance",
    tagline: "Timeless elegance",
    image: "https://drive.google.com/thumbnail?id=1VdSMt2IQX2t4-VQXw80gSFz5ptQGnK66&sz=s800",
    details: "Crisp white linens, deep red cushions, and silver candelabras for a sophisticated beachside affair.",
    price: 89,
    category: 'table'
  },
  {
    id: "boho_luxe",
    title: "Coastal Boho",
    tagline: "Perfect for the dunes",
    image: "https://drive.google.com/thumbnail?id=1pqpOa_InsomPKIgA-lFPqaZ-j73vgV-t&sz=s800",
    details: "Neutral textures, pampas grass, layered Moroccan rugs, and golden lanterns that glow in the dusk.",
    price: 89,
    category: 'table'
  },
  {
    id: "modern_glam",
    title: "Modern Shoreline",
    tagline: "Sleek and bold",
    image: "https://drive.google.com/thumbnail?id=17O7-PovWMrM2uFxKItqUzt1vNKDmmXhT&sz=s800",
    details: "Monochrome florals and metallic accents that contrast beautifully with the natural elements.",
    price: 89,
    category: 'table'
  },
  {
    id: "luxury_picnic",
    title: "Atlantic Picnic",
    tagline: "Plush seaside comfort",
    image: "https://picsum.photos/seed/picnic/600/400",
    details: "Low wooden table with plush cushions and fairy lights, ideal for a private evening at Sandbridge.",
    price: 149,
    category: 'table'
  }
];

export const CUSTOM_FEATURES: Item[] = [
  { id: "petal_trail", label: "Beach Petal Trail", details: "A pathway of fresh petals leading from the boardwalk to your setup.", price: 85, category: 'feature', image: "https://drive.google.com/thumbnail?id=1DbB-sn1JCAy1Rwia-IXh-gcGTdT43soW&sz=s800" },
  { id: "floral_arrangements", label: "Tidal Florals", details: "Two large, premium bouquets to frame the coastal breeze.", price: 150, category: 'feature', image: "https://drive.google.com/thumbnail?id=1-tEEGFq2Rqzd2UTqkh4RLZXNHa0P5vFz&sz=s800" },
  { id: "candles_led", label: "Windproof LED Candles", details: "Safely flickering flameless candles designed for outdoor settings.", price: 60, category: 'feature', image: "https://drive.google.com/thumbnail?id=1obedn9_enh0fjFfW13Y4Ub-UV2CmVuDf&sz=s800" },
  { id: "neon_sign", label: "Neon Sign", details: "A glowing 'Will You Marry Me?' sign to light up the night.", price: 90, category: 'feature', image: "https://drive.google.com/thumbnail?id=1kSh_R_ZAVx5bNNaxiEce60xqOtfcciTU&sz=s800" },
  { id: "message_board", label: "Custom Message Board", details: "A personalized message board greeting your partner.", price: 120, category: 'feature', image: "https://drive.google.com/thumbnail?id=11uO3Xdv_Wi1t9Dtq9ZUnkzdd0U4k3zYx&sz=s800" },
  { id: "speaker", label: "Bluetooth Speaker", details: "Crystal clear sound for your 'special' song.", price: 200, category: 'feature', image: "https://drive.google.com/thumbnail?id=1VljKDWImXcTzJb6STGv0OGdSH8owm32P&sz=s800" }
];

export const ADD_ONS: Item[] = [
  { id: "photography", label: "Professional Photography", details: "Capture the golden hour light and the big reveal.", price: 500, category: 'addon', image: "https://drive.google.com/thumbnail?id=1ATRqSbtVpLJOA-MLdAGKN7j6BKmAOrzO&sz=s800" },
  { id: "live_music", label: "Live Acoustic Guitar", details: "Soft coastal melodies performed live for your arrival.", price: 500, category: 'addon', image: "https://drive.google.com/thumbnail?id=1dg-0ERSMNMmZNQbiAzfYpqO--id8Dy2W&sz=s800" },
  { id: "limo", label: "Luxury Transport", details: "Private chauffeur service from your hotel or home.", price: 300, category: 'addon', image: "https://drive.google.com/thumbnail?id=1uPM4tvqvhzu7kUwWcidCG5g1pYMW1FPE&sz=s800" },
  { id: "champagne_custom", label: "Champagne Toast", details: "Chilled bottle with glasses to celebrate by the waves.", price: 160, category: 'addon', image: "https://drive.google.com/thumbnail?id=1eFBOKDCyXoqsd5HpuakNN9eVtsPIvIQM&sz=s800" },
  { id: "drone_video", label: "Aerial Drone Coverage", details: "Breathtaking aerial views of the coastline and your moment.", price: 450, category: 'addon', image: "https://drive.google.com/thumbnail?id=1-aVzfLjYwWdKsY8lJIVdtWvGOlmDOSSI&sz=s800" },
  { id: "cinematic_video", label: "Cinematic Highlight Film", details: "A professionally edited 2-minute film of your proposal.", price: 600, category: 'addon', image: "https://drive.google.com/thumbnail?id=1doQMQZg-BhlleZbOC8saVtggCMYWy29f&sz=s800" }
];

export const LOCATIONS: Item[] = [
  { id: "vb_oceanfront", label: "Virginia Beach Oceanfront", image: "https://drive.google.com/thumbnail?id=1-rP_316uFsTQT9gIyUblchLVJiJv-ZYZ&sz=s800", price: 0, category: 'location', details: "The heart of the beach with iconic ocean views." },
  { id: "sandbridge", label: "Sandbridge Beach", image: "https://drive.google.com/thumbnail?id=1UYQSGiTg7Z7BodACtVIi4nvP40tVxTDj&sz=s800", price: 0, category: 'location', details: "Secluded dunes and peaceful shorelines for intimacy." },
  { id: "first_landing", label: "First Landing State Park", image: "https://drive.google.com/thumbnail?id=1OvqiZ5O4XN9mqEFvJ7jLWKBhL6i3q46M&sz=s800", price: 0, category: 'location', details: "Where the forest meets the bay. Enchanting and natural." },
  { id: "norfolk_botanical", label: "Norfolk Botanical Garden", image: "https://drive.google.com/thumbnail?id=1wm-MZ9IEnt5uZF6lYT1Zl_KugyefIo6l&sz=s800", price: 0, category: 'location', details: "Lush gardens and waterfront landscapes in Norfolk." },
  { id: "buckroe_beach", label: "Buckroe Beach (Hampton)", image: "https://drive.google.com/thumbnail?id=1E7bPkmdHPQyKHOLA7f1SlbdJyNbaTE-7&sz=s800", price: 0, category: 'location', details: "A serene Hampton favorite with gentle bay waves." },
  { id: "coastal_home", label: "Private Coastal Home", image: "https://drive.google.com/thumbnail?id=1UrifdbEfmYXk791KCu1spn7V9MB7OTxB&sz=s800", price: 0, category: 'location', details: "We bring the luxury setup to your beachfront rental or home." }
];

export const PACKAGES: Package[] = [
  {
    id: "coastal_glow",
    name: "The Coastal Glow",
    starting_price: 750,
    bullets: [
      "Signature Heart Arc or Marquee Letters",
      "Candlelit path on the sand with petals",
      "Coastal floral accents",
      "1 hour of use",
      "Full beach permit coordination"
    ],
    perfect_for: "Private beach stretches, dunes, boardwalks"
  },
  {
    id: "forever_at_sea",
    name: "Forever At Sea",
    starting_price: 1200,
    bullets: [
      "Full 'MARRY ME' Marquee setup",
      "Large premium rose heart or arch",
      "Lush petal walkway",
      "Two large floral bouquets",
      "Champagne toast for two",
      "2 hours of use"
    ],
    perfect_for: "Sandbridge, Virginia Beach Oceanfront"
  },
  {
    id: "atlantic_grandeur",
    name: "Atlantic Grandeur",
    starting_price: 2000,
    bullets: [
      "Our most grand floral and light installation",
      "Combined letters and neon heart setup",
      "Full cinematic photography package included",
      "Extensive petal and candle decor",
      "Live acoustic musician for 1 hour",
      "2.5 hours of use"
    ],
    perfect_for: "Luxury beach resorts, First Landing State Park"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  { quote: "The sunset at Sandbridge with the heart arc was more than I ever dreamed of.", name: "J. Walters" },
  { quote: "They handled the beach permits and the wind flawlessly. Truly turnkey.", name: "M. Thompson" },
  { quote: "Effortless luxury in Hampton. My fiancée was speechless!", name: "K. Davis" }
];

export const FAQS: FaqItem[] = [
  { q: "Do you handle beach permits?", a: "Yes, we coordinate all necessary permits for Virginia Beach, Norfolk, and Hampton beaches." },
  { q: "What happens if it rains?", a: "We monitor the coast closely and offer flexible rescheduling or indoor back-up venue coordination." },
  { q: "Can we propose at sunrise?", a: "Absolutely. Coastal Virginia sunrise proposals are some of our most magical experiences." },
  { q: "Are locations accessible?", a: "Many of our beach spots are easily accessible. We provide specific arrival instructions for your partner." }
];

export const GALLERY_IMAGES = {
  VirginiaBeach: ["https://picsum.photos/seed/vb1/800/600", "https://picsum.photos/seed/vb2/800/600", "https://picsum.photos/seed/vb3/800/600"],
  Sandbridge: ["https://picsum.photos/seed/sb1/800/600", "https://picsum.photos/seed/sb2/800/600"],
  Norfolk: ["https://picsum.photos/seed/nf1/800/600", "https://picsum.photos/seed/nf2/800/600"],
  Hampton: ["https://picsum.photos/seed/hp1/800/600", "https://picsum.photos/seed/hp2/800/600"],
  Inland: ["https://picsum.photos/seed/in1/800/600", "https://picsum.photos/seed/in2/800/600"]
};
