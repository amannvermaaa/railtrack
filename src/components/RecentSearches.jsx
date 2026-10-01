import React, { useEffect, useState } from 'react';
import { Clock, ChevronRight } from 'lucide-react';

const RecentSearches = ({ onSelect }) => {
  const [searches, setSearches] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('railtrack_recent_trains');
      if (stored) {
        setSearches(JSON.parse(stored).slice(0, 3));
      }
    } catch (e) {
      console.error('Error loading recent searches', e);
    }
  }, []);

  if (searches.length === 0) return null;

  return (
    <div className="mt-6 pt-5 border-t border-gray-100">
      <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Recent Searches</h3>
      <div className="space-y-2">
        {searches.map((train, idx) => (
          <div 
            key={idx}
            onClick={() => onSelect(train)}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg active:bg-gray-100 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="font-medium text-gray-700">{train}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper to add to local storage
export const addRecentSearch = (trainNumber) => {
  try {
    const stored = localStorage.getItem('railtrack_recent_trains');
    let searches = stored ? JSON.parse(stored) : [];
    searches = searches.filter(t => t !== trainNumber);
    searches.unshift(trainNumber);
    localStorage.setItem('railtrack_recent_trains', JSON.stringify(searches.slice(0, 5)));
  } catch (e) {
    // Ignore storage errors
  }
};

export default RecentSearches;
