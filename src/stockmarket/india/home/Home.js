import {useState} from "react";
import Dashboard from "../dashboard/Dashboard";
import About from "../../../components/About";
import CandleStickChart from "../chart/CandleStickChart";
import RazorpayComponent from "../razorpay/Razorpay"

function Home() {
    // const [selectedEquity, setSelectedEquity] = useState('NIFTY 50');
    const [showDashboard,setShowDashboard] = useState(false);
    const [showAbout, setShowAbout] = useState(true);
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const [setCandleStickChart, setShowCandleStickChart] = useState(false);

    const handleCandleStickChartClick=()=>{
        setShowCandleStickChart(true)
        setShowSignup(false);
        setShowAbout(false);
        setShowDashboard(false);
        setShowLogin(false);
    }
    const handleLoginClick = () => {
        setShowCandleStickChart(false)
        setShowSignup(false);
        setShowAbout(false);
        setShowDashboard(false);
        setShowLogin(true);
    };

    const handleSignupClick = () => {
        setShowCandleStickChart(false)
        setShowLogin(false);
        setShowSignup(true);
        setShowAbout(false);
        setShowDashboard(false);
    };

    const handleAboutClick = () => {
        setShowCandleStickChart(false)
        setShowLogin(false);
        setShowSignup(false);
        setShowAbout(true);
        setShowDashboard(false);
    };

    const handleDashboardClick = () => {
        setShowCandleStickChart(false)
        setShowLogin(false);
        setShowSignup(false);
        setShowAbout(false);
        setShowDashboard(true);
    };

    return (
        <div className="p-0 m-0">
              <nav className="navbar navbar-expand-sm fixed-top">
                    <div className="container-fluid">
                          <a className="navbar-brand" href="#"> I N S I D E D A T A </a>
                          <div className="collapse navbar-collapse" id="collapsibleNavbar">
                              <ul className="navbar-nav">
                                  <li className="nav-item">
                                      <a className="nav-link active" href="#"
                                         onClick={handleDashboardClick}>DASHBOARD</a>
                                  </li>
                                  <li className="nav-item">
                                      <a className="nav-link disabled" href="#">HOLDINGS</a>
                                  </li>
                                  <li className="nav-item">
                                      <a className="nav-link disabled" href="#">POSITIONS</a>
                                  </li>
                                  <li className="nav-item">
                                      <a className="nav-link disabled" href="#">BIDS</a>
                                  </li>
                                  <li className="nav-item">
                                      <a className="nav-link disabled" href="#">FUNDS</a>
                                  </li>
                                  <li className="nav-item">
                                      <a className="nav-link disabled" href="#">IPO</a>
                                  </li>
                                  <li className="nav-item">
                                      <a className="nav-link disabled" href="#">MUTUALS FUNDS</a>
                                  </li>
                                  <li className="nav-item">
                                      <a className="nav-link" href="#" onClick={handleCandleStickChartClick}>CANDLE
                                          STICK CHART</a>
                                  </li>
                                  <li className="nav-item">
                                      <a className="nav-link" href="#" onClick={handleLoginClick}>LOGIN</a>
                                  </li>
                                  <li className="nav-item">
                                      <a className="nav-link" href="#" onClick={handleSignupClick}>SIGNUP</a>
                                  </li>
                                  <li className="nav-item">
                                      <a className="nav-link active" href="#" onClick={handleAboutClick}>ABOUT</a>
                                  </li>
                                  <li className="nav-item">
                                      <a className="nav-link disabled" href="#" onClick={handleAboutClick}>DONATE</a>
                                  </li>
                              </ul>
                          </div>
                    </div>
              </nav>
            <div className="container-fluid overflow-auto" style={{height: '94vh', marginTop: '6vh'}}>
                {showAbout ? <About /> : null}
                {showDashboard ? <Dashboard /> : null}
                {setCandleStickChart ? <CandleStickChart /> : null}
              </div>
        </div>
    );
}

export default Home;