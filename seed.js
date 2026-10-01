import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { config } from './config.js';
import Station from './models/Station.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedDatabase = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    console.log(`Connected to MongoDB at ${config.mongoUri}`);

    const stationsPath = path.join(__dirname, 'data', 'stations.json');
    if (!fs.existsSync(stationsPath)) {
      console.error('stations.json not found!');
      process.exit(1);
    }

    const stationsData = JSON.parse(fs.readFileSync(stationsPath, 'utf8'));

    // Clear existing stations
    await Station.deleteMany();
    console.log('Cleared existing stations collection.');

    // Insert new stations
    await Station.insertMany(stationsData);
    console.log(`Successfully imported ${stationsData.length} stations!`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
