import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CityWeather from './CityWeather';
import Recommendations from './assets/Recommendation';
import './styles.css'; 
import logo from '../public/logo.png'

const App = () => {
  const [cities, setCities] = useState(['delhi', 'Mumbai', 'Gurgaon']);
  const [cityInput, setCityInput] = useState('');
  const [weatherData, setWeatherData] = useState([]);

  const handleInputChange = (e) => {
    setCityInput(e.target.value);
  };

  const addCity = () => {
    if (cityInput && !cities.includes(cityInput)) {
      setCities([...cities, cityInput]);
      setCityInput('');
    }
  };

  useEffect(()=>{
    fetchWeatherData()
  })

  const fetchWeatherData = async () => {
    const responses = await Promise.all(
      cities.map(async (city) => {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=96842fc648924100864d47b401ffd0ed&units=metric`
          );
          console.log(response)
          return response.data;
        } catch (error) {
          console.error('Error fetching weather data:', error);
          return null;
        }
      })
    );

    setWeatherData(responses.filter(Boolean));
  };

  return (
    <div className="App">
      <header className='header-logo'>
      <h1 style={{'margin': '0'}}>Best Vacation App</h1>
      <img src={logo} style={{
    height: '40px',
    width: '40px'
  }} />
      </header>
      <div style={{'display': 'flex', 'gap': '16px'}}>
      <input
        type="text"
        value={cityInput}
        onChange={handleInputChange}
        className='city-input'
        placeholder="Enter city name"
      />
      <button onClick={addCity} className='button'>Add City</button>
      <button onClick={fetchWeatherData} className='button'>Get Weather</button>
      </div>
      <div className='weather-container'>
        {weatherData.map((data, index) => (
          <CityWeather key={index} data={data} />
        ))}
      </div>

      <Recommendations data={weatherData} />
    </div>
  );
};

export default App;
