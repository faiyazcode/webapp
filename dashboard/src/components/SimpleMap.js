import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { fetchCountryData } from '../api';
import "leaflet/dist/leaflet.css";
import { Icon } from 'leaflet';

const SimpleMap = () => {
  const [countryData, setCountryData] = useState([]);
  const center = [20, 0]; // Adjust the default center based on your preference
  const zoom = 2; // Adjust the default zoom level based on your preference

  useEffect(() => {
    fetchCountryData()
      .then((data) => {
        setCountryData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Define a custom icon for the markers using a custom image URL
  const customIcon = new Icon({
    //iconUrl: "https://example.com/your-custom-icon.png", // Replace with the actual URL of your custom icon
    iconUrl: require("../Img/marker-icon.png.png"),
    iconSize: [38, 38] // Size of the icon
  });

  return (
    <div className="map">
      <h2 className="text-2xl font-semibold mb-4">COVID-19 Map</h2>
      <div className="map-container" style={{ width: '100%', height: '500px' }}>
        <MapContainer center={[48.8566, 2.3522]} zoom={zoom} style={{ width: '100%', height: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {countryData.map((country) => (
            <Marker
              key={country.country}
              position={[country.countryInfo.lat, country.countryInfo.long]}
              icon={customIcon}
            >
              <Popup>
                <div>
                  <h3>{country.country}</h3>
                  <div>
                    <img src={country.countryInfo.flag} alt={`${country.country} Flag`} />
                  </div>
                  <p>Total Cases: {country.cases.toLocaleString()}</p>
                  <p>Recovered: {country.recovered.toLocaleString()}</p>
                  <p>Deaths: {country.deaths.toLocaleString()}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default SimpleMap;
