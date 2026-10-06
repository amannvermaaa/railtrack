import React from 'react';
import StationRow from './StationRow';

const TrainTimeline = ({ stations, currentStationCode }) => {
  if (!stations || stations.length === 0) return null;

  // Find index of current station to determine 'next'
  let currentIndex = stations.findIndex(s => s.stationCode === currentStationCode);
  if (currentIndex === -1 && stations.length > 0) {
    // Fallback: find first station that hasn't departed
    currentIndex = stations.findIndex(s => !s.hasDeparted);
    if (currentIndex === -1) currentIndex = stations.length - 1; // All done
  }

  return (
    <div className="mt-6 px-2">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Route Schedule</h3>
      <div className="relative">
        {stations.map((station, index) => (
          <StationRow
            key={index}
            station={station}
            isCurrent={index === currentIndex}
            isNext={index === currentIndex + 1}
            isLast={index === stations.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default TrainTimeline;
