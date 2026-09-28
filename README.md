<div align="center">
  <h1>🚄 RailTrack</h1>
  <p><strong>A simple, fast, mobile-first Indian Railway Train Tracking application.</strong></p>

  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
  [![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](#)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](#)
  [![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](#)
  [![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](#)
  [![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](#)
</div>

---

## ✨ Features
- 🔍 **Train Number Search**: Real-time live train running status, current location, delay, and route timeline.
- 🚉 **Station-to-Station Search**: Find available trains between stations easily.
- 🚀 **Fast & Mobile-First**: Built with Tailwind CSS to look stunning on any screen size.
- 🛠 **Full-Stack on Vercel**: Configured out-of-the-box to run the Express backend and React frontend together on Vercel.

---

## 📂 Project Structure
```text
railways/
├── client/          # Frontend (React + Vite + Tailwind)
├── server/          # Backend (Node.js + Express API)
├── vercel.json      # Full-stack deployment configuration for Vercel
└── package.json     # Root workspace config
```

---

## ⚙️ Environment Variables (Crucial)
This app is built to use **real** Indian Railway APIs. You must configure your API provider in the backend `.env` file (locally) and on your Vercel Dashboard (for production).

1. Go to `server/` and create a `.env` file based on `.env.example`.
2. **Provider Options:**
   - **RailRadar** (Default): Register at `railradar.in` for an API key.
   - **RapidAPI**: Alternatively subscribe to `irctc1` or `indian-railway-irctc` on RapidAPI.
3. Add these variables to your `.env` (and Vercel Environment Variables):
```env
PORT=5000
RAILWAY_PROVIDER=railradar
RAILWAY_API_KEY=your_railradar_api_key_here
RAILWAY_API_URL=https://api.railradar.in/v1
MONGODB_URI=your_mongodb_connection_string
```

---

## 🚀 Local Development

1. **Install Dependencies**:
```bash
npm run install:all
```

2. **Run Both Server & Client Concurrently**:
*(Requires two terminal windows)*

**Terminal 1 (Backend):**
```bash
cd server
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev
```

The frontend will be available at `http://localhost:5173` and the backend API at `http://localhost:5000`.

---

## ☁️ Deployment on Vercel
This project is already pre-configured to be deployed on Vercel as a full-stack monorepo!

1. Make sure your GitHub repository structure exactly matches your local structure (keep `client/` and `server/` as folders, **don't mix their files together**).
2. Go to Vercel and import your GitHub repository.
3. Set the **Framework Preset** to `Other`.
4. Ensure the **Root Directory** is empty (meaning the root of the repository).
5. In **Environment Variables**, add all the variables mentioned above.
6. Click **Deploy**! Vercel will automatically read `vercel.json`, build the frontend, and host the backend as serverless functions.

---

## 🔌 API Endpoints
- `GET /api/config` - Check if provider is configured.
- `GET /api/train-status?train_number=XXX` - Live train status.
- `GET /api/trains?from=XXX&to=XXX` - Station to station search.
- `GET /api/stations/search?q=XXX` - Station autocomplete from local database.
