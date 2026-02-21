
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Loader2, ChevronRight, RotateCcw, Waves, HelpCircle, Check, MapPin } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { 
  OCCASIONS, 
  CENTERPIECES, 
  TABLE_STYLES, 
  CUSTOM_FEATURES, 
  ADD_ONS, 
  LOCATIONS 
} from '../constants';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface SuggestionSet {
  label: string;
  options: string[];
  multi?: boolean;
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose, onOpen }) => {
  // Steps: 
  // 0: Occasion
  // 1: Centerpiece
  // 2: Table
  // 3: Ambiance (Multi)
  // 4: Addons (Multi)
  // 5: Location
  // 6: Name
  // 7: Email
  // 8: Phone
  // 9: Date
  // 10: Notes
  // 11: Consent
  // 12: Done
  const [chatStep, setChatStep] = useState(0); 
  
  // State to hold gathered data
  const [conciergeData, setConciergeData] = useState({
    occasion: '',
    centerpiece: '',
    tableStyle: '',
    ambiance: [] as string[],
    addons: [] as string[],
    location: '',
    name: '',
    email: '',
    phone: '',
    date: '',
    notes: '',
    consent: false
  });

  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Welcome to Evolet Glam! ✨\n\nI am your private coastal concierge. My goal is to ensure your celebration is as effortless as the incoming tide. 🌊\n\nI'm so excited to help you plan! Which occasion are we curating for today? 🥂" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tempMultiSelect, setTempMultiSelect] = useState<string[]>([]); // For multi-select steps
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, isOpen, tempMultiSelect]);

  const generateAIResponse = async (userText: string, currentHistory: Message[], step: number) => {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const history = currentHistory.map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
        }));

        let systemInstruction = `You are Evolet Glam's Signature Concierge.
        Tone: Sophisticated yet very friendly, warm, and welcoming (✨, 🌊, 🐚).
        Short paragraphs.
        
        Current Planning Stage: ${step}`;
        
        // Context specific instructions to guide the next question
        if (step === 1) systemInstruction += ` The user just picked an occasion. Ask about Centerpieces (Rose Heart, Marquee Letters, etc).`;
        if (step === 2) systemInstruction += ` The user just picked a centerpiece. Ask about Table Styles (Boho, Classic, etc).`;
        if (step === 3) systemInstruction += ` The user just picked a table style. Ask about Ambiance/Custom Features. Tell them they can select multiple.`;
        if (step === 4) systemInstruction += ` The user just picked ambiance. Ask about Premium Add-ons (Photography, Music, etc). Tell them they can select multiple.`;
        if (step === 5) systemInstruction += ` The user just picked add-ons. Ask about their preferred Shoreline Location.`;
        if (step === 6) systemInstruction += ` The user just picked a location. Ask for their Full Name to start the formal quote.`;
        if (step === 7) systemInstruction += ` Ask for their Email Address.`;
        if (step === 8) systemInstruction += ` Ask for their Phone Number for text updates.`;
        if (step === 9) systemInstruction += ` Ask for their Preferred Date.`;
        if (step === 10) systemInstruction += ` Ask if they have any specific Notes or details (like boardwalk access, surprise timing, etc).`;
        if (step === 11) systemInstruction += ` Ask them to confirm they agree to our terms so we can submit the inquiry.`;
        if (step === 12) systemInstruction += ` Thank them enthusiastically! Tell them we will be in touch shortly.`;

        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: history,
            config: {
                systemInstruction,
                temperature: 0.7,
            }
        });
        return response.text || "I'm having trouble connecting to the shore! Please continue.";
    } catch (e) {
        return "That sounds wonderful! Let's continue designing. ✨";
    }
  };

  const advanceStep = async (userText: string, dataUpdate?: Partial<typeof conciergeData>) => {
    // 1. Update Data
    if (dataUpdate) {
        setConciergeData(prev => ({ ...prev, ...dataUpdate }));
    }

    // 2. Determine Next Step
    let nextStep = chatStep + 1;
    
    // Logic for skipping Centerpiece if Date Night
    if (chatStep === 0 && userText.toLowerCase().includes('date night')) {
        nextStep = 2; // Skip centerpiece (step 1)
    }

    setChatStep(nextStep);
    
    // 3. Update UI with User Message
    const newMessages = [...messages, { role: 'user' as const, text: userText }];
    setMessages(newMessages);
    setInput('');
    setTempMultiSelect([]);
    setIsLoading(true);

    // 4. Get AI Response
    const aiText = await generateAIResponse(userText, newMessages, nextStep);
    setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    setIsLoading(false);
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Process input based on step (Validation/Assignment)
    let update = {};
    if (chatStep === 6) update = { name: input };
    if (chatStep === 7) update = { email: input };
    if (chatStep === 8) update = { phone: input };
    if (chatStep === 9) update = { date: input };
    if (chatStep === 10) update = { notes: input };
    if (chatStep === 11) update = { consent: true };

    advanceStep(input, update);
  };

  const handleSelection = (value: string) => {
    // Single Select Logic
    let update = {};
    if (chatStep === 0) update = { occasion: value };
    if (chatStep === 1) update = { centerpiece: value };
    if (chatStep === 2) update = { tableStyle: value };
    if (chatStep === 5) update = { location: value };
    if (chatStep === 11 && value === "I Agree") update = { consent: true };

    advanceStep(value, update);
  };

  const handleMultiSelection = (value: string) => {
    // Toggle logic
    setTempMultiSelect(prev => {
        if (prev.includes(value)) return prev.filter(v => v !== value);
        return [...prev, value];
    });
  };

  const submitMultiSelection = () => {
    const joined = tempMultiSelect.join(", ") || "None";
    let update = {};
    if (chatStep === 3) update = { ambiance: tempMultiSelect };
    if (chatStep === 4) update = { addons: tempMultiSelect };
    
    advanceStep(joined, update);
  };

  const resetChat = () => {
    setChatStep(0);
    setConciergeData({
        occasion: '',
        centerpiece: '',
        tableStyle: '',
        ambiance: [],
        addons: [],
        location: '',
        name: '',
        email: '',
        phone: '',
        date: '',
        notes: '',
        consent: false
    });
    setMessages([{ role: 'model', text: "I'm so ready to dive back in! 🌊 Let's start your design journey again. \n\nWhat coastal occasion shall we plan today? 💍" }]);
  };

  const getContextualSuggestions = (): SuggestionSet | null => {
    if (isLoading) return null;
    
    switch (chatStep) {
      case 0: return { label: "Occasions", options: OCCASIONS.map(o => o.title!) };
      case 1: return { label: "Centerpieces", options: CENTERPIECES.map(c => c.title!) };
      case 2: return { label: "Table Styles", options: TABLE_STYLES.map(t => t.title!) };
      case 3: return { label: "Select Ambiance (Multi)", options: CUSTOM_FEATURES.map(f => f.label!), multi: true };
      case 4: return { label: "Select Add-ons (Multi)", options: ADD_ONS.map(a => a.label!), multi: true };
      case 5: return { label: "Locations", options: LOCATIONS.map(l => l.label!) };
      case 11: return { label: "Confirm", options: ["I Agree"] };
      case 12: return { label: "Service", options: ["Start Over"] };
      default: return null;
    }
  };

  const suggestions = getContextualSuggestions();

  return (
    <>
      {/* Editorial Vertical Side Tab Trigger */}
      <button 
        onClick={onOpen}
        className={`fixed top-1/2 right-0 -translate-y-1/2 z-[60] group transition-all duration-500 hover:pr-2 ${isOpen ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'}`}
        aria-label="Open Concierge"
      >
        <div className="bg-neutralDark text-white px-2 py-6 sm:py-8 rounded-l-xl shadow-2xl flex flex-col items-center gap-3 sm:gap-4 border-l border-y border-primary/20">
          <Sparkles size={16} className="text-primary group-hover:scale-110 transition-transform" />
          <span className="[writing-mode:vertical-lr] rotate-180 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.4em] mb-1 sm:mb-2">Concierge</span>
        </div>
      </button>

      {/* Side Drawer Interface */}
      <div className={`fixed inset-0 z-[100] transition-opacity duration-700 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {/* Soft Backdrop */}
        <div 
          className="absolute inset-0 bg-neutralDark/20 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Drawer Panel */}
        <div className={`absolute top-0 right-0 h-full w-full sm:w-[480px] bg-white shadow-[-40px_0_80px_rgba(0,0,0,0.15)] flex flex-col transition-transform duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          
          {/* Header */}
          <div className="bg-neutralDark px-6 py-8 sm:px-10 sm:py-12 text-white shrink-0 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5 rotate-12 pointer-events-none">
               <Waves size={160} />
            </div>
            
            <div className="relative z-10 flex justify-between items-start">
              <div className="flex items-center gap-4 sm:gap-5">
                <img 
                  src="https://drive.google.com/thumbnail?id=1u7VQG6fi-IcUqQ81Nat-byd4S1NzFZqa&sz=s800" 
                  alt="Evolet Glam" 
                  className="h-10 sm:h-16 w-auto object-contain brightness-0 invert"
                />
                <div className="space-y-0.5 sm:space-y-1">
                  <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.4em] text-primary font-bold">The Signature Experience</span>
                  <h3 className="font-serif text-xl sm:text-3xl tracking-wide">Concierge Service</h3>
                </div>
              </div>
              <button 
                onClick={onClose} 
                className="p-2 sm:p-3 -mr-2 hover:bg-white/10 rounded-full transition-all"
              >
                <X size={24} className="sm:w-[28px] sm:h-[28px]" strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Conversation Area */}
          <div 
            ref={scrollRef} 
            className="flex-grow p-4 sm:p-10 overflow-y-auto bg-neutralLight/5 space-y-6 sm:space-y-10 scroll-smooth no-scrollbar"
          >
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
                <div className={`max-w-[90%] sm:max-w-[85%] px-5 py-3 sm:px-7 sm:py-5 rounded-2xl text-[13px] sm:text-sm leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-neutralDark text-white rounded-tr-none font-medium' : 'bg-white text-neutralDark border border-neutralDark/5 rounded-tl-none font-light whitespace-pre-wrap'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white px-5 py-4 rounded-2xl rounded-tl-none border border-neutralDark/5 shadow-sm">
                  <Loader2 className="h-4 w-4 text-primary animate-spin" />
                </div>
              </div>
            )}
          </div>

          {/* Intelligence Section (Suggestions) */}
          {suggestions && !isLoading && (
            <div className="px-4 sm:px-10 pb-4 sm:pb-6 animate-fade-in">
              <div className="mb-3 sm:mb-4 flex items-center gap-4">
                <div className="h-px flex-grow bg-neutralDark/5" />
                <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-neutralDark/30">{suggestions.label}</span>
                <div className="h-px flex-grow bg-neutralDark/5" />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {suggestions.options.map((option, i) => {
                  const isSelected = tempMultiSelect.includes(option);
                  return (
                    <button 
                      key={i} 
                      onClick={() => { 
                         if (option === "Start Over") resetChat();
                         else if (suggestions.multi) handleMultiSelection(option); 
                         else handleSelection(option); 
                      }} 
                      className={`flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 border text-[10px] rounded-full transition-all font-semibold tracking-widest group
                        ${isSelected 
                          ? 'bg-neutralDark text-white border-neutralDark shadow-md' 
                          : 'bg-white border-neutralDark/10 text-neutralDark hover:border-primary hover:bg-primary/5'
                        }`}
                    >
                      {option}
                      {isSelected && <Check size={10} className="text-white" />}
                      {!suggestions.multi && <ChevronRight size={10} className="text-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0" />}
                    </button>
                  );
                })}
              </div>

              {suggestions.multi && (
                <button
                  onClick={submitMultiSelection}
                  className="mt-3 w-full bg-primary text-neutralDark py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#d6c5b8] transition-colors"
                >
                  Continue {tempMultiSelect.length > 0 ? `(${tempMultiSelect.length})` : '(Skip)'}
                </button>
              )}
            </div>
          )}

          {/* Formal Input */}
          <div className="p-4 sm:p-10 bg-white border-t border-neutralDark/5 shrink-0">
            <div className="relative">
              <input 
                type={chatStep === 9 ? "date" : chatStep === 7 ? "email" : chatStep === 8 ? "tel" : "text"}
                placeholder={
                    chatStep === 6 ? "Your Full Name" :
                    chatStep === 7 ? "Email Address" :
                    chatStep === 8 ? "Phone Number" :
                    chatStep === 9 ? "" :
                    chatStep === 10 ? "Any specific notes?" :
                    "Type your response..."
                } 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} 
                className="w-full pl-0 pr-12 py-3 sm:py-5 border-b border-neutralDark/10 focus:border-primary focus:outline-none text-neutralDark text-sm placeholder:text-neutralDark/30 bg-transparent transition-colors font-light"
              />
              <button 
                onClick={() => handleSendMessage()} 
                disabled={!input.trim() || isLoading} 
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-neutralDark hover:text-primary transition-colors disabled:opacity-20"
              >
                <Send size={20} sm:size={22} strokeWidth={1.5} />
              </button>
            </div>
            <div className="mt-4 sm:mt-6 flex justify-between items-center text-[8px] sm:text-[9px] text-neutralDark/20 uppercase tracking-[0.2em] font-bold">
              <div className="flex items-center gap-2">
                <HelpCircle size={10} />
                <span>Signature Concierge</span>
              </div>
              <button onClick={resetChat} className="hover:text-neutralDark transition-colors flex items-center gap-1.5 border-b border-transparent hover:border-neutralDark/20 pb-0.5">
                <RotateCcw size={10} /> Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
