import React, { useEffect, useState, useCallback } from 'react';
import { ArrowLeft, TrainTrack } from 'lucide-react';
import { getTrainsBetweenStations } from '../api/client';
import TrainCard from '../components/TrainCard';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

const StationResultsView = ({ fromCode, toCode, fromName, toName, onTrackTrain, onBack }) => {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTrains = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getTrainsBetweenStations(fromCode, toCode);
      setTrains(response);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to fetch trains');
    } finally {
      setLoading(false);
    }
  }, [fromCode, toCode]);

  useEffect(() => {
    fetchTrains();
  }, [fetchTrains]);

  return (
    <div className="max-w-md md:max-w-2xl mx-auto w-full pb-10 bg-[var(--color-rail-bg)] min-h-screen animate-fade-in">
      {/* Premium Glass Header */}
      <div className="glass-header text-white p-5 sticky top-0 z-40 shadow-2xl overflow-hidden rounded-b-[2.5rem] mb-6">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--color-rail-accent)] opacity-20 rounded-full -translate-y-16 translate-x-8 blur-3xl animate-pulse"></div>
        <div className="absolute top-0 left-0 w-32 h-32 bg-[var(--color-rail-emerald)] opacity-10 rounded-full -translate-y-10 -translate-x-10 blur-2xl"></div>
        
        <div className="flex items-center gap-4 relative z-10">
          <button onClick={onBack} className="p-2.5 bg-white/5 hover:bg-white/15 rounded-2xl backdrop-blur-md transition-all active:scale-90 border border-white/10 shadow-sm">
            <ArrowLeft className="w-5 h-5 text-white/90" />
          </button>
          <div>
            <h2 className="text-2xl font-black line-clamp-1 leading-tight tracking-tight drop-shadow-md flex items-center gap-2">
              {fromCode} <TrainTrack className="w-5 h-5 text-[var(--color-rail-amber)] opacity-90" /> {toCode}
            </h2>
            <p className="text-[11px] text-emerald-200/90 font-bold uppercase tracking-widest mt-1">
              {fromName} to {toName} • {trains.length} Trains
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-4 mt-4">
        {loading && <div className="h-[60vh] flex flex-col justify-center"><LoadingState message={`Finding trains from ${fromName} to ${toName}...`} /></div>}
        
        {error && !loading && <div className="mt-10"><ErrorState message={error} onRetry={fetchTrains} /></div>}
        
        {!loading && !error && trains.length === 0 && (
          <div className="text-center p-8 bg-white rounded-3xl premium-shadow border border-gray-100 mt-10">
            <h3 className="text-xl font-extrabold text-gray-800 mb-2">No Trains Found</h3>
            <p className="text-gray-500 font-sans-alt">We couldn't find any direct trains running between these stations today.</p>
          </div>
        )}

        {!loading && !error && trains.map((train, idx) => (
          <TrainCard key={idx} train={train} onTrack={onTrackTrain} />
        ))}
      </div>
    </div>
  );
};

export default StationResultsView;
