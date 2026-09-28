import { config } from '../config.js';
import rapidApiAdapter from './rapidApiAdapter.js';
import railRadarAdapter from './railRadarAdapter.js';
import railkitAdapter from './railkitAdapter.js';
import indianRailwayApiAdapter from './indianRailwayApi.js';

class RailwayApiService {
  getAdapter() {
    if (config.railway.provider === 'rapidapi-irctc') {
      return indianRailwayApiAdapter;
    }
    if (config.railway.provider === 'rapidapi') {
      return rapidApiAdapter;
    }
    if (config.railway.provider === 'railkit') {
      return railkitAdapter;
    }
    // Default to railradar
    return railRadarAdapter;
  }

  async getLiveStatus(trainNumber, date) {
    const adapter = this.getAdapter();
    return await adapter.getLiveStatus(trainNumber, date);
  }

  async getTrainsBetweenStations(fromStation, toStation, date) {
    const adapter = this.getAdapter();
    return await adapter.getTrainsBetweenStations(fromStation, toStation, date);
  }
}

export default new RailwayApiService();
