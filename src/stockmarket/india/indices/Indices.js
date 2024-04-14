import React, { useState, useEffect } from 'react';

const Indices = ({ setSelectedEquity }) => {
  const [equityData, setEquityData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/xyz/api/indices");
        const data = await response.json();
        setEquityData(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []); // Run once on component mount

  const handleEquityClick = (indexSymbol) => {
    setSelectedEquity(indexSymbol);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter equity data based on search query
  const filteredEquityData = equityData.filter(equity =>
    equity.indexSymbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-transparent">
      <form className="form-inline form-control-lg">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            aria-label="Search"
            aria-describedby="basic-addon1"
            style={{ height: "50px" }}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </form>
      <div className="overflow-auto p-2 border-0" style={{ height: '87vh', fontSize: "small" }}>
        {filteredEquityData.map((equity) => (
          <div key={equity.indexSymbol} style={{
            color: equity.variation < 0 ? 'red' : equity.variation > 0 ? 'green' : 'default',
          }}>
            <a href="#" style={{ color: equity.variation < 0 ? 'red' : equity.variation > 0 ? 'green' : 'default' }}
              onClick={() => handleEquityClick(equity.indexSymbol)}>
              <strong>{equity.indexSymbol}</strong>
              <p className="card-text float-end">
                {equity.variation > 0 && '+'}{equity.variation.toFixed(2)} ({equity.percentChange.toFixed(2)}%) | ₹ {equity.last}
              </p>
            </a>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Indices;
