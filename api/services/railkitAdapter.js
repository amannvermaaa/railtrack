import { configure, trackTrain, searchTrainBetweenStations } from 'railkit';
import { config } from '../config.js';

let isConfigured = false;

const initRailkit = () => {
  if (!isConfigured && config.railway.apiKey) {
    configure(String(config.railway.apiKey).trim());
    isConfigured = true;
  }
};

const railkitAdapter = {
  async getLiveStatus(trainNumber) {
    initRailkit();
    const result = await trackTrain(trainNumber);
    if (!result.success) {
      throw new Error(result.error || "Failed to fetch live status");
    }
    
    const data = result.data;
    return {
      trainNumber: data.trainNo || trainNumber,
      trainName: data.trainName || "Live Train",
      status: data.status || "running",
      currentLocation: {
        stationName: data.currentStationName || "Unknown",
        stationCode: data.currentStationCode || "UNK"
      },
      lastUpdated: new Date().toISOString(),
      delayMinutes: data.delayInMinutes || 0,
      stations: data.stations || []
    };
  },

  async getTrainsBetweenStations(fromStation, toStation, date) {
    initRailkit();
    const result = await searchTrainBetweenStations(fromStation, toStation, date);
    if (!result.success) {
      throw new Error(result.error || "Failed to fetch trains");
    }
    
    const data = result.data || result.trains || [];
    return data.map(train => ({
      trainNumber: train.trainNo || train.trainNumber,
      trainName: train.trainName,
      fromStation: fromStation,
      toStation: toStation,
      departureTime: train.departureTime || train.depTime,
      arrivalTime: train.arrivalTime || train.arrTime,
      duration: train.duration || train.travelTime,
      runningDays: train.runningDays || [],
      classes: train.classes || []
    }));
  }
};

export default railkitAdapter;
