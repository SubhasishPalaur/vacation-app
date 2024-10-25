import React from 'react';
import './styles.css';

const CityWeather = ({ data }) => {
  return (
    <div className="city-weather">
      <h2>{data.name}</h2>
      <p>🌡️ Temperature: {data.main.temp}°C</p>
      <p>💧 Humidity: {data.main.humidity}%</p>
      <p>🌬️ Wind Speed: {data.wind.speed} m/s</p>
    </div>
  );
};

export default CityWeather;
