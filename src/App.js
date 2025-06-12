import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Home from "./stockmarket/india/home/Home";
import EquityAndSMEMarket from "./stockmarket/india/dashboard/EquityAndSMEMarket";
import Trading from "./stockmarket/india/chart/trading";
import HolidayList from "./stockmarket/india/holidays/Holidays";
import CandleStickChart from "./stockmarket/india/chart/CandleStickChart";
import BarChart from "./stockmarket/india/chart/CandleStickChart";
import Razorpay from "./razorpay/Razorpay";
import RazorpayPayment from "./razorpay/Razorpay";
import About from "./components/About"
import ResumeEdit from "./components/ResumeBuilder";
import Resume from "./components/ResumeDisplay";
function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/intro" element={<About />} />
          <Route path="/resume-edit" element={<ResumeEdit />} />
          <Route path="/resume" element={<Resume />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/live-analysis-emerge" element={<EquityAndSMEMarket />} />
          <Route path="/chart" element={<BarChart />} />
          <Route path="/razorpay" element={<RazorpayPayment />} />
        </Routes>
    </Router>
  );
}

export default App;