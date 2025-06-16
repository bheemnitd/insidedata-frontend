import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Landing from './components/Landing';
import Portfolio from './components/Portfolio';
import './App.css';

function App() {
  const [showPortfolio, setShowPortfolio] = useState(false);

  const handleExploreClick = () => {
    setShowPortfolio(true);
  };

  return (
    <Router>
      {showPortfolio ? (
        <Portfolio />
      ) : (
        <Landing onExploreClick={handleExploreClick} />
      )}
    </Router>
  );
}

export default App;