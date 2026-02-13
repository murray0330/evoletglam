import React, { useEffect, useState } from 'react';
import { SelectionState } from '../types';
import { Button } from './ui/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface StickySummaryProps {
  selections: SelectionState;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  canProceed: boolean;
}

export const StickySummary: React.FC<StickySummaryProps> = ({ 
  selections, 
  currentStep, 
  totalSteps, 
  onNext, 
  onBack,
  canProceed
}) => {
  // Calculate Total
  const baseTotal = (selections.centerpiece?.price || 0) + (selections.tableStyle?.price || 0);
  const featuresTotal = selections.customFeatures.reduce((acc, curr) => acc + curr.price, 0);
  const addonsTotal = selections.addOns.reduce((acc, curr) => acc + curr.price, 0);
  const grandTotal = baseTotal + featuresTotal + addonsTotal;

  // Animated Price State
  const [displayTotal, setDisplayTotal] = useState(0);

  useEffect(() => {
    let start = displayTotal;
    const end = grandTotal;
    if (start === end) return;

    const duration = 500; // ms
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out quart
      const ease = 1 - Math.pow(1 - progress, 4);
      
      const nextValue = Math.floor(start + (end - start) * ease);
      setDisplayTotal(nextValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayTotal(end);
      }
    };

    requestAnimationFrame(animate);
  }, [grandTotal]);

  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-[0_-4px_30px_rgba(0,0,0,0.08)] z-50 transition-transform duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        
        {/* Left: Total & Summary (Desktop) */}
        <div className="flex items-center gap-8">
          <div>
             <span className="block text-[10px] uppercase tracking-widest text-gray-500 mb-0.5">Estimated Total</span>
             <span className="font-serif text-2xl text-neutralDark font-semibold transition-all duration-200">
               ${displayTotal.toLocaleString()}
             </span>
          </div>

          <div className="hidden lg:flex items-center gap-6 text-gray-500 text-sm border-l border-gray-200 pl-6 h-10">
             <div className="flex flex-col justify-center">
                <span className="text-[9px] uppercase tracking-widest text-gray-400">Centerpiece</span>
                <span className="font-medium truncate max-w-[100px] text-neutralDark">{selections.centerpiece?.title || "—"}</span>
             </div>
             <div className="flex flex-col justify-center">
                <span className="text-[9px] uppercase tracking-widest text-gray-400">Table</span>
                <span className="font-medium truncate max-w-[100px] text-neutralDark">{selections.tableStyle?.title || "—"}</span>
             </div>
              <div className="flex flex-col justify-center">
                <span className="text-[9px] uppercase tracking-widest text-gray-400">Location</span>
                <span className="font-medium truncate max-w-[100px] text-neutralDark">{selections.location?.label || "—"}</span>
             </div>
          </div>
        </div>

        {/* Right: Navigation */}
        <div className="flex items-center gap-3">
          {currentStep > 0 && (
            <Button 
              variant="text" 
              onClick={onBack} 
              className="text-gray-500 hover:text-neutralDark font-normal text-sm hidden sm:flex items-center gap-1"
            >
              <ChevronLeft size={16} /> Back
            </Button>
          )}
          
          <div className="text-xs text-gray-400 font-medium uppercase tracking-widest mr-4 hidden md:block">
            Step {currentStep + 1} of {totalSteps}
          </div>

          <Button 
            onClick={onNext} 
            disabled={!canProceed}
            className={`${isLastStep ? 'bg-neutralDark' : 'bg-primary'} px-8 min-w-[140px]`}
          >
            {isLastStep ? 'Submit Inquiry' : (
              <span className="flex items-center gap-2">
                Next <ChevronRight size={16} />
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};