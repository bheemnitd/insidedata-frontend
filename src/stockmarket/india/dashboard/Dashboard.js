import {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';

import Indices from "../indices/Indices";
import LinearChart from "../chart/LinearChart";
import TopGainersLosers from "../topGainersLoosers/TopGainersLosers";
import "../home/Home.css"

import TradingHolidays from "../holidays/Holidays";

// import LineChart from "./Nifty50";
import NestedDonutChart from "../chart/PieChart";

function Dashboard() {
    const [selectedEquity, setSelectedEquity] = useState('NIFTY 50');
    const [showIndices,setShowIndices] = useState(true);
    const [showTopGainersLosers,setShowTopGainersLosers] = useState(true);
    const [showLinearChart,setShowLinearChart] = useState(true);

      const handleAboutClick = () => {
        setShowIndices(false);
        setShowTopGainersLosers(false);
        setShowLinearChart(false);
      };

      const handleDashboardClick = () => {
        setShowIndices(true);
        setShowTopGainersLosers(true);
        setShowLinearChart(true);
      };

      return (
          <div className="row g-0" style={{height:'90vh'}}>
            <div className="col-3 mt-1">
              {showIndices ? <Indices setSelectedEquity={setSelectedEquity}/>: null}
            </div>
            <div className="col-9" id="chart">
              {showTopGainersLosers ? <TopGainersLosers selectedEquity={selectedEquity} /> : null}
              {showLinearChart ? <LinearChart selectedEquity={selectedEquity} /> : null}
              {/*<LineChart selectedEquity={selectedEquity}/>*/}
            </div>
          </div>
      );
}

export default Dashboard;