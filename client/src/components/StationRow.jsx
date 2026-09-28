import React from 'react';

const StationRow = ({ station, isCurrent, isNext, isLast }) => {
  const isPast = station.hasDeparted || (station.hasArrived && !isCurrent);
  
  // Line color logic
  let lineClass = "border-l-2 border-dashed border-gray-200";
  if (isPast) lineClass = "border-l-2 border-solid border-[#1A4D2E]";
  else if (isCurrent) lineClass = "border-l-2 border-dashed border-[#FF9800]";

  // Dot logic
  let dotClass = "w-4 h-4 bg-gray-200 border-[3px] border-white shadow-sm";
  if (isCurrent) dotClass = "w-5 h-5 bg-[#FF9800] border-4 border-orange-100 z-10 shadow-md animate-pulse ring-4 ring-orange-50";
  else if (isNext) dotClass = "w-4 h-4 bg-white border-[3px] border-[#FF9800] z-10 shadow-sm";
  else if (isPast) dotClass = "w-4 h-4 bg-[#1A4D2E] border-[3px] border-white shadow-sm";

  return (
    <div className={`relative flex gap-5 ${isLast ? '' : 'pb-8'}`}>
      {/* Timeline line */}
      {!isLast && (
        <div className={`absolute left-2 top-6 bottom-[-1rem] ${lineClass} -translate-x-[1px]`}></div>
      )}

      {/* Timeline dot */}
      <div className="relative z-10 flex flex-col items-center mt-2 w-4">
        <div className={`rounded-full ${dotClass} transition-all duration-300`}></div>
      </div>

      {/* Station Details Card */}
      <div className={`flex-1 rounded-2xl p-4 transition-all duration-300 ${isCurrent ? 'bg-orange-50/50 border border-orange-100 shadow-sm' : 'bg-white border border-gray-100/50 premium-shadow'}`}>
        <div className="flex justify-between items-start mb-2">
          <div>
            <h4 className={`font-extrabold text-lg ${isCurrent ? 'text-[#E85C0D]' : 'text-gray-900'}`}>
              {station.stationName}
            </h4>
            <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest bg-gray-100 px-2 py-0.5 rounded-md mt-1 inline-block">
              {station.stationCode}
            </span>
          </div>
          {station.delayMinutes > 0 ? (
            <span className="text-xs font-black text-white bg-red-500 px-2.5 py-1 rounded-full shadow-sm shadow-red-500/20">
              +{station.delayMinutes}m
            </span>
          ) : (
            isPast && (
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
                On Time
              </span>
            )
          )}
        </div>

        <div className="flex items-center gap-6 mt-3 pt-3 border-t border-gray-100/60 text-sm">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Arrival</p>
            <p className={`font-black text-base ${station.delayMinutes > 0 && !isPast ? 'text-red-500' : 'text-gray-800'}`}>
              {station.actualArrival || station.scheduledArrival || '--:--'}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Departure</p>
            <p className={`font-black text-base ${station.delayMinutes > 0 && !isPast ? 'text-red-500' : 'text-gray-800'}`}>
              {station.actualDeparture || station.scheduledDeparture || '--:--'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationRow;
