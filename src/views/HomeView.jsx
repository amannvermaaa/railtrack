import React from 'react';
import TrainSearch from '../components/TrainSearch';
import StationSearch from '../components/StationSearch';

const HomeView = ({ onTrackTrain, onSearchStations }) => {
  return (
    <div className="relative min-h-[calc(100vh-73px)] w-full overflow-hidden bg-[var(--color-rail-navy)] text-white">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] opacity-90 z-0"></div>
      
      {/* Decorative Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[var(--color-rail-accent)] blur-[120px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--color-rail-emerald)] blur-[120px] opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="relative z-10 w-full py-12 px-4 flex flex-col items-center animate-fade-in">
        <div className="text-center mb-10 max-w-xl mx-auto animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight drop-shadow-lg">
            Track your journey with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Precision</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl font-light">
            Real-time updates, delays, and routes for all Indian Railways.
          </p>
        </div>

        <div className="w-full max-w-2xl space-y-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="hover-scale glass-panel rounded-3xl p-1 shadow-2xl">
            <TrainSearch onSearch={onTrackTrain} />
          </div>
          
          <div className="flex items-center justify-center relative opacity-80">
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent w-full max-w-xs"></div>
            </div>
            <span className="text-white/70 bg-[#162032] px-6 py-1 rounded-full text-xs font-bold uppercase tracking-widest relative z-10 border border-white/10 shadow-sm">
              Explore Routes
            </span>
          </div>

          <div className="hover-scale glass-panel rounded-3xl p-1 shadow-2xl">
            <StationSearch onSearch={onSearchStations} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
