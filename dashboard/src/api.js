// src/api.ts
import axios from 'axios';

const baseURL = 'https://disease.sh/v3/covid-19';

export const fetchWorldwideData = async () => {
  const response = await axios.get(`${baseURL}/all`);
  return response.data;
};

export const fetchCountryData = async () => {
  const response = await axios.get(`${baseURL}/countries`);
  return response.data;
};

// export const fetchGraphData = async () => {
//   const response = await axios.get(`/api/v3/covid-19/historical/all?lastdays=all`);
  
//   return response.data;
// };

export const fetchGraphData = async () => {
  const response = await axios.get(`${baseURL}/historical/all?lastdays=all`);
  return response.data;
};

