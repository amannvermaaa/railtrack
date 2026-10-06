import React from 'react';
import { ArrowRight, Clock, CalendarDays, Zap } from 'lucide-react';

const TrainCard = ({ train, onTrack }) => {
  return (
    <div className="hover-scale glass-panel p-5 rounded-3xl premium-shadow relative overflow-hidden group">
      {/* Decorative gradient blob */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-rail-accent)] opacity-5 rounded-full -translate-y-16 translate-x-12 blur-2xl group-hover:opacity-20 transition-opacity duration-500"></div>

      <div className="flex justify-between items-start mb-5 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-sm font-black text-[var(--color-rail-blue)] bg-blue-50/50 border border-blue-100 px-3 py-1 rounded-lg tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[var(--color-rail-amber)]" fill="currentColor" />
              {train.trainNumber}
            </span>
          </div>
          <h3 className="font-extrabold text-gray-900 text-lg leading-tight line-clamp-1">{train.trainName}</h3>
        </div>
      </div>

      <div className="flex items-center justify-between mb-5 relative z-10 bg-gray-50/50 p-4 rounded-2xl border border-gray-100/50">
        <div className="text-center w-[35%]">
          <p className="text-3xl font-black text-gray-800 tracking-tight">{train.departureTime || '--:--'}</p>
          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider truncate mt-1">{train.from}</p>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center px-2">
          <div className="flex items-center gap-1 text-xs font-bold text-gray-400 bg-white px-2 py-0.5 rounded-full border border-gray-100 shadow-sm z-10">
            <Clock className="w-3 h-3" />
            {train.duration}
          </div>
          <div className="w-full h-[2px] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 relative flex items-center justify-center -mt-2">
            <div className="absolute right-0 w-1.5 h-1.5 rounded-full bg-gray-300"></div>
            <div className="absolute left-0 w-1.5 h-1.5 rounded-full bg-gray-300"></div>
          </div>
        </div>
        
        <div className="text-center w-[35%]">
          <p className="text-3xl font-black text-gray-800 tracking-tight">{train.arrivalTime || '--:--'}</p>
          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider truncate mt-1">{train.to}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100 relative z-10">
        <div className="flex items-center gap-2 text-xs text-gray-500 font-sans-alt font-medium">
          <div className="bg-gray-100 p-1.5 rounded-md">
            <CalendarDays className="w-4 h-4 text-gray-500" />
          </div>
          <span className="tracking-wide uppercase text-[10px] font-bold">{train.runningDays}</span>
        </div>
        <button
          onClick={() => onTrack(train.trainNumber)}
          className="text-sm font-bold text-white bg-gradient-to-r from-[var(--color-rail-navy)] to-[var(--color-rail-accent)] hover:from-[var(--color-rail-accent)] hover:to-[var(--color-rail-navy)] px-5 py-2.5 rounded-xl shadow-lg shadow-blue-900/20 transition-all active:scale-95"
        >
          Track Now
        </button>
      </div>
    </div>
  );
};

export default TrainCard;
