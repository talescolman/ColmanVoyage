
import React, { useState } from 'react';
import { SearchCriteria, TravelVibe } from '../types';

interface SearchFormProps {
  onSearch: (criteria: SearchCriteria) => void;
  isLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading }) => {
  const [budget, setBudget] = useState<number>(2000);
  const [vibe, setVibe] = useState<string>(TravelVibe.TROPICAL);
  const [origin, setOrigin] = useState<string>('New York City');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ budget, vibe, origin });
  };

  return (
    <section className="max-w-4xl mx-auto -mt-16 md:-mt-20 relative z-10 px-4">
      <form 
        onSubmit={handleSubmit}
        className="glass p-6 md:p-8 rounded-3xl shadow-2xl grid grid-cols-1 md:grid-cols-3 gap-6 items-end"
      >
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Departure City</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            </span>
            <input 
              type="text" 
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="e.g. San Francisco"
              className="w-full bg-white/50 border border-slate-200 rounded-2xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-700 font-medium"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Max Budget: ${budget}</label>
          <input 
            type="range" 
            min="500" 
            max="10000" 
            step="100"
            value={budget}
            onChange={(e) => setBudget(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-bold px-1">
            <span>$500</span>
            <span>$10,000</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Desired Vibe</label>
          <select 
            value={vibe}
            onChange={(e) => setVibe(e.target.value)}
            className="w-full bg-white/50 border border-slate-200 rounded-2xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-700 font-medium appearance-none"
          >
            {Object.values(TravelVibe).map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>

        <div className="md:col-span-3">
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group active:scale-[0.98]"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                <span>Curating Destinations...</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="m9 18 6-6-6-6"/></svg>
                <span>Find My Vibe</span>
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
