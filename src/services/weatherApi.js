console.log("VITE_WEATHER_API_KEY =", import.meta.env.VITE_WEATHER_API_KEY);
console.log("All envs =", import.meta.env);

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
if (!API_KEY) {
  // Provide a clear error early if the API key is not configured
  // Avoid making network requests with an undefined key
  throw new Error(
    "Missing VITE_WEATHER_API_KEY. Create a .env file at project root with VITE_WEATHER_API_KEY=your_key and restart the dev server."
  );
}
const API_URL = `https://api.weatherapi.com/v1/current.json`;
const SEARCH_API_URL = `https://api.weatherapi.com/v1/search.json`;


/**
 * Fetches current weather data for a given location
 * @param {string} query - Location query string
 * @returns {Promise<Object>} Weather data
 */
export const fetchWeatherData = async (query) => {
  const response = await fetch(
    `${API_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&aqi=no`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  return response.json();
};

/**
 * Fetches location suggestions for autocomplete
 * @param {string} query - Search query string
 * @returns {Promise<Array>} Array of location suggestions
 */
export const fetchLocationSuggestions = async (query) => {
  const response = await fetch(
    `${SEARCH_API_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    return [];
  }

  return response.json();
};

