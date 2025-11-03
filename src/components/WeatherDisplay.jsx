import React from "react";

const WeatherDisplay = ({ error, weatherData }) => {
  if (error) {
    return (
      <div className="error-message">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!weatherData) {
    return null;
  }

  return (
    <div className="weather-info">
      <div className="location-info">
        <h2>{weatherData.location.name}</h2>
        <p>{weatherData.location.region}, {weatherData.location.country}</p>
        <p className="localtime">{weatherData.location.localtime}</p>
      </div>

      <div className="weather-main">
        <div className="temperature">
          <div className="temp-value">
            {weatherData.current.temp_c}°C / {weatherData.current.temp_f}°F
          </div>
          <div className="feels-like">
            Feels like {weatherData.current.feelslike_c}°C / {weatherData.current.feelslike_f}°F
          </div>
        </div>

        <div className="condition">
          <img 
            src={`https:${weatherData.current.condition.icon}`} 
            alt={weatherData.current.condition.text}
            className="weather-icon"
          />
          <p className="condition-text">{weatherData.current.condition.text}</p>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-label">Wind:</span>
          <span className="detail-value">
            {weatherData.current.wind_kph} km/h ({weatherData.current.wind_dir})
          </span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Humidity:</span>
          <span className="detail-value">{weatherData.current.humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Pressure:</span>
          <span className="detail-value">{weatherData.current.pressure_mb} mb</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Visibility:</span>
          <span className="detail-value">{weatherData.current.vis_km} km</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Cloud:</span>
          <span className="detail-value">{weatherData.current.cloud}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">UV Index:</span>
          <span className="detail-value">{weatherData.current.uv}</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
