import React from 'react';

function Weather({ forecastData }) {
  if (!forecastData || forecastData.length === 0) {
    return <p>No forecast data available.</p>;
  }

  return (
    <div className="weather-container">
      <h2>Weather Forecast</h2>
      <ul>
        {forecastData.map((forecast, index) => (
          <li key={index}>
            <strong>{forecast.date}</strong>: {forecast.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Weather;