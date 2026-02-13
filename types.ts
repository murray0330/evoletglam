
export interface Item {
  id: string;
  title?: string;
  label?: string; // Unified name
  subtitle?: string;
  tagline?: string;
  description?: string;
  details?: string; // Unified description
  image?: string;
  price: number; // normalized from base_price
  category: 'centerpiece' | 'table' | 'feature' | 'addon' | 'location' | 'package' | 'occasion';
}

export interface Package {
  id: string;
  name: string;
  starting_price: number;
  bullets: string[];
  perfect_for: string;
}

export interface Testimonial {
  quote: string;
  name: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface SelectionState {
  occasion: Item | null;
  centerpiece: Item | null;
  tableStyle: Item | null;
  customFeatures: Item[];
  addOns: Item[];
  location: Item | null;
}

export type Page = 'home' | 'gallery' | 'faq' | 'terms' | 'privacy' | 'about';
