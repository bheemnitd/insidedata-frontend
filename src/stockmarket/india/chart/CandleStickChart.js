// import React, { useEffect, useRef } from 'react';
// // import Chart from 'chart.js/auto';

// const BarChart = () => {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     const data = {
//       datasets: [{
//         label: 'Data',
//         data: [
//           {
//             x: '3-jan-2024',
//             Open: 20,
//             High: 30,
//             Low: 10,
//             Close: 18,
//             Candle: [20, 18]
//           },
//           {
//             x: '4-jan-2024',
//             Open: 22,
//             High: 32,
//             Low: 12,
//             Close: 20,
//             Candle: [22, 20]
//           },
//           {
//             x: '5-jan-2024',
//             Open: 10,
//             High: 48,
//             Low: 28,
//             Close: 35,
//             Candle: [10, 35]
//           },
//           {
//             x: '6-jan-2024',
//             Open: 28,
//             High: 38,
//             Low: 18,
//             Close: 25,
//             Candle: [28, 25]
//           },
//           {
//             x: '7-jan-2024',
//             Open: 30,
//             High: 40,
//             Low: 20,
//             Close: 28,
//             Candle: [30, 28]
//           },
//           {
//             x: '8-jan-2024',
//             Open: 20,
//             High: 42,
//             Low: 22,
//             Close: 30,
//             Candle: [20, 30]
//           },
//           {
//             x: '9-jan-2024',
//             Open: 15,
//             High: 45,
//             Low: 25,
//             Close: 32,
//             Candle: [15, 32]
//           }
//         ],
//         backgroundColor: (ctx) => {
//           const { raw: { Open, Close } } = ctx;
//           return Close >= Open ? 'rgb(0,240,255)' : 'rgb(255,0,136)';
//         },
//         borderColor: 'black',
//         borderWidth: 1,
//         borderSkipped: false
//       }]
//     };

//     const candleStick = {
//       id: 'candlestick',
//       beforeDatasetsDraw(chart, args, options) {
//         const { ctx, data, chartArea, scales: { x, y } } = chart;
//         const { top, bottom, left, right, width, height } = chartArea;
//         ctx.save();
//         ctx.lineWidth = 2;
//         ctx.strokeStyle = 'rgba(0,0,0,1)';
//         data.datasets[0].data.forEach((datapoint) => {
//           const xVal = x.getPixelForValue(datapoint.x);
//           const yHigh = y.getPixelForValue(datapoint.High);
//           const yLow = y.getPixelForValue(datapoint.Low);
//           ctx.beginPath();
//           ctx.moveTo(xVal, yHigh);
//           ctx.lineTo(xVal, yLow);
//           ctx.stroke();
//         });
//         ctx.restore();
//       }
//     };

//     const options = {
//       scales: {
//         y: {
//           beginAtZero: false, // Change to false to allow negative values for padding
//           grace: '10%', // Add padding percentage to the top and bottom of the y-axis
//         }
//       },
//       parsing: {
//         xAxisKey: 'x',
//         yAxisKey: 'Candle'
//       },
//     };

//     const chart = new Chart(chartRef.current, {
//       type: 'bar',
//       data: data,
//       options: options,
//       plugins: [candleStick]
//     });

//     return () => {
//       chart.destroy(); // Cleanup chart instance on component unmount
//     };
//   }, []);

//   return <canvas ref={chartRef}></canvas>;
// };

// export default BarChart;
