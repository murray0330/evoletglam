import React from 'react';
import { Button } from './ui/Button';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
  onStart?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  const handleStart = () => {
    if (onStart) {
      onStart();
    } else {
      const el = document.getElementById('step1');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-neutralLight">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 animate-fade-in"
        style={{ backgroundImage: `url('https://drive.google.com/thumbnail?id=1sQt_YiOpSGcFedIfJrXFVByBiRQ-OW3M&sz=s800')` }}
      />
      
      {/* Overlay - Black 40% */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <h1 className="font-serif text-4xl sm:text-5xl md:text-8xl text-white mb-4 sm:mb-6 leading-tight animate-slide-up tracking-tight">
          Design your <br/> <span className="italic font-light text-white/95">perfect moment</span>
        </h1>
        <h2 className="text-sm sm:text-lg md:text-xl text-white/90 mb-8 sm:mb-10 max-w-4xl font-light animate-slide-up tracking-wide uppercase" style={{ animationDelay: '0.2s' }}>
          CUSTOMIZE YOUR MOMENT STEP BY STEP.
        </h2>
        
        <div className="flex flex-row gap-3 sm:gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          {/* Hero Buttons: Row-aligned on mobile with smaller padding for fit */}
          <Button onClick={handleStart} className="bg-primary text-neutralDark hover:bg-[#d6c5b8] shadow-xl border border-transparent text-xs sm:text-base px-4 sm:px-8">
            Start Designing
          </Button>
          
          <Button onClick={scrollToServices} className="bg-white text-neutralDark border-2 border-white hover:bg-gray-100 hover:border-gray-100 text-xs sm:text-base px-4 sm:px-8">
            Our Services
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce cursor-pointer opacity-80 hover:opacity-100 transition-opacity" onClick={scrollToServices}>
        <ArrowDown size={24} strokeWidth={1} />
      </div>
    </div>
  );
};