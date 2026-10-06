import React, { useState } from 'react';
import { ArrowUpDown } from 'lucide-react';
import StationAutocomplete from './StationAutocomplete';

const StationSearch = ({ onSearch }) => {
  const [fromStation, setFromStation] = useState(null);
  const [toStation, setToStation] = useState(null);

  const handleSwap = () => {
    const temp = fromStation;
    setFromStation(toStation);
    setToStation(temp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fromStation && toStation) {
      onSearch(fromStation.code, toStation.code, fromStation.name, toStation.name);
    }
  };

  const isFormValid = fromStation && toStation && fromStation.code !== toStation.code;

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm w-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">Search by Station</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative flex flex-col gap-3">
          <div className="border border-gray-200 rounded focus-within:border-blue-500 transition-colors bg-white">
            <label className="block text-[11px] font-medium text-gray-500 pt-2 px-3">
              From
            </label>
            <div className="px-3 pb-2 pt-0">
              <StationAutocomplete 
                placeholder="Enter Station" 
                value={fromStation}
                onChange={setFromStation}
                onSelect={setFromStation}
                hideLabel={true}
                className="w-full text-gray-800 focus:outline-none bg-transparent"
              />
            </div>
          </div>
          
          <div className="border border-gray-200 rounded focus-within:border-blue-500 transition-colors bg-white">
            <label className="block text-[11px] font-medium text-gray-500 pt-2 px-3">
              To
            </label>
            <div className="px-3 pb-2 pt-0">
              <StationAutocomplete 
                placeholder="Enter Station" 
                value={toStation}
                onChange={setToStation}
                onSelect={setToStation}
                hideLabel={true}
                className="w-full text-gray-800 focus:outline-none bg-transparent"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleSwap}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-blue-100 rounded shadow-sm flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors z-10"
            aria-label="Swap stations"
          >
            <ArrowUpDown className="w-4 h-4 text-blue-500" />
          </button>
        </div>

        <button
          type="submit"
          disabled={!isFormValid}
          className="w-full py-3.5 px-4 rounded text-white font-medium bg-[#0B4C8C] hover:bg-[#093c6f] transition-colors focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
        >
          Check Trains
        </button>
      </form>
    </div>
  );
};

export default StationSearch;
