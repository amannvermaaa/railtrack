import React, { useState, useEffect, useRef } from 'react';
import { searchStations } from '../api/client';
import { MapPin } from 'lucide-react';

const StationAutocomplete = ({ label, placeholder, value, onChange, onSelect, hideLabel, className }) => {
  const [query, setQuery] = useState(value?.name || '');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    setQuery(value?.name || '');
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = async (e) => {
    const val = e.target.value;
    setQuery(val);
    onChange(null); // Clear selected object when typing
    
    if (val.trim().length >= 2) {
      try {
        const data = await searchStations(val);
        setResults(data);
        setIsOpen(true);
      } catch (error) {
        console.error("Error searching stations", error);
      }
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  const handleSelect = (station) => {
    setQuery(station.name);
    setIsOpen(false);
    onSelect(station);
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      {!hideLabel && label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {!hideLabel && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          type="text"
          className={className || `block w-full ${!hideLabel ? 'pl-10' : 'pl-3'} pr-3 py-3 border border-gray-300 rounded-lg focus:ring-[var(--color-rail-blue)] focus:border-[var(--color-rail-blue)] bg-gray-50 text-base`}
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onFocus={() => {
            if (results.length > 0) setIsOpen(true);
          }}
        />
      </div>

      {isOpen && results.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          {results.map((station) => (
            <li
              key={station.code}
              onClick={() => handleSelect(station)}
              className="text-gray-900 cursor-pointer select-none relative py-3 pl-3 pr-9 hover:bg-blue-50 border-b border-gray-50 last:border-0"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium block truncate">{station.name}</span>
                <span className="text-[var(--color-rail-blue)] font-bold ml-2 bg-blue-100 px-2 py-0.5 rounded text-xs">{station.code}</span>
              </div>
              <span className="text-gray-500 text-xs block mt-0.5">{station.city}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StationAutocomplete;
