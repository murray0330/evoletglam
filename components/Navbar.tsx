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
              className="h-12 w-auto mr-3 object-contain"
            />
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-semibold tracking-wide text-neutralDark leading-none">
                Evolet Glam
              </span>
              <span className="text-xs tracking-widest uppercase text-neutralDark/75 mt-1 font-medium">
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
                className={`text-sm uppercase tracking-wider transition-colors duration-200 ${
                  activePage === link.value 
                    ? 'text-neutralDark font-bold' 
                    : 'text-neutralDark/80 hover:text-neutralDark font-medium'
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
               className="bg-white text-neutralDark px-6 py-2 rounded-full text-sm uppercase tracking-wide hover:bg-gray-50 transition-colors shadow-sm font-medium"
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
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.value}
                onClick={() => handleNav(link.value)}
                className={`block w-full text-left px-3 py-4 text-base font-medium border-b border-neutralDark/10 ${
                  activePage === link.value ? 'text-neutralDark font-bold' : 'text-neutralDark/80'
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
               className="block w-full text-left px-3 py-4 text-base font-medium text-neutralDark"
            >
              Inquire Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};