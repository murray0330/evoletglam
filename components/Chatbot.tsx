
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Loader2, ChevronRight, RotateCcw, Waves, HelpCircle } from 'lucide-react';
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
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose, onOpen }) => {
  const [chatStep, setChatStep] = useState(0); 
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Welcome to Evolet Glam.\n\nI am your private concierge. My goal is to ensure your coastal proposal is as effortless as the incoming tide.\n\nWhich occasion are we curating for today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, isOpen]);

  const handleSendMessage = async (textOverride?: string) => {
    const userMessage = (textOverride || input).trim();
    if (!userMessage || isLoading) return;

    let nextStep = chatStep + 1;

    if (chatStep === 0) {
      const isDateNight = userMessage.toLowerCase().includes("date night");
      setSelectedOccasion(userMessage);
      if (isDateNight) {
        nextStep = 2; 
      }
    }

    setChatStep(nextStep);
    setInput('');
    const newMessages = [...messages, { role: 'user' as const, text: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: newMessages.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        config: {
          systemInstruction: `You are Evolet Glam's Signature Concierge. You are sophisticated, worldly, and an expert in Coastal Virginia luxury.
          
          Tone: Understated luxury, expert, and warm. 
          Context: Specializing in Virginia Beach, Norfolk, and Hampton.
          
          Formatting Rules:
          - No emojis. 
          - Short, impactful sentences.
          - Double line breaks between paragraphs.
          - End with one clear, guiding question.
          
          Strategy:
          - Suggest "The Glow of First Landing" or "The Privacy of Sandbridge".
          - Mention windproof decor for oceanfront events.
          - Guide them through: Occasion -> Centerpiece -> Table -> Ambiance -> Add-ons.`,
          temperature: 0.7,
        }
      });

      const modelText = response.text || "Forgive me, the ocean breeze interrupted our connection. How shall we proceed?";
      setMessages(prev => [...prev, { role: 'model', text: modelText }]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I am currently attending to another guest. I will return shortly to assist with your shoreline design." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    setChatStep(0);
    setSelectedOccasion(null);
    setMessages([{ role: 'model', text: "I am ready to begin your design journey once more. What coastal occasion shall we plan?" }]);
  };

  const getContextualSuggestions = (): SuggestionSet | null => {
    if (isLoading) return null;
    
    switch (chatStep) {
      case 0: return { label: "Occasions", options: OCCASIONS.map(o => o.title!) };
      case 1: return { label: "Centerpieces", options: CENTERPIECES.map(c => c.title!) };
      case 2: return { label: "Table Styles", options: TABLE_STYLES.map(t => t.title!) };
      case 3: return { label: "Ambiance", options: CUSTOM_FEATURES.map(f => f.label!) };
      default: return { label: "Concierge Services", options: ["Book Beach Setup", "Gallery", "Start Over"] };
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
        <div className="bg-neutralDark text-white px-2 py-8 rounded-l-xl shadow-2xl flex flex-col items-center gap-4 border-l border-y border-primary/20">
          <Sparkles size={16} className="text-primary group-hover:scale-110 transition-transform" />
          <span className="[writing-mode:vertical-lr] rotate-180 text-[10px] font-bold uppercase tracking-[0.4em] mb-2">Concierge</span>
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
          
          {/* Header - Minimal & High End */}
          <div className="bg-neutralDark px-10 py-12 text-white shrink-0 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5 rotate-12 pointer-events-none">
               <Waves size={160} />
            </div>
            
            <div className="relative z-10 flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-[9px] uppercase tracking-[0.4em] text-primary font-bold">The Signature Experience</span>
                <h3 className="font-serif text-3xl tracking-wide">Concierge Service</h3>
              </div>
              <button 
                onClick={onClose} 
                className="p-3 -mr-2 hover:bg-white/10 rounded-full transition-all"
              >
                <X size={28} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Conversation Area */}
          <div 
            ref={scrollRef} 
            className="flex-grow p-10 overflow-y-auto bg-neutralLight/5 space-y-10 scroll-smooth no-scrollbar"
          >
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
                <div className={`max-w-[85%] px-7 py-5 rounded-2xl text-[13px] sm:text-sm leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-neutralDark text-white rounded-tr-none' : 'bg-white text-neutralDark border border-neutralDark/5 rounded-tl-none font-light italic'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white px-7 py-5 rounded-2xl rounded-tl-none border border-neutralDark/5 shadow-sm">
                  <Loader2 className="h-4 w-4 text-primary animate-spin" />
                </div>
              </div>
            )}
          </div>

          {/* Intelligence Section */}
          {suggestions && !isLoading && (
            <div className="px-10 pb-6 animate-fade-in">
              <div className="mb-4 flex items-center gap-4">
                <div className="h-px flex-grow bg-neutralDark/5" />
                <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-neutralDark/30">{suggestions.label}</span>
                <div className="h-px flex-grow bg-neutralDark/5" />
              </div>
              <div className="flex flex-wrap gap-2.5">
                {suggestions.options.map((option, i) => (
                  <button 
                    key={i} 
                    onClick={() => { if (option === "Start Over") resetChat(); else handleSendMessage(option); }} 
                    className="flex items-center gap-2 px-5 py-2.5 bg-white border border-neutralDark/10 text-neutralDark text-[10px] rounded-full hover:border-primary hover:bg-primary/5 transition-all font-semibold tracking-widest group"
                  >
                    {option}
                    <ChevronRight size={10} className="text-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Formal Input */}
          <div className="p-10 bg-white border-t border-neutralDark/5 shrink-0">
            <div className="relative">
              <input 
                type="text" 
                placeholder="What is your vision for the shore?" 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} 
                className="w-full pl-0 pr-12 py-5 border-b border-neutralDark/10 focus:border-primary focus:outline-none text-neutralDark text-sm placeholder:text-neutralDark/30 bg-transparent transition-colors font-light"
              />
              <button 
                onClick={() => handleSendMessage()} 
                disabled={!input.trim() || isLoading} 
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-neutralDark hover:text-primary transition-colors disabled:opacity-20"
              >
                <Send size={22} strokeWidth={1.5} />
              </button>
            </div>
            <div className="mt-6 flex justify-between items-center text-[9px] text-neutralDark/20 uppercase tracking-[0.2em] font-bold">
              <div className="flex items-center gap-2">
                <HelpCircle size={10} />
                <span>Signature Coastal Concierge</span>
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
