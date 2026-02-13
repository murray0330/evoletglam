import React, { useState, useEffect } from 'react';
import { Hero } from '../components/Hero';
import { Button } from '../components/ui/Button';
import { StickySummary } from '../components/StickySummary';
import { SelectionState, Item, Page } from '../types';
import { 
  OCCASIONS,
  CENTERPIECES, 
  TABLE_STYLES, 
  CUSTOM_FEATURES, 
  ADD_ONS, 
  LOCATIONS, 
  TESTIMONIALS 
} from '../constants';
import { Check, MapPin, Star, ChevronRight } from 'lucide-react';

// ----------------------------------------------------------------------
// COMPONENT: SELECTABLE CARD
// ----------------------------------------------------------------------

const SelectableCard: React.FC<{ 
  item: Item; 
  isSelected: boolean; 
  onSelect: () => void;
  type?: 'card' | 'location'
}> = ({ item, isSelected, onSelect, type = 'card' }) => {
  
  if (type === 'location') {
    return (
      <div 
        onClick={onSelect}
        className={`
          relative h-[400px] rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 group w-full
          ${isSelected ? 'ring-2 ring-offset-4 ring-offset-neutralLight ring-neutralDark shadow-2xl scale-[1.02]' : 'hover:shadow-xl hover:-translate-y-1'}
        `}
      >
        <img src={item.image} alt={item.label} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 ${isSelected ? 'opacity-90' : 'opacity-70'}`} />
        
        <div className="absolute bottom-0 left-0 p-8 w-full">
           <div className="flex items-end justify-between">
             <div className="text-white">
                <div className="flex items-center gap-2 text-primary mb-2">
                   <MapPin size={16} />
                   <span className="text-xs font-bold uppercase tracking-widest">Coastal Setting</span>
                </div>
                <h3 className="font-serif text-3xl mb-2">{item.label}</h3>
                <p className="text-white/90 text-sm font-light max-w-xs">{item.details}</p>
             </div>
             <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? 'bg-white border-white text-neutralDark' : 'border-white/50 text-transparent'}`}>
                <Check size={20} />
             </div>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={onSelect}
      className={`
        relative group overflow-hidden rounded-xl cursor-pointer transition-all duration-300 h-full flex flex-col bg-white
        ${isSelected 
          ? 'shadow-[0_20px_50px_rgba(0,0,0,0.15)] ring-2 ring-neutralDark translate-y-[-4px]' 
          : 'hover:shadow-xl hover:translate-y-[-2px] border border-neutralLight'}
      `}
    >
      <div className="aspect-[4/3] relative bg-gray-200 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title || item.label} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${isSelected ? 'opacity-20' : 'opacity-0 group-hover:opacity-10'}`} />
        
        {isSelected && (
          <div className="absolute inset-0 flex items-center justify-center backdrop-blur-[2px] animate-fade-in">
            <div className="bg-white/90 rounded-full p-3 shadow-lg">
              <Check className="text-neutralDark w-6 h-6" />
            </div>
          </div>
        )}
        
        {item.price > 0 && (
           <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold shadow-sm text-neutralDark tracking-wide">
             +${item.price}
           </div>
        )}
      </div>
      <div className="p-6 flex-grow flex flex-col text-center">
        <h3 className="font-serif text-xl font-medium text-neutralDark mb-2">{item.title || item.label}</h3>
        {(item.tagline || item.subtitle) && (
          <p className="text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-3">{item.tagline || item.subtitle}</p>
        )}
        <p className="text-gray-600 text-sm font-light leading-relaxed">{item.details || item.description}</p>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// BUILDER LAYOUT COMPONENTS
// ----------------------------------------------------------------------

const BuilderBackground: React.FC = () => (
  <div className="fixed inset-0 z-0 pointer-events-none animate-fade-in">
    <div 
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url('https://drive.google.com/thumbnail?id=1XO7NFVBfTLGcW3sjckB6rGvrKY2RW1Wv&sz=s800')` }} 
    />
    <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]"></div>
    <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent"></div>
  </div>
);

interface BuilderLayoutProps {
  step: number;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const BuilderLayout: React.FC<BuilderLayoutProps> = ({ step, title, subtitle, children }) => (
  <div className="max-w-6xl mx-auto px-6 relative z-10 animate-fade-in-up">
    <div className="text-center mb-16">
      <span className="inline-block px-4 py-1 bg-white/50 text-neutralDark text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-4 ring-1 ring-neutralDark/20 backdrop-blur-sm">
        Step {step}
      </span>
      <h2 className="font-serif text-4xl md:text-6xl text-neutralDark mb-6 drop-shadow-sm">{title}</h2>
      <p className="text-neutralDark/80 font-normal text-lg max-w-xl mx-auto leading-relaxed">{subtitle}</p>
    </div>
    {children}
  </div>
);

// ----------------------------------------------------------------------
// MAIN PAGE COMPONENT
// ----------------------------------------------------------------------

interface HomeProps {
  onNavigate: (page: Page) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [viewMode, setViewMode] = useState<'landing' | 'builder'>('landing');
  const [currentStep, setCurrentStep] = useState(0);

  const [selections, setSelections] = useState<SelectionState>({
    occasion: null,
    centerpiece: null,
    tableStyle: null,
    customFeatures: [],
    addOns: [],
    location: null
  });

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    notes: '',
    consent: false
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep, viewMode]);

  const handleStartBuilder = () => {
    setViewMode('builder');
    setCurrentStep(0);
  };

  const handleOccasionClick = (item: Item) => {
    setSelections({
      occasion: item,
      centerpiece: null,
      tableStyle: null,
      customFeatures: [],
      addOns: [],
      location: null
    });
    
    setViewMode('builder');
    // Anniversary and Proposal include centerpiece step (index 1)
    // Only Date Night skips directly to Table Style (index 2)
    if (item.id === 'date_night') {
      setCurrentStep(2); 
    } else {
      setCurrentStep(1);
    }
  };

  const handleNext = () => {
    const shouldSkipCenterpiece = selections.occasion?.id === 'date_night';

    if (currentStep === 0 && shouldSkipCenterpiece) {
      setCurrentStep(2);
    } else if (currentStep < 6) {
      setCurrentStep(curr => curr + 1);
    } else {
      alert("Thank you! Your coastal design has been submitted. We'll be in touch to confirm availability on the shoreline.");
      setViewMode('landing');
      setSelections({
        occasion: null,
        centerpiece: null,
        tableStyle: null,
        customFeatures: [],
        addOns: [],
        location: null
      });
      setFormState({
        name: '',
        email: '',
        phone: '',
        date: '',
        notes: '',
        consent: false
      });
      setCurrentStep(0);
    }
  };

  const handleBack = () => {
    const shouldSkipCenterpiece = selections.occasion?.id === 'date_night';

    if (currentStep === 2 && shouldSkipCenterpiece) {
      setCurrentStep(0);
    } else if (currentStep > 0) {
      setCurrentStep(curr => curr - 1);
    } else {
      setViewMode('landing');
    }
  };

  const handleFeatureToggle = (item: Item) => {
    const exists = selections.customFeatures.find(i => i.id === item.id);
    setSelections(prev => ({
      ...prev,
      customFeatures: exists 
        ? prev.customFeatures.filter(i => i.id !== item.id)
        : [...prev.customFeatures, item]
    }));
  };

  const handleAddOnToggle = (item: Item) => {
    const exists = selections.addOns.find(i => i.id === item.id);
    setSelections(prev => ({
      ...prev,
      addOns: exists 
        ? prev.addOns.filter(i => i.id !== item.id)
        : [...prev.addOns, item]
    }));
  };

  const canProceed = () => {
    if (currentStep === 0) return !!selections.occasion;
    if (currentStep === 1 && selections.occasion?.id !== 'date_night') return !!selections.centerpiece;
    if (currentStep === 5) return !!selections.location;
    if (currentStep === 6) return !!formState.name && !!formState.email && !!formState.phone && formState.consent;
    return true; 
  };

  if (viewMode === 'landing') {
    return (
      <div className="pb-0 bg-white">
        <Hero onStart={handleStartBuilder} />

        <div className="bg-primary py-10 border-b border-neutralDark/5">
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-20 text-[11px] md:text-xs font-bold tracking-[0.2em] uppercase text-neutralDark/75 text-center">
            <span>Turnkey Planning</span>
            <span>Concierge Service</span>
            <span>Signature Locations</span>
            <span>Detail Oriented</span>
          </div>
        </div>

        <section id="services" className="py-24 bg-neutralLight">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl text-neutralDark mb-6">Designed for the Shore</h2>
              <p className="text-gray-600 font-light text-lg">Specializing in luxury beach proposals across the Virginia coastline.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {OCCASIONS.map(occasion => (
                <div key={occasion.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col group">
                    <div className="h-64 overflow-hidden relative">
                       <img src={occasion.image} alt={occasion.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                       <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                       <div className="absolute bottom-4 left-4">
                          <span className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-neutralDark">
                            Coastal {occasion.title}
                          </span>
                       </div>
                    </div>
                    <div className="p-8 flex-grow flex flex-col text-center">
                       <h3 className="font-serif text-2xl text-neutralDark mb-3">{occasion.title}</h3>
                       <p className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-5">{occasion.tagline}</p>
                       <p className="text-gray-600 font-light leading-relaxed mb-8 flex-grow text-sm">
                          {occasion.details}
                       </p>
                       <Button onClick={() => handleOccasionClick(occasion)} className="w-full bg-primary text-neutralDark hover:bg-[#d6c5b8]">
                          Start Designing
                       </Button>
                    </div>
                 </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Star className="h-6 w-6 text-primary mx-auto mb-8" fill="currentColor" />
            <h2 className="font-serif text-3xl md:text-4xl mb-16 leading-snug text-neutralDark">
              "The most romantic evening <br/>
              <span className="text-stone-500 italic">on the Virginia shores.</span>"
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="flex flex-col items-center">
                  <p className="text-gray-700 font-light leading-relaxed mb-6 italic">"{t.quote}"</p>
                  <div className="h-px w-8 bg-primary mb-3"></div>
                  <p className="font-semibold text-xs uppercase tracking-widest text-neutralDark">{t.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-primary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[600px] rounded-sm overflow-hidden shadow-2xl">
               <img src="https://drive.google.com/thumbnail?id=1hLw1ouVo2PeHMC6kjh_HrK4NGSfnV8es&sz=s800" alt="Coastal Virginia Proposal" className="w-full h-full object-cover hover:scale-105 transition-all duration-1000" />
            </div>
            <div className="lg:pl-8">
              <span className="text-neutralDark/60 font-bold tracking-widest uppercase text-xs mb-4 block">Atlantic Romance</span>
              <h2 className="font-serif text-5xl text-neutralDark mb-8 leading-tight">Coastal Charm. <br/><span className="italic text-neutralDark/60">Unforgettable Design.</span></h2>
              <p className="text-neutralDark/80 font-normal leading-loose mb-6 text-lg">
                Now serving the beautiful coastlines of Virginia Beach, Norfolk, and Hampton. We bring luxury, editorial design to the sands you love.
              </p>
              <p className="text-neutralDark/80 font-normal leading-loose mb-10 text-lg">
                We handle the permits and logistics of seaside setups so you can focus on the sunrise or sunset that changes your life forever.
              </p>
              <Button variant="outline" onClick={() => onNavigate('about')} className="border-neutralDark text-neutralDark hover:bg-neutralDark hover:text-primary">Our Story</Button>
            </div>
          </div>
        </section>

        <section id="inquiry" className="py-24 bg-white text-center">
           <div className="max-w-2xl mx-auto px-4">
             <h2 className="font-serif text-4xl mb-6 text-neutralDark">Ready to ask?</h2>
             <p className="text-gray-600 mb-10 font-light">From First Landing to Sandbridge, let's design your coastal moment.</p>
             <Button onClick={handleStartBuilder} className="bg-primary text-neutralDark hover:bg-[#d6c5b8]">Start Designing</Button>
           </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-40 relative">
      <BuilderBackground />

      {currentStep === 0 && (
        <BuilderLayout key={0} step={1} title="A Coastal Celebration?" subtitle="Tell us your occasion so we can tailor the beach setting.">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {OCCASIONS.map(item => (
              <SelectableCard 
                key={item.id} 
                item={item} 
                isSelected={selections.occasion?.id === item.id}
                onSelect={() => setSelections(prev => ({...prev, occasion: item}))}
              />
            ))}
          </div>
        </BuilderLayout>
      )}

      {currentStep === 1 && (
        <BuilderLayout key={1} step={2} title="Seaside Centerpiece" subtitle="Statement pieces that stand bold against the horizon.">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CENTERPIECES.map(item => (
              <SelectableCard 
                key={item.id} 
                item={item} 
                isSelected={selections.centerpiece?.id === item.id}
                onSelect={() => setSelections(prev => ({...prev, centerpiece: item}))}
              />
            ))}
          </div>
        </BuilderLayout>
      )}

      {currentStep === 2 && (
        <BuilderLayout key={2} step={3} title="Coastal Table Style" subtitle="The perfect setting for a seaside toast.">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TABLE_STYLES.map(item => (
              <SelectableCard 
                key={item.id} 
                item={item} 
                isSelected={selections.tableStyle?.id === item.id}
                onSelect={() => setSelections(prev => ({...prev, tableStyle: item}))}
              />
            ))}
          </div>
        </BuilderLayout>
      )}

      {currentStep === 3 && (
        <BuilderLayout key={3} step={4} title="Atlantic Ambiance" subtitle="Add windproof touches and custom lighting for the beach.">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CUSTOM_FEATURES.map(item => (
              <SelectableCard 
                key={item.id} 
                item={item} 
                isSelected={!!selections.customFeatures.find(i => i.id === item.id)}
                onSelect={() => handleFeatureToggle(item)}
              />
            ))}
          </div>
        </BuilderLayout>
      )}

      {currentStep === 4 && (
        <BuilderLayout key={4} step={5} title="Premium Add-ons" subtitle="Elevate your beach day into an unforgettable event.">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ADD_ONS.map(item => (
              <SelectableCard 
                key={item.id} 
                item={item} 
                isSelected={!!selections.addOns.find(i => i.id === item.id)}
                onSelect={() => handleAddOnToggle(item)}
              />
            ))}
          </div>
        </BuilderLayout>
      )}

      {currentStep === 5 && (
        <BuilderLayout key={5} step={6} title="Select Your Shoreline" subtitle="Which coastal setting calls to you?">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {LOCATIONS.map(item => (
              <SelectableCard 
                key={item.id}
                type="location"
                item={item}
                isSelected={selections.location?.id === item.id}
                onSelect={() => setSelections(prev => ({...prev, location: item}))}
              />
            ))}
          </div>
        </BuilderLayout>
      )}

      {currentStep === 6 && (
        <BuilderLayout key={6} step={7} title="Finalize Your Vision" subtitle="Enter your details to receive a formal seaside quote.">
          <div className="max-w-3xl mx-auto bg-surface p-8 md:p-12 rounded-2xl shadow-2xl border border-white">
            <div className="mb-10 p-6 bg-neutralLight rounded-lg border border-neutralDark/10">
              <h4 className="font-serif text-xl mb-4 text-neutralDark">Design Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                 <div className="flex justify-between border-b border-gray-200 pb-2">
                   <span className="text-gray-600">Occasion</span>
                   <span className="font-medium text-neutralDark">{selections.occasion?.title}</span>
                 </div>
                 {selections.centerpiece && (
                   <div className="flex justify-between border-b border-gray-200 pb-2">
                     <span className="text-gray-600">Centerpiece</span>
                     <span className="font-medium text-neutralDark">{selections.centerpiece?.title}</span>
                   </div>
                 )}
                 <div className="flex justify-between border-b border-gray-200 pb-2">
                   <span className="text-gray-600">Table Style</span>
                   <span className="font-medium text-neutralDark">{selections.tableStyle?.title}</span>
                 </div>
                 <div className="flex justify-between border-b border-gray-200 pb-2">
                   <span className="text-gray-600">Location</span>
                   <span className="font-medium text-neutralDark">{selections.location?.label}</span>
                 </div>
              </div>
            </div>

            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Name</label>
                  <input type="text" className="w-full border-b border-gray-300 py-3 focus:border-primary focus:outline-none bg-transparent" placeholder="Jane Doe" value={formState.name} onChange={e => setFormState({...formState, name: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Email</label>
                  <input type="email" className="w-full border-b border-gray-300 py-3 focus:border-primary focus:outline-none bg-transparent" placeholder="jane@example.com" value={formState.email} onChange={e => setFormState({...formState, email: e.target.value})} />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Phone</label>
                  <input type="tel" className="w-full border-b border-gray-300 py-3 focus:border-primary focus:outline-none bg-transparent" placeholder="(757) 000-0000" value={formState.phone} onChange={e => setFormState({...formState, phone: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Preferred Date</label>
                  <input type="date" className="w-full border-b border-gray-300 py-3 focus:border-primary focus:outline-none bg-transparent" value={formState.date} onChange={e => setFormState({...formState, date: e.target.value})} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Beach Notes</label>
                <textarea rows={3} className="w-full border-b border-gray-300 py-3 focus:border-primary focus:outline-none bg-transparent resize-none" placeholder="Any specific boardwalk or dune preferences?" value={formState.notes} onChange={e => setFormState({...formState, notes: e.target.value})} />
              </div>

              <div className="flex items-start gap-3 pt-4">
                <input id="consent" type="checkbox" checked={formState.consent} onChange={e => setFormState({...formState, consent: e.target.checked})} className="h-4 w-4 mt-1" />
                <label htmlFor="consent" className="text-sm font-light text-gray-700">
                  I agree to receive text messages for updates and marketing. I have read the <span className="underline cursor-pointer font-medium" onClick={() => onNavigate('terms')}>Terms</span> & <span className="underline cursor-pointer font-medium" onClick={() => onNavigate('privacy')}>Privacy Policy</span>.
                </label>
              </div>
            </form>
          </div>
        </BuilderLayout>
      )}

      <StickySummary 
        selections={selections}
        currentStep={currentStep}
        totalSteps={7}
        onNext={handleNext}
        onBack={handleBack}
        canProceed={canProceed()}
      />
    </div>
  );
};
