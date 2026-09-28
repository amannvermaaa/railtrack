import React, { useState } from 'react';

const TrainSearch = ({ onSearch }) => {
  const [trainNumber, setTrainNumber] = useState('');
  
  // Helper to format date to YYYYMMDD
  const formatDateForApi = (dateString) => {
    return dateString.replace(/-/g, ''); // "2026-09-11" -> "20260911"
  };

  // Get today's date in YYYY-MM-DD for the input default
  const getTodayString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [departureDate, setDepartureDate] = useState(getTodayString());

  const handleSubmit = (e) => {
    e.preventDefault();
    if (trainNumber.trim().length >= 4) {
      const formattedDate = formatDateForApi(departureDate);
      onSearch(trainNumber.trim(), formattedDate);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm w-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">Search by Train</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="border border-gray-200 rounded focus-within:border-blue-500 transition-colors">
          <label htmlFor="trainNumber" className="block text-[11px] font-medium text-gray-500 pt-2 px-3">
            Train Number/Name
          </label>
          <input
            type="text"
            id="trainNumber"
            className="w-full px-3 pb-2 pt-0 text-gray-800 focus:outline-none bg-transparent"
            placeholder="Select Train No."
            value={trainNumber}
            onChange={(e) => setTrainNumber(e.target.value.replace(/\D/g, '').slice(0, 5))}
          />
        </div>

        <div className="border border-gray-200 rounded focus-within:border-blue-500 transition-colors">
          <label htmlFor="departureDate" className="block text-[11px] font-medium text-gray-500 pt-2 px-3">
            Departure Date
          </label>
          <input
            type="date"
            id="departureDate"
            className="w-full px-3 pb-2 pt-0 text-gray-800 focus:outline-none bg-transparent"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={trainNumber.length < 4 || !departureDate}
          className="w-full py-3.5 px-4 rounded text-white font-medium bg-[#0B4C8C] hover:bg-[#093c6f] transition-colors focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
        >
          Check Status
        </button>
      </form>
    </div>
  );
};

export default TrainSearch;
