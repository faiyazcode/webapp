// import React, { useEffect, useState, useRef } from 'react';
// import { fetchGraphData } from '../api';
// import { Line } from 'react-chartjs-2';
// import { format } from 'date-fns';

// const Graph = () => {
//   const [graphData, setGraphData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const chartRef = useRef(null); // Reference to the chart instance

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await fetchGraphData();
//         setGraphData(data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching graph data:', error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     // Destroy the chart when the component unmounts
//     return () => {
//       if (chartRef.current) {
//         chartRef.current.destroy();
//       }
//     };
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   const dates = Object.keys(graphData.cases);
//   const cases = Object.values(graphData.cases);

//   const formattedDates = dates.filter((date, index) => index % 7 === 0).map(date => format(new Date(date), 'MM/dd/yyyy'));

//   const chartData = {
//     labels: formattedDates,
//     datasets: [
//       {
//         label: 'Total Cases',
//         data: cases,
//         fill: true,
//         backgroundColor: 'rgba(75,192,192,0.2)',
//         borderColor: 'rgba(75,192,192,1)',
//       },
//     ],
//   };

//   const chartOptions = {
//     scales: {
//       x: {
//         type: 'category',
//         title: {
//           display: true,
//           text: 'Date',
//         },
//       },
//       y: {
//         type: 'linear',
//         title: {
//           display: true,
//           text: 'Total Cases',
//         },
//         beginAtZero: true,
//       },
//     },
//     plugins: {
//       tooltip: {
//         callbacks: {
//           label: (context) => {
//             const label = context.dataset.label || '';
//             const value = context.parsed.y;
//             return `${label}: ${value.toLocaleString()}`;
//           },
//         },
//       },
//     },
//   };

//   return (
//     <div className="graph">
//       <h2 className="text-2xl font-semibold mb-4">COVID-19 Cases Over Time</h2>
//       <Line data={chartData} options={chartOptions} ref={chartRef} />
//     </div>
//   );
// };

// export default Graph;