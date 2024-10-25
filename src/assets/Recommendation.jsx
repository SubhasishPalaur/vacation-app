import React from 'react';
import '../styles.css'

const Recommendations = ({ data }) => {
  if (data.length === 0) return null;

  const calculateComfortScore = (cityData) => {
    console.log(cityData)
    const { temp } = cityData.main;
    const { humidity } = cityData.main;
    const { speed } = cityData.wind;
    return Math.abs(25 - temp) + Math.abs(50 - humidity) / 2 + speed / 2;
  };

  const sortedCities = data
    .map((city) => ({
      ...city,
      comfortScore: calculateComfortScore(city),
    }))
    .sort((a, b) => a.comfortScore - b.comfortScore);

  return (
    <div className="recommendation">
      <h2>Recommended Destination</h2>
      <p>
        Based on current weather, the best city to visit is{' '}
        <strong>{sortedCities[0].name}</strong> with a comfort score of{' '}
        {sortedCities[0].comfortScore.toFixed(2)}.
      </p>
    </div>
  );
};

export default Recommendations;
