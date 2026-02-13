
import React from 'react';
import { Instagram, Facebook, Mail } from 'lucide-react';
import { Page } from '../types';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-neutralLight text-neutralDark py-16 border-t border-neutralDark/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
               <img 
                 src="https://drive.google.com/thumbnail?id=1u7VQG6fi-IcUqQ81Nat-byd4S1NzFZqa&sz=s800" 
                 alt="Evolet Glam" 
                 className="h-14 w-auto object-contain"
               />
               <span className="font-serif text-2xl font-semibold">Evolet Glam</span>
            </div>
            <p className="text-neutralDark/80 text-sm leading-relaxed max-w-xs font-medium">
              Creating unforgettable proposal experiences across Coastal Virginia. 
              We handle the details, you handle the romance.
            </p>
            <div className="flex space-x-4 pt-4">
              <Instagram className="h-5 w-5 text-neutralDark/70 hover:text-neutralDark cursor-pointer" />
              <Facebook className="h-5 w-5 text-neutralDark/70 hover:text-neutralDark cursor-pointer" />
              <Mail className="h-5 w-5 text-neutralDark/70 hover:text-neutralDark cursor-pointer" />
            </div>
          </div>

          {/* Links */}
          <div className="md:text-center">
            <h3 className="font-serif text-lg mb-6 font-medium">Quick Links</h3>
            <ul className="space-y-3 text-neutralDark/80 text-sm font-medium">
              <li><button onClick={() => onNavigate('home')} className="hover:text-neutralDark">Home</button></li>
              <li><button onClick={() => onNavigate('about')} className="hover:text-neutralDark">About</button></li>
              <li><button onClick={() => onNavigate('gallery')} className="hover:text-neutralDark">Gallery</button></li>
              <li><button onClick={() => onNavigate('faq')} className="hover:text-neutralDark">FAQ</button></li>
              <li><button onClick={() => onNavigate('terms')} className="hover:text-neutralDark">Terms of Service</button></li>
              <li><button onClick={() => onNavigate('privacy')} className="hover:text-neutralDark">Privacy Policy</button></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:text-right">
            <h3 className="font-serif text-lg mb-6 font-medium">Contact Us</h3>
            <ul className="space-y-3 text-neutralDark/80 text-sm font-medium">
              <li>hello@evoletglam.com</li>
              <li>+1 (757) 555-0123</li>
              <li>Virginia Beach, VA</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutralDark/10 mt-16 pt-8 text-center text-xs text-neutralDark/70 font-medium">
          © {new Date().getFullYear()} Evolet Glam. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
