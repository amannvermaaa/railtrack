import axios from 'axios';
import { config } from '../config.js';

class IndianRailwayApiAdapter {
  getHeaders() {
    return {
      'x-rapidapi-host': config.railway.apiHost,
      'x-rapidapi-key': config.railway.rapidApiKey
    };
  }

  async getLiveStatus(trainNumber, date) {
    if (!trainNumber || !date) {
      throw new Error("Train number and date are required");
    }

    const targetUrl = `${config.railway.apiUrl}/api/trains/v1/train/status`;

    try {
      const response = await axios.get(targetUrl, {
        params: { train_number: trainNumber, departure_date: date },
        headers: this.getHeaders()
      });

      const data = response.data;
      if (!data.status && !data.data) {
        throw new Error(data.message || "Train not found");
      }

      const trainData = data.data || data;
      
      const stations = (trainData.upcoming_stations || trainData.stations || []).map(st => ({
        stationName: st.station_name,
        stationCode: st.station_code,
        scheduledArrival: st.sta || st.scheduled_arrival,
        actualArrival: st.ata || st.actual_arrival,
        scheduledDeparture: st.std || st.scheduled_departure,
        actualDeparture: st.atd || st.actual_departure,
        delayMinutes: parseInt(st.delay_in_mins || st.delay || 0),
        hasArrived: st.has_arrived || false,
        hasDeparted: st.has_departed || false,
      }));

      return {
        trainNumber: trainNumber,
        trainName: trainData.train_name || "Unknown Train",
        status: trainData.delay_in_mins > 0 ? "DELAYED" : "ON TIME",
        delayMinutes: trainData.delay_in_mins || trainData.delay || 0,
        lastUpdated: trainData.updated_time || new Date().toISOString(),
        currentLocation: {
          stationName: trainData.current_station_name || "Unknown",
          stationCode: trainData.current_station_code || "",
          message: trainData.position || `Currently near ${trainData.current_station_name}`
        },
        stations: stations
      };
    } catch (error) {
      if (error.response?.status === 404) throw new Error("Train not found for the given date.");
      if (error.response?.status === 401) throw new Error("Invalid API key or unauthorized.");
      if (error.response?.status === 429) throw new Error("API rate limit exceeded. Please try again later.");
      throw error;
    }
  }

  async getTrainsBetweenStations(fromStation, toStation, date) {
    throw new Error("Method not implemented for this endpoint yet.");
  }
}

export default new IndianRailwayApiAdapter();
