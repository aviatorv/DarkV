import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import MapApplication from './components/MapApplication';

function App() {
  const [showMap, setShowMap] = useState(false);

  if (showMap) {
    return <MapApplication />;
  }

  return <LandingPage onExplore={() => setShowMap(true)} />;
}

export default App;