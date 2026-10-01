import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomeView from './views/HomeView';
import TrainStatusView from './views/TrainStatusView';
import StationResultsView from './views/StationResultsView';

const AppRoutes = () => {
  const navigate = useNavigate();
  const [activeTrain, setActiveTrain] = useState(null);
  const [activeTrainDate, setActiveTrainDate] = useState(null);
  
  // For station route
  const [routeConfig, setRouteConfig] = useState({
    fromCode: null,
    toCode: null,
    fromName: null,
    toName: null
  });

  const goHome = () => {
    navigate('/');
    window.scrollTo(0, 0);
  };

  const handleTrackTrain = (trainNumber, date) => {
    let finalDate = date;
    if (!finalDate) {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      finalDate = `${year}${month}${day}`;
    }
    
    setActiveTrain(trainNumber);
    setActiveTrainDate(finalDate);
    navigate('/train-status');
    window.scrollTo(0, 0);
  };

  const handleSearchStations = (fromCode, toCode, fromName, toName) => {
    setRouteConfig({ fromCode, toCode, fromName, toName });
    navigate('/station-results');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-[var(--color-rail-bg)] font-sans antialiased text-gray-900 selection:bg-[var(--color-rail-accent)] selection:text-white">
      <Routes>
        <Route path="/" element={
          <>
            <Navbar onHome={goHome} />
            <main>
              <HomeView 
                onTrackTrain={handleTrackTrain} 
                onSearchStations={handleSearchStations} 
              />
            </main>
          </>
        } />
        
        <Route path="/train-status" element={
          <main>
            <TrainStatusView 
              trainNumber={activeTrain} 
              date={activeTrainDate}
              onBack={() => navigate(-1)} 
            />
          </main>
        } />
        
        <Route path="/station-results" element={
          <main>
            <StationResultsView 
              fromCode={routeConfig.fromCode}
              toCode={routeConfig.toCode}
              fromName={routeConfig.fromName}
              toName={routeConfig.toName}
              onTrackTrain={handleTrackTrain}
              onBack={() => navigate(-1)}
            />
          </main>
        } />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
