import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Loader2, Minus, Maximize2, ChevronRight, RotateCcw } from 'lucide-react';
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

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [chatStep, setChatStep] = useState(0); 
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Welcome to Evolet Glam Coastal. \n\nI am your concierge for luxury beach proposals in Virginia Beach, Norfolk, and Hampton. \n\nHow can I assist you in designing your perfect seaside moment today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

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
          systemInstruction: `You are Evolet Glam's Virtual Concierge specializing in luxury beach proposals in Virginia (Virginia Beach, Norfolk, Hampton). 
          The user is currently on step ${nextStep} of the design process.
          Steps: 0:Occasion, 1:Seaside Centerpiece, 2:Coastal Table Style, 3:Atlantic Ambiance Features, 4:Premium Add-ons, 5:Shoreline Location, 6:Summary.
          
          Tone: Sophisticated, warm, coastal-luxury.
          Current Selection context: ${selectedOccasion || 'Initial contact'}.
          
          Formatting Rules:
          - Use double line breaks to separate ideas into short, readable paragraphs.
          - Start with a brief, enthusiastic acknowledgment of their choice.
          - Add a single helpful tip about the coastal setting related to their choice.
          - End with a CLEAR question about the next choice on its own line.
          - Keep it airy and uncluttered. Do not use a wall of text.
          
          Behavior:
          - Provide expert advice for windproof beach setups.
          - Guide them to the NEXT step clearly.
          - If they are doing a Date Night, skip centerpieces. Anniversary and Proposals SHOULD have centerpieces.
          - Mention specific locations like Sandbridge or First Landing when relevant.
          
          Example Structure:
          That sounds wonderful! [Acknowledgment]
          
          [Helpful coastal tip or detail about the choice]
          
          Which [Next Step] are you leaning towards for your vision?`,
          temperature: 0.7,
        }
      });

      const modelText = response.text || "I apologize, the tide is coming in. How else can I help with your beach planning?";
      setMessages(prev => [...prev, { role: 'model', text: modelText }]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm experiencing high coastal demand. Please explore our gallery while I reconnect." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    setChatStep(0);
    setSelectedOccasion(null);
    setMessages([{ role: 'model', text: "Welcome back. \n\nHow can I assist you with your Virginia coastal celebration today?" }]);
  };

  const getContextualSuggestions = (): SuggestionSet | null => {
    if (isLoading) return null;
    
    switch (chatStep) {
      case 0:
        return { label: "Step 1: Occasion", options: OCCASIONS.map(o => o.title!) };
      case 1:
        return { label: "Step 2: Centerpiece", options: CENTERPIECES.map(c => c.title!) };
      case 2:
        return { label: "Step 3: Table Style", options: TABLE_STYLES.map(t => t.title!) };
      case 3:
        return { label: "Step 4: Ambiance", options: CUSTOM_FEATURES.map(f => f.label!) };
      case 4:
        return { label: "Step 5: Add-ons", options: ADD_ONS.map(a => a.label!) };
      case 5:
        return { label: "Step 6: Shoreline", options: LOCATIONS.map(l => l.label!) };
      default:
        return { label: "Next Steps", options: ["Book Beach Setup", "Coastal Gallery", "Start Over"] };
    }
  };

  const suggestions = getContextualSuggestions();

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)} 
        className="fixed bottom-28 right-6 w-14 h-14 sm:w-16 sm:h-16 bg-neutralDark text-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-[60] group border-4 border-white"
      >
        <MessageCircle size={24} className="sm:size-[28px]" />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-28 right-6 w-[420px] max-w-[90vw] bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] flex flex-col z-[60] overflow-hidden transition-all duration-300 border border-neutralLight ${isMinimized ? 'h-20' : 'h-[600px] max-h-[75vh]'}`}>
      <div className="bg-neutralDark p-4 flex items-center justify-between text-white shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <Sparkles size={18} className="text-primary" />
          </div>
          <div>
            <h3 className="font-serif text-lg leading-tight">Coastal Concierge</h3>
            <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold">Virginia Beach & Beyond</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={resetChat} className="p-2 hover:bg-white/10 rounded-lg transition-colors"><RotateCcw size={16} /></button>
          <button onClick={() => setIsMinimized(!isMinimized)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">{isMinimized ? <Maximize2 size={18} /> : <Minus size={18} />}</button>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors"><X size={18} /></button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div ref={scrollRef} className="flex-grow p-6 overflow-y-auto bg-neutralLight/20 space-y-6 scroll-smooth">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
                <div className={`max-w-[85%] px-5 py-3 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-wrap ${msg.role === 'user' ? 'bg-neutralDark text-white rounded-tr-none' : 'bg-white text-neutralDark border border-neutralLight rounded-tl-none'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && <div className="flex justify-start"><div className="bg-white px-5 py-3 rounded-2xl rounded-tl-none border border-neutralLight shadow-sm"><Loader2 className="h-5 w-5 text-primary animate-spin" /></div></div>}
          </div>

          {suggestions && !isLoading && (
            <div className="px-6 pb-5 bg-neutralLight/20 animate-fade-in border-t border-neutralLight/40">
              <div className="pt-4 mb-3 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutralDark/60">{suggestions.label}</span>
                <div className="h-px bg-neutralDark/10 flex-grow ml-4"></div>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {suggestions.options.map((option, i) => (
                  <button key={i} onClick={() => { if (option === "Start Over") resetChat(); else handleSendMessage(option); }} className="flex items-center gap-2 px-4 py-2 bg-white border border-primary/50 text-neutralDark text-[10px] sm:text-[11px] rounded-full hover:bg-primary/20 hover:border-primary transition-all shadow-sm font-semibold tracking-wide group">
                    {option}
                    <ChevronRight size={12} className="text-primary group-hover:translate-x-0.5 transition-transform" />
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="p-4 bg-white border-t border-neutralLight shrink-0">
            <div className="relative">
              <input type="text" placeholder="Message concierge..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} className="w-full pl-5 pr-14 py-4 bg-neutralLight rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-neutralDark text-sm placeholder:text-gray-400" />
              <button onClick={() => handleSendMessage()} disabled={!input.trim() || isLoading} className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-neutralDark text-white rounded-xl hover:bg-black transition-colors disabled:opacity-30">
                <Send size={18} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};