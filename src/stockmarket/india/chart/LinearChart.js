import React, { useEffect, useRef, useState } from 'react';
// import Chart from 'chart.js/auto';
// import zoomPlugin from 'chartjs-plugin-zoom';
import { format } from 'date-fns';

const LinearChart = ({ selectedEquity }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [selectedFilter, setSelectedFilter] = useState('all'); // Default to show all data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/xyz/api/index-historical-data?index=${encodeURIComponent(selectedEquity)}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log(data)
        renderChart(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const filterChartData = (data, filter) => {
      switch (filter) {
        case '1d':
          return data.slice(-24);
        case '5d':
          return data.slice(-24 * 5);
        case '1m':
          return data.slice(-24 * 30);
        case '3m':
          return data.slice(-24 * 30 * 3);
        case '6m':
          return data.slice(-24 * 30 * 6);
        case '1y':
          return data.slice(-24 * 365);
        case '5y':
          return data.slice(-24 * 365 * 5);
        default:
          return data;
      }
    };

    const renderChart = (data) => {
      const selectedData = filterChartData(data.historical_data, selectedFilter);
      const dates = selectedData.map((entry) => new Date(entry.Date));
      const closePrices = selectedData.map((entry) => entry.Close);
      const predictedTill2024 = data.predicted_till_2024;
      const predictedTill2029  = data.predicted_till_2029;

      // const timedate = dates.map((date) => format(date, 'yyyy-MM-dd HH:mm:ss'));
      const timedate = dates.map((date) => format(date, 'yyyy'));


      const chartData = {
        labels: timedate,
        datasets: [
          {
            label: selectedEquity,
            data: closePrices,
            borderColor: 'black',
            borderWidth: 2,
            fill: true,
          },
          {
            label: "Last 8th part of all prediction",
            data: [...Array(closePrices.filter(element => element !== null).length - predictedTill2024.length).fill(null), ...predictedTill2024],
            borderColor: 'red',
            borderWidth: 2,
            fill: true,
          },
          {
            label: "Next 5 years prediction",
            data: [...Array(closePrices.length - predictedTill2029.length).fill(null), ...predictedTill2029],
            borderColor: 'black',
            borderWidth: 2,
            fill: true,
            borderDash: [10,5],
          },
        ],
      };

      const config = {
        type: 'line',
        data: chartData,
        options: {
          elements: {
            point: {
              radius: 0,
            },
          },
          // responsive: true,
          plugins: {
            zoom: {
              zoom: {
                wheel: {
                  enabled: true,
                },
                pinch: {
                  enabled: true,
                },
                mode: 'xy',
                overScaleMode: 'xy',
              },
              pan: {
                enabled: true,
                mode: 'xy',
              },
            },
          },
          // interaction: {
          //   intersect: false,
          // },
          scales: {
            x: {
              type: 'category',
              ticks: {
                maxTicksLimit: 20,
                align: 'start',
              },
            },
            y: {
              position: 'right',
              // suggestedMin: Math.min(...closePrices) / 1000,
              // suggestedMax: Math.max(...closePrices) / 1000,
            },
          },
        },
        plugins: [zoomPlugin],
      };

      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      chartInstanceRef.current = new Chart(ctx, config);

      // Enable zoom and pan
      if (chartInstanceRef.current.plugins) {
        chartInstanceRef.current.plugins.register(zoomPlugin);
      }
    };

    fetchData();
  }, [selectedEquity, selectedFilter]);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  return (
    <>
      <div className="button-group btn-outline-dark ">
        <button className="btn btn-sm btn-outline-dark m-1" onClick={() => handleFilterChange('1d')}>1 Day</button>
        <button className="btn btn-sm btn-outline-dark m-1" onClick={() => handleFilterChange('5d')}>5 Days</button>
        <button className="btn btn-sm btn-outline-dark m-1" onClick={() => handleFilterChange('1m')}>1 Month</button>
        <button className="btn btn-sm btn-outline-dark m-1" onClick={() => handleFilterChange('3m')}>3 Months</button>
        <button className="btn btn-sm btn-outline-dark m-1" onClick={() => handleFilterChange('6m')}>6 Months</button>
        <button className="btn btn-sm btn-outline-dark m-1" onClick={() => handleFilterChange('1y')}>1 Year</button>
        <button className="btn btn-sm btn-outline-dark m-1" onClick={() => handleFilterChange('5y')}>5 Years</button>
        <button className="btn btn-sm btn-outline-dark m-1" onClick={() => handleFilterChange('all')}>All Data</button>
      </div>
      <canvas
        className="g-0"
        ref={chartRef}

        style={{
          // border: '1px solid #ccc',
          borderRadius: '8px',
          // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          width:"1500",
          height:"11vh",
          padding:0,
          margin:0
        }}
      ></canvas>
    </>
  );
};

export default LinearChart;
