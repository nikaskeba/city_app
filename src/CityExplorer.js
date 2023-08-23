import React, { useState } from 'react';
const [errorMessage, setErrorMessage] = useState('');

function CityExplorer() {
  const [city, setCity] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [mapUrl, setMapUrl] = useState(null);

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

      // Construct the static map URL
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
      </div>
    )}
  </div>
);

}

export default CityExplorer;