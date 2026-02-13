
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Page } from '../types';

interface NavbarProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", value: 'home' as Page },
    { label: "About", value: 'about' as Page },
    { label: "Gallery", value: 'gallery' as Page },
    { label: "FAQ", value: 'faq' as Page },
  ];

  const handleNav = (page: Page) => {
    onNavigate(page);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <nav className="bg-primary sticky top-0 z-50 border-b border-neutralDark/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => handleNav('home')}
          >
            <img 
              src="https://drive.google.com/thumbnail?id=1u7VQG6fi-IcUqQ81Nat-byd4S1NzFZqa&sz=s800" 
              alt="Evolet Glam" 
              className="h-10 w-auto mr-3 object-contain"
            />
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-semibold tracking-wide text-neutralDark leading-none">
                Evolet Glam
              </span>
              <span className="text-[8px] sm:text-[10px] tracking-widest uppercase text-neutralDark/70 mt-1 font-bold">
                Perfect Moments
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <button
                key={link.value}
                onClick={() => handleNav(link.value)}
                className={`text-[11px] uppercase tracking-widest transition-colors duration-200 ${
                  activePage === link.value 
                    ? 'text-neutralDark font-bold' 
                    : 'text-neutralDark/60 hover:text-neutralDark font-semibold'
                }`}
              >
                {link.label}
              </button>
            ))}

            <button
               onClick={() => {
                 handleNav('home');
                 setTimeout(() => {
                    const el = document.getElementById('inquiry');
                    if(el) el.scrollIntoView({behavior: 'smooth'});
                 }, 100);
               }}
               className="bg-neutralDark text-white px-6 py-2.5 rounded-full text-[10px] uppercase tracking-widest hover:bg-black transition-colors shadow-sm font-bold ml-4"
            >
              Inquire Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-neutralDark p-2">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-primary border-t border-neutralDark/10 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.value}
                onClick={() => handleNav(link.value)}
                className={`block w-full text-left px-3 py-4 text-xs font-bold uppercase tracking-widest border-b border-neutralDark/5 ${
                  activePage === link.value ? 'text-neutralDark' : 'text-neutralDark/60'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
               onClick={() => {
                 handleNav('home');
                 setTimeout(() => {
                    const el = document.getElementById('inquiry');
                    if(el) el.scrollIntoView({behavior: 'smooth'});
                 }, 100);
               }}
               className="block w-full text-left px-3 py-4 text-xs font-bold uppercase tracking-widest text-neutralDark"
            >
              Inquire Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
