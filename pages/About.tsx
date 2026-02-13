
import React from 'react';
import { Button } from '../components/ui/Button';
import { Page } from '../types';

interface AboutProps {
  onNavigate?: (page: Page) => void;
}

export const About: React.FC<AboutProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="relative h-[60vh] bg-neutralDark overflow-hidden">
        <img 
          src="https://drive.google.com/thumbnail?id=1hLw1ouVo2PeHMC6kjh_HrK4NGSfnV8es&sz=s800" 
          alt="Virginia Beach Coastline" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="font-serif text-6xl text-white tracking-wide">Our Story</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-24">
        <h2 className="font-serif text-4xl text-neutralDark mb-8 text-center">From Desert Glow to Coastal Charm</h2>
        <div className="prose prose-lg mx-auto text-gray-600 leading-loose text-center mb-16">
          <p className="mb-6">
            Evolet Glam was founded on the belief that life’s most profound moments deserve a setting of unmatched beauty. Our journey began in the vibrant landscapes of Las Vegas, where we perfected the art of high-end design and stress-free planning.
          </p>
          <p className="mb-6">
            Today, we have traded the desert skyline for the Atlantic horizon. Now based in Coastal Virginia, we bring that same level of elite craftsmanship to the shores of Virginia Beach, Norfolk, and Hampton.
          </p>
          <p className="mb-6">
            We aren't just event planners; we are coastal scene setters. We specialize in transforming the natural elegance of the beach into a private, editorial stage for your love story.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div className="order-2 md:order-1">
             <h3 className="font-serif text-2xl text-neutralDark mb-4">The Coastal Philosophy</h3>
             <p className="text-gray-600 leading-relaxed mb-6">
               Luxury is in the harmony between design and nature. We use windproof lighting, weighted textures, and fresh blooms that thrive in the sea breeze to ensure your moment is as flawless as it is beautiful.
             </p>
             <p className="text-gray-600 leading-relaxed">
               Our turnkey approach means we handle the beach permits, the timing of the tide, and the intricate setup. All you have to do is show up and ask the question.
             </p>
          </div>
          <div className="order-1 md:order-2 h-80 rounded-lg overflow-hidden shadow-xl">
             <img src="https://picsum.photos/seed/aboutbeach/600/800" alt="Coastal Design" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="text-center bg-neutralLight p-12 rounded-2xl">
          <h3 className="font-serif text-3xl text-neutralDark mb-4">Ready for the golden hour?</h3>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            Let's design a seaside proposal that reflects your unique bond.
          </p>
          {onNavigate && (
            <Button onClick={() => onNavigate('home')} className="bg-primary text-neutralDark hover:bg-[#d6c5b8]">
              Design Your Beach Moment
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
