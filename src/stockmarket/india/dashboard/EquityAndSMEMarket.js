// // EquityAndSMEMarket.js
//
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
//
// const EquityAndSMEMarket = () => {
//   const [data, setData] = useState([]);
//
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/api/live-analysis-emerge/');
//         setData(response.data.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchData();
//   }, []);
//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>Symbol</th>
//           <th>Series</th>
//           <th>Open</th>
//           <th>Day High</th>
//           <th>Day Low</th>
//           <th>Last Price</th>
//           <th>Change</th>
//           <th>% Change</th>
//           <th>Previous Close</th>
//           <th>Total Traded Volume</th>
//           <th>Total Traded Value</th>
//           <th>Year High</th>
//           <th>Year Low</th>
//           <th>Near WKH</th>
//           <th>Near WKL</th>
//           <th>CA</th>
//           <th>Chart Today</th>
//           <th>% Change 365d</th>
//           <th>Date 365d Ago</th>
//           <th>Chart 365d</th>
//           <th>Date 30d Ago</th>
//           <th>% Change 30d</th>
//           <th>Chart 30d</th>
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((equity, index) => (
//             <tr key={index}>
//               <td>{equity.symbol}</td>
//               <td>{equity.series}</td>
//               <td>{equity.open}</td>
//               <td>{equity.dayHigh}</td>
//               <td>{equity.dayLow}</td>
//               <td>{equity.lastPrice}</td>
//               <td>{equity.change}</td>
//               <td>{equity.pChange}</td>
//               <td>{equity.previousClose}</td>
//               <td>{equity.totalTradedVolume}</td>
//               <td>{equity.totalTradedValue}</td>
//               <td>{equity.yearHigh}</td>
//               <td>{equity.yearLow}</td>
//               <td>{equity.nearWKH}</td>
//               <td>{equity.nearWKL}</td>
//               <td>{equity.ca}</td>
//               <td>{equity.perChange365d}</td>
//               <td>{equity.date365dAgo}</td>
//               <td>{equity.date30dAgo}</td>
//               <td>{equity.perChange30d}</td>
//               <td>
//                 <img src={equity.chartTodayPath} alt="Chart Today"/>
//               </td>
//               <td>
//                 <img src={equity.chart365dPath} alt="Chart 365d"/>
//               </td>
//               <td>
//                 <img src={equity.chart30dPath} alt="Chart 30d"/>
//               </td>
//             </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };
//
// export default EquityAndSMEMarket;
