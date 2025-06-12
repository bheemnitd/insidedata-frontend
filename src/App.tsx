import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./stockmarket/india/home/Home";
import About from "./components/About";
import ResumeEdit from "./components/ResumeBuilder";
import Landing from "./components/Landing";
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/old" element={<Home />} /> */}
        <Route path="/" element={<Landing />} />
        <Route path="/portfolio" element={<Home />} />
        <Route path="/resume-edit" element={<ResumeEdit />} />
      </Routes>
    </Router>
  );
};

export default App;