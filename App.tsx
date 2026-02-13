
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
  // We use a key to force a re-mount of the Home component when the user clicks "Home" 
  // while already on the Home page. This resets the internal state (viewMode) to 'landing'.
  const [homeKey, setHomeKey] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  const handleNavigate = (page: Page) => {
    if (page === 'home' && activePage === 'home') {
      // Force reset if navigating to home while already there
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
      <Navbar activePage={activePage} onNavigate={handleNavigate} />
      <main className="flex-grow relative">
        {renderPage()}
      </main>
      <Chatbot />
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
