
import React from 'react';

interface HeaderProps {
  onNavigate: (view: 'home' | 'destinations') => void;
  currentView: 'home' | 'destinations';
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentView }) => {
  return (
    <header className="py-6 px-4 md:px-8 flex items-center justify-between glass sticky top-0 z-50">
      <div 
        className="flex items-center gap-2 cursor-pointer group"
        onClick={() => onNavigate('home')}
      >
        <div className="bg-blue-600 p-2 rounded-xl text-white group-hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>
        </div>
        <h1 className="text-xl md:text-2xl font-extrabold text-slate-800 tracking-tight">
          Colman<span className="text-blue-600">Voyage</span>
        </h1>
      </div>
      <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
        <button 
          onClick={() => onNavigate('destinations')}
          className={`hover:text-blue-600 transition-colors ${currentView === 'destinations' ? 'text-blue-600 font-bold' : ''}`}
        >
          Destinations
        </button>
        <button className="hover:text-blue-600 transition-colors opacity-50 cursor-not-allowed">My Trips</button>
        <button className="hover:text-blue-600 transition-colors opacity-50 cursor-not-allowed">Support</button>
      </nav>
      <button className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-slate-800 transition-all shadow-md active:scale-95">
        Sign In
      </button>
    </header>
  );
};

export default Header;
