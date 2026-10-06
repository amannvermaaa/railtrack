import axios from 'axios';
import { config } from '../config.js';

/**
 * Adapter for RapidAPI Indian Railway APIs (e.g., irctc1.p.rapidapi.com)
 */
class RapidApiAdapter {
  getHeaders() {
    return {
      'X-RapidAPI-Host': config.railway.apiHost,
      'X-RapidAPI-Key': config.railway.apiKey
    };
  }

  async getLiveStatus(trainNumber) {
    // Note: Endpoint paths may vary by the exact RapidAPI provider you subscribe to.
    // Assuming standard irctc1 liveTrainStatus endpoint.
    const url = `${config.railway.apiUrl}/api/v1/liveTrainStatus`;
    
    try {
      const response = await axios.get(url, {
        params: { trainNo: trainNumber, startDay: 1 },
        headers: this.getHeaders()
      });

      const data = response.data;
      if (!data.status && !data.data) {
        throw new Error(data.message || "Train not found");
      }

      // Normalize Response
      // Different RapidAPI endpoints return different structures. 
      // We map it to our standardized RailTrack frontend model.
      const trainData = data.data || data;
      
      const stations = (trainData.previous_stations || trainData.upcoming_stations || trainData.route || []).map(st => ({
        stationName: st.station_name || st.name,
        stationCode: st.station_code || st.code,
        scheduledArrival: st.eta || st.schArrTime,
        actualArrival: st.actArrTime || st.eta,
        scheduledDeparture: st.etd || st.schDepTime,
        actualDeparture: st.actDepTime || st.etd,
        delayMinutes: parseInt(st.delay_in_mins || 0),
        hasArrived: st.has_arrived || false,
        hasDeparted: st.has_departed || false,
      }));

      return {
        trainNumber: trainNumber,
        trainName: trainData.train_name || "Unknown Train",
        status: trainData.status === 'Running' || trainData.delay_in_mins > 0 ? "DELAYED" : "ON TIME", // Simplify for demo
        delayMinutes: trainData.delay_in_mins || 0,
        lastUpdated: trainData.updated_time || new Date().toISOString(),
        currentLocation: {
          stationName: trainData.current_station_name || "Unknown",
          stationCode: trainData.current_station_code || "",
          message: trainData.position || `Currently near ${trainData.current_station_name}`
        },
        stations: stations
      };
    } catch (error) {
      if (error.response?.status === 404) throw new Error("Train number not found.");
      throw error;
    }
  }

  async getTrainsBetweenStations(fromStation, toStation, date) {
    const url = `${config.railway.apiUrl}/api/v3/trainBetweenStations`;
    try {
      const response = await axios.get(url, {
        params: { fromStationCode: fromStation, toStationCode: toStation },
        headers: this.getHeaders()
      });

      const data = response.data;
      if (!data.status && !data.data) {
        return []; // No trains
      }

      const trainsList = data.data || [];
      return trainsList.map(t => ({
        trainNumber: t.train_number || t.train_base?.train_no,
        trainName: t.train_name || t.train_base?.train_name,
        from: t.from_station_name || fromStation,
        to: t.to_station_name || toStation,
        departureTime: t.from_std || t.departure_time,
        arrivalTime: t.to_sta || t.arrival_time,
        duration: t.duration || "N/A",
        runningDays: t.run_days || "Daily"
      }));
    } catch (error) {
      throw error;
    }
  }
}

export default new RapidApiAdapter();
