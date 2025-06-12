import React, { useState } from "react";
import About from "./About";
import Landing from "./Landing";

function Home() {
    const [showAbout, setShowAbout] = useState(true);
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const [showCandleStickChart, setShowCandleStickChart] = useState(false);

    const handleCandleStickChartClick = () => {
        setShowCandleStickChart(true);
        setShowSignup(false);
        setShowAbout(false);
        setShowLogin(false);
    };

    const handleLoginClick = () => {
        setShowCandleStickChart(false);
        setShowSignup(false);
        setShowAbout(false);
        setShowLogin(true);
    };

    const handleSignupClick = () => {
        setShowCandleStickChart(false);
        setShowLogin(false);
        setShowSignup(true);
        setShowAbout(false);
    };

    const handleAboutClick = () => {
        setShowCandleStickChart(false);
        setShowLogin(false);
        setShowSignup(false);
        setShowAbout(true);
    };

    return (
        <div className="p-0 m-0">
            <nav className="navbar navbar-expand-sm fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#"> B H E E M K U M A R </a>
                    <div className="collapse navbar-collapse" id="collapsibleNavbar">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" href="#" onClick={handleAboutClick}>ABOUT</a>
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
                                <a className="nav-link disabled" href="#">MUTUAL FUNDS</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={handleCandleStickChartClick}>CANDLE STICK CHART</a>
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
                                <a className="nav-link disabled" href="#">DONATE</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container-fluid overflow-auto" style={{ height: '94vh', marginTop: '6vh' }}>
                {showAbout ? <Landing /> : null}
                {showAbout ? <About /> : null}
                {/* {showCandleStickChart ? <CandleStickChart /> : null} */}
            </div>
        </div>
    );
}

export default Home;