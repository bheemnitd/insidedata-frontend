import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';
import { format } from 'date-fns';

const LineChart = ({selectedEquity}) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/xyz/api/index-historical-data/?index=${encodeURIComponent(selectedEquity)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        renderChart(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const renderChart = (data) => {
      const dates = data.map((entry) => new Date(entry.Date));
      const closePrices = data.map((entry) => entry.Close);

      const formatXLabel = (date) => {
        const pointDate = new Date(date);
          return format(pointDate, 'yyyy-MM-dd HH:mm:ss');
      };

      const timedate = dates.map((date) => formatXLabel(date)).reverse();

      const chartData = {
        labels: timedate,
        datasets: [
          {
            label: 'Close Prices',
            data: closePrices.reverse(),
            borderColor: 'blue',
            borderWidth:1,
            fill: false,
          },
        ],
      };

      const config = {
        type: 'line',
        data: chartData,
        options: {
          elements: {
            point: {
              radius: 0
            }
          },
          responsive: true,
          plugins: {
            // title: {
            //   display: true,
            //   text: 'Nifty 50',
            // },
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
          interaction: {
            intersect: false,
          },
          scales: {
            x: {
              type: 'category',
              // labels: timedate,
              // title: {
              //   display: true,
              //   text: 'Datetime',
              // },
              ticks:{
                maxTicksLimit: 10
              }
            },
            y: {
              // display: true,
              // title: {
              //   display: true,
              //   text: 'Price',
              // },
              suggestedMin: Math.min(...closePrices)/1000,
              suggestedMax: Math.max(...closePrices)/1000,
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
  }, []);

  return (
      <div>
        <canvas
            ref={chartRef}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              marginTop: '20px',
            }}
            width="800"
            height="400"
        >

        </canvas>
      </div>
  );
};

export default LineChart;
