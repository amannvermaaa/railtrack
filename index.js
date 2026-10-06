import express from 'express';
import cors from 'cors';
import { config } from './config.js';
import railwayApi from './services/railwayApi.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './db.js';
import Station from './models/Station.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// 1. Config endpoint
app.get('/api/config', (req, res) => {
  res.json({
    provider: config.railway.provider,
    isConfigured: !!config.railway.apiKey,
  });
});

// 2. Station Autocomplete
app.get('/api/stations/search', async (req, res) => {
  const query = req.query.q?.trim() || '';
  if (!query) {
    return res.json([]);
  }

  try {
    const regex = new RegExp(query, 'i'); // case-insensitive match

    // Find stations matching code or name
    const matches = await Station.find({
      $or: [
        { code: regex },
        { name: regex }
      ]
    }).limit(15);

    res.json(matches);
  } catch (error) {
    console.error('Error fetching stations:', error);
    res.status(500).json({ error: 'Database error while searching stations' });
  }
});

// 3. Live Train Status
app.get('/api/train-status', async (req, res) => {
  try {
    const { train_number } = req.query;
    let { date } = req.query;

    if (!train_number) {
      return res.status(400).json({ error: "train_number is required" });
    }

    if (!date) {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      date = `${year}${month}${day}`;
    }

    // Check configuration
    if (!config.railway.rapidApiKey && !config.railway.apiKey) {
      console.log('Returning mock data for live status (No API key)');
      return res.json({
        trainNumber: train_number,
        trainName: "Mock Express (Demo Data)",
        status: "running",
        currentLocation: {
          stationName: "Mock Station",
          stationCode: "MCK"
        },
        lastUpdated: new Date().toISOString(),
        delayMinutes: 15,
        stations: [
          { stationName: "Start Station", stationCode: "START", arrivalTime: "10:00", departureTime: "10:15", status: "arrived", distance: 0 },
          { stationName: "Mock Station", stationCode: "MCK", arrivalTime: "12:00", departureTime: "12:15", status: "arrived", distance: 150 },
          { stationName: "End Station", stationCode: "END", arrivalTime: "14:00", departureTime: null, status: "pending", distance: 300 }
        ]
      });
    }

    const data = await railwayApi.getLiveStatus(train_number, date);
    res.json(data);
  } catch (error) {
    console.error("Live status error:", error.message);
    const status = error.response?.status || 503;
    const message = error.response?.data?.message || error.message || "Live train data is temporarily unavailable.";
    res.status(status).json({ error: message });
  }
});

// 4. Trains Between Stations
app.get('/api/trains', async (req, res) => {
  try {
    const { from, to, date } = req.query;
    if (!from || !to) {
      return res.status(400).json({ error: "Missing from or to station codes" });
    }

    if (!config.railway.apiKey) {
      console.log('Returning mock data for trains between stations (No API key)');
      return res.json([
        {
          trainNumber: "12345",
          trainName: "Demo Express",
          fromStation: from,
          toStation: to,
          departureTime: "10:00",
          arrivalTime: "14:00",
          duration: "4h 00m",
          runningDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          classes: ["1A", "2A", "3A", "SL"]
        },
        {
          trainNumber: "54321",
          trainName: "Test Shatabdi",
          fromStation: from,
          toStation: to,
          departureTime: "16:00",
          arrivalTime: "19:30",
          duration: "3h 30m",
          runningDays: ["Mon", "Wed", "Fri"],
          classes: ["CC", "EC"]
        }
      ]);
    }

    const data = await railwayApi.getTrainsBetweenStations(from, to, date);
    res.json(data);
  } catch (error) {
    console.error("Trains between stations error:", error.message);
    const status = error.response?.status || 503;
    const message = error.response?.data?.message || error.message || "Railway data is temporarily unavailable.";
    res.status(status).json({ error: message });
  }
});

const PORT = process.env.PORT || config.port || 10000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`RailTrack API server running on port ${PORT}`);
  console.log(`Using Railway Provider: ${config.railway.provider}`);
});

export default app;
