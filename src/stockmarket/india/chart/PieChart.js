// import React, { useEffect, useRef } from 'react';
// // import { Chart, PieController, ArcElement } from 'chart.js';

// const NestedPieChart = () => {
//   const chartRef = useRef(null);
//   const chartInstance = useRef(null);

//   useEffect(() => {
//     // Cleanup existing chart instance
//     if (chartInstance.current) {
//       chartInstance.current.destroy();
//     }

//     // Register Chart.js controllers
//     Chart.register(PieController, ArcElement);

//     // Get canvas context
//     const ctx = chartRef.current.getContext('2d');

//     // Chart data and options
//     const nestedPieData = {
//       datasets: [
//         {
//           data: [60, 40],
//           backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgb(224,3,3)'],
//           borderWidth: 0,
//         },
//         {
//           data: [30, 70],
//           backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgb(33,255,0)'],
//           borderWidth: 0,
//         },
//       ],
//     };

//     const nestedPieOptions = {
//       plugins: {
//         datalabels: {
//           display: false,
//         },
//       },
//     };

//     // Create new Chart instance
//     chartInstance.current = new Chart(ctx, {
//       type: 'pie',
//       data: nestedPieData,
//       options: nestedPieOptions,
//     });

//     // Cleanup when the component unmounts
//     return () => {
//       if (chartInstance.current) {
//         chartInstance.current.destroy();
//       }
//     };
//   }, []); // Empty dependency array means this useEffect runs only once on mount

//   return <canvas ref={chartRef} className="chart-3d"  style={{maxHeight: '40vh', maxWidth: '30vw'}}
//   />;
// };

// export default NestedPieChart;
