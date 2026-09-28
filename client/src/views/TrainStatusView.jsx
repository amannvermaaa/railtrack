import React, { useEffect, useState, useCallback } from 'react';
import { ArrowLeft, MapPin, RefreshCw, Navigation } from 'lucide-react';
import { getLiveTrainStatus } from '../api/client';
import LiveStatusBadge from '../components/LiveStatusBadge';
import TrainTimeline from '../components/TrainTimeline';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import { addRecentSearch } from '../components/RecentSearches';

const TrainStatusView = ({ trainNumber, date, onBack }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const fetchStatus = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError('');

    try {
      const response = await getLiveTrainStatus(trainNumber, date);
      setData(response);
      addRecentSearch(trainNumber);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to fetch status');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [trainNumber, date]);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  if (loading) return <div className="max-w-md mx-auto p-4 h-screen flex flex-col justify-center"><LoadingState message="Connecting to Railway Systems..." /></div>;
  if (error) return <div className="max-w-md mx-auto p-4 mt-20"><ErrorState message={error} onRetry={() => fetchStatus()} /></div>;
  if (!data) return null;

  return (
    <div className="max-w-md md:max-w-2xl mx-auto w-full pb-10 bg-[var(--color-rail-bg)] min-h-screen animate-fade-in">
      {/* Premium Glass Header */}
      <div className="glass-header text-white p-5 sticky top-0 z-40 shadow-2xl rounded-b-[2.5rem] mb-6">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--color-rail-accent)] opacity-20 rounded-full -translate-y-16 translate-x-8 blur-3xl animate-pulse"></div>
        <div className="absolute top-0 left-0 w-32 h-32 bg-[var(--color-rail-emerald)] opacity-10 rounded-full -translate-y-10 -translate-x-10 blur-2xl"></div>
        
        <div className="flex items-center gap-4 relative z-10">
          <button onClick={onBack} className="p-2.5 bg-white/5 hover:bg-white/15 rounded-2xl backdrop-blur-md transition-all active:scale-90 border border-white/10 shadow-sm">
            <ArrowLeft className="w-5 h-5 text-white/90" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1.5">
              <span className="text-[11px] font-black bg-white/10 border border-white/20 text-white px-3 py-1 rounded-lg tracking-widest shadow-sm">
                {data.trainNumber}
              </span>
              <LiveStatusBadge status={data.status} />
            </div>
            <h2 className="text-2xl font-black line-clamp-1 leading-tight tracking-tight drop-shadow-md">{data.trainName}</h2>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-4">
        {/* Current Location Banner */}
        <div className="bg-white rounded-3xl premium-shadow border border-gray-100 p-6 relative overflow-hidden">
          {/* Subtle map pattern background could go here */}
          
          <div className="flex items-start justify-between mb-3 relative z-10">
            <div className="flex items-center gap-2">
              <div className="bg-orange-50 p-2 rounded-xl">
                <Navigation className="w-5 h-5 text-[#E85C0D]" />
              </div>
              <h3 className="font-extrabold text-gray-400 text-[10px] uppercase tracking-widest">Current Location</h3>
            </div>
            <button 
              onClick={() => fetchStatus(true)}
              disabled={refreshing}
              className="p-2 bg-gray-50 text-gray-400 rounded-xl hover:bg-gray-100 hover:text-gray-600 active:scale-90 transition-all border border-gray-100"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-[var(--color-rail-blue)]' : ''}`} />
            </button>
          </div>

          <p className="text-2xl font-black text-gray-900 mb-4 tracking-tight drop-shadow-sm">{data.currentLocation?.stationName || "Unknown Location"}</p>
          
          <div className="flex items-center justify-between border-t border-gray-100/60 pt-4 relative z-10">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Last Updated</span>
              <span className="text-xs font-bold text-gray-700">
                {new Date(data.lastUpdated).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </span>
            </div>
            {data.delayMinutes > 0 ? (
              <div className="bg-red-50 px-3 py-1.5 rounded-lg border border-red-100 flex flex-col items-end">
                <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider mb-0.5">Delay</span>
                <span className="text-sm font-black text-red-600">+{data.delayMinutes} mins</span>
              </div>
            ) : (
              <div className="bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 flex flex-col items-end">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-0.5">Status</span>
                <span className="text-sm font-black text-emerald-600">On Time</span>
              </div>
            )}
          </div>
        </div>

        {/* Timeline Container */}
        <div className="bg-white rounded-3xl premium-shadow border border-gray-100 p-5">
          <TrainTimeline stations={data.stations} currentStationCode={data.currentLocation?.stationCode} />
        </div>
      </div>
    </div>
  );
};

export default TrainStatusView;
