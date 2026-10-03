import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/railways',
  railway: {
    provider: process.env.RAILWAY_PROVIDER || 'railradar',
    apiKey: process.env.RAILWAY_API_KEY || '',
    rapidApiKey: process.env.RAPIDAPI_KEY || '',
    apiHost: process.env.RAILWAY_API_HOST || 'api.railradar.in',
    apiUrl: process.env.RAILWAY_API_URL || 'https://api.railradar.in/v1'
  }
};
