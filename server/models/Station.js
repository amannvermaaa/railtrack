import mongoose from 'mongoose';

const stationSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

const Station = mongoose.model('Station', stationSchema);

export default Station;
