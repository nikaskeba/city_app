import React, { useState } from 'react';

function CityExplorer() {
  const [city, setCity] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [mapUrl, setMapUrl] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [weatherData, setWeatherData] = useState(null); // New state for weather data

  const fetchWeather = async (lat, lon) => {
    try {
      const response = await fetch(`/weather?lat=${lat}&lon=${lon}&searchQuery=${city}`);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  }

  const handleExplore = async () => {
    const searchEndpoint = 'https://us1.locationiq.com/v1/search.php'; 
    const apiKey = process.env.REACT_APP_LOCATIONIQ_API_KEY;

    try {
      const response = await fetch(`${searchEndpoint}?key=${apiKey}&q=${city}&format=json`);

      if (response.status === 401) {
        throw new Error('Unable to load. Authentication error.');
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unable to load.');
      }

      if (data && data.length > 0) {
        const lat = data[0].lat;
        const lon = data[0].lon;
        setLatitude(lat);
        setLongitude(lon);

        // Fetch weather data
        fetchWeather(lat, lon);

        const staticMapEndpoint = 'https://maps.locationiq.com/v3/staticmap';
        const staticMapUrl = `${staticMapEndpoint}?key=${apiKey}&center=${lat},${lon}&zoom=13&size=400x400&format=png`;
        setMapUrl(staticMapUrl);
      } else {
        throw new Error('No results found.');
      }

    } catch (error) {
      setErrorMessage(error.message);
      console.error("Error fetching location:", error);
    }
  };

  return (
    <div>
      <input 
        type="text" 
        value={city} 
        onChange={e => setCity(e.target.value)} 
        placeholder="Enter city or landmark..."
      />
      <button onClick={handleExplore}>Explore!</button>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {latitude && longitude && !errorMessage && (
        <div>
          <p>Latitude: {latitude}</p>
          <p>Longitude: {longitude}</p>
          {mapUrl && <img src={mapUrl} alt="Location Map" />}
          {/* Display weather data if available */}
          {weatherData && <div>
            {weatherData.map((forecast, index) => (
              <p key={index}>{forecast.date}: {forecast.description}</p>
            ))}
          </div>}
        </div>
      )}
    </div>
  );
}

export default CityExplorer;

