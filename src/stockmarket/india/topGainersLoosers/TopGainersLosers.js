import React, { useState, useEffect } from 'react';
import "./topGainersLosers.css"
import NestedDonutChart from "../chart/PieChart";
import TradingHolidays from "../holidays/Holidays";

const TopGainersLosers = ({ selectedEquity }) => {
  const [gainersData, setGainersData] = useState([]);
  const [losersData, setLosersData] = useState([]);
  const [nifty50Data, setNifty50Data] = useState({});
  const [gainersEquitiesData, setGainersEquitiesData] = useState([]);
  const [losersEquitiesData, setLosersEquitiesData] = useState([]);
  const [loadingGainersData, setLoadingGainersData] = useState(true);
  const [loadingLosersData, setLoadingLosersData] = useState(true);
  const [loadingGainersEquitiesData, setLoadingGainersEquitiesData] = useState(true);
  const [loadingLosersEquitiesData, setLoadingLosersEquitiesData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/xyz/api/top-gainers-losers-indices?index=${encodeURIComponent(selectedEquity)}`);
        const data = await response.json();
        const gainers = data.data.filter((stock) => stock.pChange > 0 && stock.priority === 0);
        const losers = data.data.filter((stock) => stock.pChange < 0 && stock.priority === 0).reverse();
        setGainersData(gainers);
        setLosersData(losers);
        setLoadingGainersData(false);
        setLoadingLosersData(false);


        const responseEquities = await fetch(`http://localhost:8000/xyz/api/top-gainers-losers-equities`);
        const dataEquities = await responseEquities.json();
        const gainerEquities = dataEquities.filter((stock) => stock.PPerchange > 0).sort((a, b) => b.PPerchange - a.PPerchange);
        const losersEquities = dataEquities.filter((stock) => stock.PPerchange < 0).sort((a, b) => b.PPerchange - a.PPerchange).reverse();

        setGainersEquitiesData(gainerEquities);
        setLosersEquitiesData(losersEquities);
        setLoadingGainersEquitiesData(false);
        setLoadingLosersEquitiesData(false);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [selectedEquity]);

  return (
    <div className="row" style={{marginLeft:"0px"}}>
      <div className="card bg-transparent p-0 m-1" style={{maxHeight: '40vh', maxWidth: '18vw', border: null}}>
        <div className="card-header">
          <h5 className="card-title">{selectedEquity}</h5>
        </div>
        <div className="card-body overflow-auto" style={{color: "red", fontSize: "small", paddingLeft:"5px", paddingRight:"2px"}}>
          {loadingLosersData ? (
            <div>Loading...</div>
          ) : (
            losersData.map((stock, index) => (
              <div key={index}>
                <div className=""><strong>{stock.symbol}</strong>
                  <p className="float-end">{stock.change}({stock.pChange}%) | ₹ {stock.lastPrice}</p>
                </div>
                <hr/>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="card bg-transparent p-0 m-1" style={{maxHeight: '40vh', maxWidth: '18vw'}}>
        <div className="card-header">
          <h5 className="card-title">{selectedEquity}</h5>
        </div>
        <div className="card-body overflow-auto" style={{color: "green", fontSize: "small", paddingLeft:"5px", paddingRight:"2px"}}>
          {loadingGainersData ? (
            <div>Loading...</div>
          ) : (
            gainersData.map((stock, index) => (
              <div key={index}>
                <div className=""><strong>{stock.symbol}</strong>
                  <p className="float-end">{stock.change}({stock.pChange}%) | ₹ {stock.lastPrice}</p>
                </div>
                <hr/>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="card bg-transparent p-0 m-1 ml-1" style={{maxHeight: '40vh', maxWidth: '18vw', border: null}}>
        <div className="card-header">
          <h5 className="card-title">Top Losers</h5>
        </div>
        <div className="card-body overflow-auto" style={{color: "red", fontSize: "small", paddingLeft:"5px", paddingRight:"2px"}}>
          {loadingLosersEquitiesData ? (
            <div>Loading...</div>
          ) : (
            losersEquitiesData.map((stock, index) => (
              <div key={index}>
                <div className=""><strong>{stock.DispSym}</strong>
                  <p className="float-end">{stock.Pchange}({stock.PPerchange.toFixed(2)}%) | ₹ {stock.Ltp}</p>
                </div>
                <hr/>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="card bg-transparent p-0 m-1" style={{maxHeight: '40vh', maxWidth: '18vw'}}>
        <div className="card-header">
          <h5 className="card-title">Top Gainers</h5>
        </div>
        <div className="card-body overflow-auto" style={{color: "green", fontSize: "small", paddingLeft:"5px", paddingRight:"2px"}}>
          {loadingGainersEquitiesData ? (
            <div>Loading...</div>
          ) : (
            gainersEquitiesData.map((stock, index) => (
              <div key={index}>
                <div className=""><strong>{stock.DispSym}</strong>
                  <p className="float-end">{stock.Pchange}({stock.PPerchange.toFixed(2)}%) | ₹ {stock.Ltp}</p>
                </div>
                <hr/>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TopGainersLosers;
