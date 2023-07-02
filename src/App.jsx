import React, { useState } from 'react';
import axios from 'axios';
import { BsSearch } from 'react-icons/bs';

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState(null);

  const API_KEY = 'ba43be4bd9364f2bb31151556230207';

  const searchWeather = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${query}&days=5`
      );
      setWeather(response.data);
      setQuery('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="max-w-md mx-auto p-6">
        <h2 className="text-center text-3xl font-semibold mb-4">Weather App</h2>
        <form onSubmit={searchWeather}>
          <div className="flex items-center mb-4">
            <input
              type="text"
              placeholder="Enter city name"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border rounded-l px-4 py-2 w-full"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-r"
            >
              <BsSearch className="inline-block" /> Search
            </button>
          </div>
        </form>
        {weather && (
          <div className="bg-white rounded p-4">
            <h4 className="text-xl font-semibold mb-2">{weather.location.name}</h4>
            {weather.forecast.forecastday.map((item) => (
              <div key={item.date}>
                <p className="mb-2">
                  Date: {item.date}
                </p>
                <p>Average Temperature: {item.day.avgtemp_c}°C</p>
                <p>Max Temperature: {item.day.maxtemp_c}°C</p>
                <p>Min Temperature: {item.day.mintemp_c}°C</p>
                <p>Condition: {item.day.condition.text}</p>
                <hr className="my-4" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
