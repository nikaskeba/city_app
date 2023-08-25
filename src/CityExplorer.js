import React, { useState } from 'react';
import axios from 'axios';

function CityExplorer() {
  const [city, setCity] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [mapUrl, setMapUrl] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
const [movies, setMovies] = useState([]);

  const [latestWeather, setLatestWeather] = useState(null);
const getLatestWeatherData = async (lat, lon) => {
  try {
    const weatherEndpoint = `https://exquisite-starlight-bb4f7d.netlify.app/.netlify/functions/getWeather?lat=${lat}&lon=${lon}`;
    const { data } = await axios.get(weatherEndpoint);

    if (!data) {
      throw new Error('Failed to fetch weather data.');
    }

    const weatherData = data.data[0];
    setLatestWeather(weatherData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};
const getMoviesFilmedInCity = async () => {
  try {
    const movieEndpoint = `https://exquisite-starlight-bb4f7d.netlify.app/.netlify/functions/getMovies?city=${city}`;
    const response = await axios.get(movieEndpoint);
    ...
  } catch (error) {
    console.error("Error fetching movies:", error);
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
 getLatestWeatherData(lat, lon);
        // Construct the static map URL
        const staticMapEndpoint = 'https://maps.locationiq.com/v3/staticmap';
        const staticMapUrl = `${staticMapEndpoint}?key=${apiKey}&center=${lat},${lon}&zoom=13&size=400x400&format=png`;
        setMapUrl(staticMapUrl);
  

        // Fetch top 5 movies filmed in the city

    await getMoviesFilmedInCity();
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

     

      {latitude && longitude && (
        <div>
          <p>Latitude: {latitude}</p>
          <p>Longitude: {longitude}</p>
          {mapUrl && <img src={mapUrl} alt="Location Map" />}

        </div>

      )}
         {latestWeather && (
      <div>
        <h3>Weather in {city}</h3>
        <p>Temperature: {latestWeather.temp}°C</p>
        <p>Description: {latestWeather.weather.description}</p>

      </div>
    )}
 {movies && movies.length > 0 && (
      <div>
        <h3>Top 5 Movies Filmed in {city}</h3>
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      </div>
    )}
  
    <div>
       {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}</div>
    </div>
  );
}

export default CityExplorer;

