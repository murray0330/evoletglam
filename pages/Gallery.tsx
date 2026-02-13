
import React, { useState } from 'react';
import { GALLERY_IMAGES } from '../constants';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export const Gallery: React.FC = () => {
  const tabs = Object.keys(GALLERY_IMAGES);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const currentImages = GALLERY_IMAGES[activeTab as keyof typeof GALLERY_IMAGES];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedImage) return;
    const idx = currentImages.indexOf(selectedImage);
    const nextIdx = (idx + 1) % currentImages.length;
    setSelectedImage(currentImages[nextIdx]);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedImage) return;
    const idx = currentImages.indexOf(selectedImage);
    const prevIdx = (idx - 1 + currentImages.length) % currentImages.length;
    setSelectedImage(currentImages[prevIdx]);
  };

  return (
    <div className="pt-8 pb-20 min-h-screen bg-white">
      <div className="bg-neutralDark text-white py-20 mb-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
           <h1 className="font-serif text-5xl mb-4">Our Portfolio</h1>
           <p className="text-gray-300 max-w-2xl mx-auto">Browse our favorite moments across Coastal Virginia.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full text-sm uppercase tracking-wider transition-all duration-300 ${
                activeTab === tab 
                  ? 'bg-primary text-white shadow-lg' 
                  : 'bg-neutralLight text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {currentImages.map((src, index) => (
            <div 
              key={index} 
              className="relative aspect-[4/3] group overflow-hidden rounded-lg shadow-md cursor-pointer"
              onClick={() => setSelectedImage(src)}
            >
              <img 
                src={src} 
                alt={`${activeTab} ${index}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-xs uppercase tracking-widest border border-white px-4 py-2 rounded-full">View</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-4 hidden md:block"
            onClick={handlePrev}
          >
            <ChevronLeft size={40} />
          </button>

          <img 
            src={selectedImage} 
            alt="Gallery Fullscreen" 
            className="max-w-full max-h-[90vh] rounded-sm shadow-2xl animate-fade-in-up"
            onClick={(e) => e.stopPropagation()} 
          />

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-4 hidden md:block"
            onClick={handleNext}
          >
            <ChevronRight size={40} />
          </button>
        </div>
      )}
    </div>
  );
};
