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
        style={{ backgroundImage: `url('https://drive.google.com/thumbnail?id=1PevuWVzRxnsepzomGlF9DYJyq40b6jo2&sz=s800')` }}
      />
      
      {/* Overlay - Black 40% */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <h1 className="font-serif text-5xl md:text-8xl text-white mb-6 leading-tight animate-slide-up tracking-tight">
          Design your <br/> <span className="italic font-light text-white/95">perfect moment</span>
        </h1>
        <h2 className="text-lg md:text-xl text-white/90 mb-10 max-w-4xl font-light animate-slide-up tracking-wide" style={{ animationDelay: '0.2s' }}>
          CUSTOMIZE YOUR SCENE STEP BY STEP AND LET US BRING IT TO LIFE.
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          {/* Primary Button: #e3d5ca background, dark text */}
          <Button onClick={handleStart} size="lg" className="bg-primary text-neutralDark hover:bg-[#d6c5b8] shadow-xl border border-transparent">
            Start Designing
          </Button>
          
          {/* Secondary Button: White background, Dark Text for ADA Compliance */}
          <Button onClick={scrollToServices} size="lg" className="bg-white text-neutralDark border-2 border-white hover:bg-gray-100 hover:border-gray-100">
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