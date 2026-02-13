import React, { useState } from 'react';
import { FAQS } from '../constants';
import { Plus, Minus } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-neutralLight pb-20">
      <div className="bg-white py-20 border-b border-gray-200 mb-12">
         <div className="max-w-7xl mx-auto px-4 text-center">
           <h1 className="font-serif text-5xl text-neutralDark mb-4">Common Questions</h1>
           <p className="text-gray-600 font-medium">Everything you need to know about planning your proposal.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4">
        <div className="space-y-4">
          {FAQS.map((item, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transition-all duration-300"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className="font-serif text-lg text-neutralDark font-medium">{item.q}</span>
                <span className="text-primary ml-4">
                  {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 pt-0 text-gray-700 leading-relaxed border-t border-gray-50">
                  {item.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};