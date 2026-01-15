
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import DestinationCard from './components/DestinationCard';
import { Destination, SearchCriteria } from './types';
import { getSmartSuggestions, getTrendingDestinations } from './services/travel';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'destinations'>('home');
  const [suggestions, setSuggestions] = useState<Destination[]>([]);
  const [trending, setTrending] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTrendingLoading, setIsTrendingLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const fetchTrending = async () => {
      setIsTrendingLoading(true);
      try {
        const data = await getTrendingDestinations();
        setTrending(data);
      } catch (err) {
        console.error("Failed to fetch trending:", err);
      } finally {
        setIsTrendingLoading(false);
      }
    };
    fetchTrending();
  }, []);

  const handleSearch = async (criteria: SearchCriteria) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    setCurrentView('home');
    try {
      const data = await getSmartSuggestions(criteria);
      setSuggestions(data);
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      setError("We couldn't connect to our travel database. Please try again in a moment.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderHome = () => (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-slate-50"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h2 className="text-4xl md:text-7xl font-black text-white mb-4 drop-shadow-lg tracking-tight">
            The World is <span className="text-blue-400">Waiting.</span>
          </h2>
          <p className="text-lg md:text-xl text-white/90 font-medium mb-8 drop-shadow-md max-w-2xl mx-auto">
            Smart planning for modern explorers. Enter your vibe, we'll find the perfect match for your budget and the current weather.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <SearchForm onSearch={handleSearch} isLoading={isLoading} />

      {/* Content Section */}
      <main id="results-section" className="max-w-7xl mx-auto px-4 mt-16 md:mt-24">
        {error && (
          <div className="bg-red-50 border border-red-200 p-6 rounded-3xl text-center max-w-lg mx-auto mb-12">
            <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center text-red-600 mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </div>
            <p className="text-red-800 font-semibold">{error}</p>
          </div>
        )}

        {hasSearched && !isLoading && suggestions.length > 0 && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-2 block">Premium Recommendations</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Your Perfect Match</h2>
              </div>
              <div className="flex items-center gap-2 text-slate-500 bg-white px-4 py-2 rounded-2xl border border-slate-100 text-sm font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                Showing {suggestions.length} results
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {suggestions.map((dest) => (
                <DestinationCard key={dest.id} destination={dest} />
              ))}
            </div>
          </div>
        )}

        {!hasSearched && !isLoading && (
          <div className="text-center py-20 opacity-50">
            <div className="mb-6 flex justify-center">
               <div className="bg-blue-50 p-6 rounded-full">
                 <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M11.1 7.1a2 2 0 0 1 2.9 0"/><path d="M12.9 5.9a4 4 0 0 1 4.8 0"/><path d="M15.8 3.8a6 6 0 0 1 7.7 0"/><path d="M1.9 10.1a2 2 0 0 0-2.2 2.2c.1.6.4 1.2.9 1.6l.6.5a2 2 0 0 1 0 3.1l-.6.5a2 2 0 0 0-.9 1.6 2 2 0 0 0 2.2 2.2c.6-.1 1.2-.4 1.6-.9l.5-.6a2 2 0 0 1 3.1 0l.5.6c.4.5 1 .8 1.6.9a2 2 0 0 0 2.2-2.2 2 2 0 0 0-.9-1.6l-.6-.5a2 2 0 0 1 0-3.1l.6-.5c.5-.4.8-1 .9-1.6a2 2 0 0 0-2.2-2.2 2 2 0 0 0-1.6.9l-.5.6a2 2 0 0 1-3.1 0l-.5-.6a2 2 0 0 0-1.6-.9Z"/><path d="M15.3 14.8a3 3 0 1 0-4.2-4.2"/><path d="M13 12.6a1 1 0 1 1-1.4-1.4"/></svg>
               </div>
            </div>
            <p className="text-xl font-medium text-slate-800">Your next adventure is just a click away.</p>
            <p className="text-slate-500 max-w-sm mx-auto mt-2 italic">Adjust the sliders and select your vibe to see where you could be landing next week.</p>
          </div>
        )}
      </main>
    </>
  );

  const renderDestinations = () => (
    <main className="max-w-7xl mx-auto px-4 py-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-12">
        <h2 className="text-4xl font-extrabold text-slate-900 mb-2">Explore the World</h2>
        <p className="text-slate-500 text-lg">Curated trending destinations based on real-time data.</p>
      </div>

      {isTrendingLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <svg className="animate-spin h-10 w-10 text-blue-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          <span className="text-slate-500 font-medium">Fetching global trends...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trending.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      )}

      <div className="mt-20 text-center">
        <button 
          onClick={() => {
            setCurrentView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95"
        >
          Plan My Own Trip
        </button>
      </div>
    </main>
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Header onNavigate={setCurrentView} currentView={currentView} />
      
      {currentView === 'home' ? renderHome() : renderDestinations()}

      <footer className="mt-40 pt-20 pb-10 border-t border-slate-200 text-center">
        <div className="flex justify-center items-center gap-2 mb-4 opacity-70">
          <div className="bg-slate-800 p-1 rounded text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>
          </div>
          <span className="font-bold text-slate-800 uppercase tracking-widest text-sm">ColmanVoyage</span>
        </div>
        <p className="text-slate-500 text-sm">© 2026 ColmanVoyage Travel Co. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-6">
          <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
          <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default App;
