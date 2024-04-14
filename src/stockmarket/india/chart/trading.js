import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LiveTradingChart = () => {
    const chartRef = useRef(null);
    const data = useRef([/* Initial data points */]);
    const chartInstance = useRef(null);

    const fetchData = async () => {
        // Fetch live data here, for example using a WebSocket or an API
        // For the purpose of this example, I'll simulate random data updates
        const randomDataPoint = Math.random() * 100;
        data.current.push(randomDataPoint);

        // Limit the data array to a certain number of points (e.g., 50)
        if (data.current.length > 50) {
            data.current.shift(); // Remove the oldest data point
        }

        if (chartInstance.current) {
            chartInstance.current.data.labels = Array.from({length: data.current.length}, (_, i) => i + 1);
            chartInstance.current.data.datasets[0].data = data.current;
            chartInstance.current.update(); // Update the chart
        }
    };

    useEffect(() => {
        // Create the chart on component mount
        const ctx = chartRef.current.getContext('2d');

        chartInstance.current = new Chart(ctx, {
            type: 'candlestick',
            data: {
                labels: Array.from({length: data.current.length}, (_, i) => i + 1),
                datasets: [
                    {
                        label: 'Live Trading Data',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderWidth: 2,
                        data: data.current,
                    },
                ],
            },
            options: {
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom',
                    },
                    y: {
                        min: 0,
                        max: 100,
                    },
                },
            },
        });

        // Start fetching live data at intervals
        const intervalId = setInterval(fetchData, 1000);

        // Cleanup when the component unmounts
        return () => {
            clearInterval(intervalId);
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, []);
    return (
        <canvas
        ref={chartRef}
        style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            marginTop: '20px',
        }}
        width="1500"
        height="590"
    >
    </canvas>
    )
};

export default LiveTradingChart;
