import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import Landing from './components/Landing';
import Portfolio from './components/Portfolio';
import Background from './components/Background';
import ResumeBuilder from './components/ResumeBuilder';
import './App.css';

function App() {
  const [showPortfolio, setShowPortfolio] = useState(false);

  const handleExploreClick = () => {
    setShowPortfolio(true);
  };

  return (
    <>
      <GlobalStyles />
      <Background />
      <Router>
        <Routes>
          <Route path="/" element={showPortfolio ? <Portfolio /> : <Landing onExploreClick={handleExploreClick} />} />
          <Route path="/edit" element={<ResumeBuilder />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;