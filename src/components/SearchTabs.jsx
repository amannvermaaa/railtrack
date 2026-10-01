import React from 'react';
import { TrainTrack, MapPin } from 'lucide-react';

const SearchTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex p-1.5 bg-gray-200/50 rounded-2xl mb-6 shadow-inner mx-2">
      <button
        onClick={() => setActiveTab('train')}
        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-300 ${
          activeTab === 'train'
            ? 'bg-white text-[var(--color-rail-navy)] shadow-sm scale-100'
            : 'text-gray-500 hover:text-gray-700 scale-95'
        }`}
      >
        <TrainTrack className={`w-4 h-4 ${activeTab === 'train' ? 'text-[#E85C0D]' : ''}`} />
        By Train No.
      </button>
      <button
        onClick={() => setActiveTab('station')}
        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-300 ${
          activeTab === 'station'
            ? 'bg-white text-[var(--color-rail-navy)] shadow-sm scale-100'
            : 'text-gray-500 hover:text-gray-700 scale-95'
        }`}
      >
        <MapPin className={`w-4 h-4 ${activeTab === 'station' ? 'text-[#E85C0D]' : ''}`} />
        By Station
      </button>
    </div>
  );
};

export default SearchTabs;
