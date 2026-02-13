
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Gallery } from './pages/Gallery';
import { FAQ } from './pages/FAQ';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';
import { About } from './pages/About';
import { Chatbot } from './components/Chatbot';
import { Page } from './types';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('home');
  const [homeKey, setHomeKey] = useState(0);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  const handleNavigate = (page: Page) => {
    if (page === 'home' && activePage === 'home') {
      setHomeKey(prev => prev + 1);
    }
    setActivePage(page);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home key={homeKey} onNavigate={handleNavigate} />;
      case 'gallery':
        return <Gallery />;
      case 'about':
        return <About onNavigate={handleNavigate} />;
      case 'faq':
        return <FAQ />;
      case 'terms':
        return <Terms />;
      case 'privacy':
        return <Privacy />;
      default:
        return <Home key={homeKey} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased">
      <Navbar 
        activePage={activePage} 
        onNavigate={handleNavigate} 
      />
      <main className="flex-grow relative">
        {renderPage()}
      </main>
      <Chatbot 
        isOpen={isConciergeOpen} 
        onClose={() => setIsConciergeOpen(false)} 
        onOpen={() => setIsConciergeOpen(true)}
      />
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
