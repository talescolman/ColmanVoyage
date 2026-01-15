
import React from 'react';
import { Destination } from '../types';

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  return (
    <div className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 flex flex-col h-full">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={destination.imageUrl} 
          alt={destination.city} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl flex items-center gap-1.5 shadow-sm">
          <span className="text-yellow-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
          </span>
          <span className="text-xs font-bold text-slate-800">Top Rated</span>
        </div>
        <div className="absolute bottom-4 left-4 flex gap-2">
          <div className="bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
            {destination.vibe}
          </div>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-2xl font-bold text-slate-800 leading-tight">{destination.city}</h3>
            <p className="text-slate-500 font-medium">{destination.country}</p>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-slate-400 uppercase">Est. Trip Cost</div>
            <div className="text-xl font-extrabold text-blue-600">${destination.priceEstimate}</div>
          </div>
        </div>

        <div className="flex items-center gap-4 my-4 p-3 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-400 uppercase leading-none">Temp</span>
              <span className="text-sm font-extrabold text-slate-700">{Math.round(destination.weather.temp)}°C</span>
            </div>
          </div>
          <div className="w-px h-8 bg-slate-200"></div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-400 uppercase leading-none">Condition</span>
            <span className="text-xs font-semibold text-slate-600 truncate italic">
              {destination.weather.condition}
            </span>
          </div>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
          {destination.description}
        </p>

        <div className="mt-auto space-y-4">
          <div className="flex flex-wrap gap-1.5">
            {destination.topAttractions.slice(0, 3).map((attr, i) => (
              <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded-md font-semibold border border-slate-200">
                {attr}
              </span>
            ))}
          </div>
          
          <button className="w-full py-3 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-blue-600 transition-colors shadow-lg active:scale-95">
            View Journey Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
