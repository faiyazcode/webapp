import React from 'react';
import { useQuery } from 'react-query';
import { fetchWorldwideData, fetchCountryData, fetchGraphData } from '../api';
import SimpleMap from '../components/SimpleMap';
import Graph from '../components/Graph';

function Settings() {
  const worldwideDataQuery = useQuery('worldwideData', fetchWorldwideData);
  const countryDataQuery = useQuery('countryData', fetchCountryData);
  const graphDataQuery = useQuery('graphData', fetchGraphData);

  if (worldwideDataQuery.isLoading || countryDataQuery.isLoading || graphDataQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (worldwideDataQuery.isError || countryDataQuery.isError || graphDataQuery.isError) {
    return <div>Error loading data.</div>;
  }

  const worldwideData = worldwideDataQuery.data;
  const countryData = countryDataQuery.data;
  const graphData = graphDataQuery.data;

  /**Here for Graph Data */

  return (
    <div className="p-6 sm:p-8 md:p-10 lg:p-12">
      <h1 className="text-3xl font-semibold text-center mb-8">COVID-19 Dashboard</h1>

      {/* Worldwide Data */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Worldwide Data</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-100 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Total Cases</h3>
            <p className="text-2xl text-blue-700">{worldwideData.cases}</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Total Deaths</h3>
            <p className="text-2xl text-yellow-700">{worldwideData.deaths}</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Total Recovered</h3>
            <p className="text-2xl text-green-700">{worldwideData.recovered}</p>
          </div>
          <div className="bg-red-100 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Total Active</h3>
            <p className="text-2xl text-red-700">{worldwideData.active}</p>
          </div>
        </div>
      </div>

      {/* Country Data */}
      {<SimpleMap />}
      {/* Graph Data */}
      {/* {<Graph />} */}
      {/* {graphData ? <Graph graphData={graphData} /> : null} */}
    </div>
  );
}

export default Settings;
