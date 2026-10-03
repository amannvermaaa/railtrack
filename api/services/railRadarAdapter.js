import axios from 'axios';
import { config } from '../config.js';

/**
 * Adapter for RailRadar REST API (api.railradar.in/v1)
 */
class RailRadarAdapter {
  getHeaders() {
    return {
      'Authorization': `Bearer ${config.railway.apiKey}`
    };
  }

  async getLiveStatus(trainNumber) {
    const url = `${config.railway.apiUrl}/trains/${trainNumber}/live`;
    try {
      // Get live status
      const response = await axios.get(url, {
        headers: this.getHeaders()
      });

      const trainData = response.data?.data;
      if (!trainData) throw new Error("Train not found");

      const stations = (trainData.route || []).map(st => ({
        stationName: st.stationName,
        stationCode: st.stationCode,
        scheduledArrival: st.scheduledArrival,
        actualArrival: st.actualArrival || st.scheduledArrival,
        scheduledDeparture: st.scheduledDeparture,
        actualDeparture: st.actualDeparture || st.scheduledDeparture,
        delayMinutes: st.delayDeparture || st.delayArrival || 0,
        hasArrived: st.status === 'arrived' || st.status === 'departed',
        hasDeparted: st.status === 'departed',
      }));

      return {
        trainNumber: trainData.trainNumber || trainNumber,
        trainName: trainData.trainName || "Unknown Train",
        status: trainData.delayMinutes > 0 ? "DELAYED" : "ON TIME",
        delayMinutes: trainData.delayMinutes || 0,
        lastUpdated: trainData.lastUpdatedAt || new Date().toISOString(),
        currentLocation: {
          stationName: trainData.currentLocation?.stationName || "Unknown",
          stationCode: trainData.currentLocation?.stationCode || "",
          message: `Currently near ${trainData.currentLocation?.stationName}`
        },
        stations: stations
      };
    } catch (error) {
      if (error.response?.status === 404) throw new Error("Train number not found.");
      throw error;
    }
  }

  async getTrainsBetweenStations(fromStation, toStation, date) {
    const url = `${config.railway.apiUrl}/trains/between/${fromStation}/${toStation}`;
    try {
      const response = await axios.get(url, { headers: this.getHeaders() });
      const trainsList = response.data?.data?.trains || [];
      
      return trainsList.map(t => {
        const hours = Math.floor(t.duration / 60);
        const mins = t.duration % 60;
        return {
          trainNumber: t.train?.number,
          trainName: t.train?.name,
          from: t.from?.name || fromStation,
          to: t.to?.name || toStation,
          departureTime: t.from?.departure,
          arrivalTime: t.to?.arrival,
          duration: `${hours}h ${mins}m`,
          runningDays: t.train?.runDays?.join(', ') || "Daily"
        };
      });
    } catch (error) {
      throw error;
    }
  }
}

export default new RailRadarAdapter();
