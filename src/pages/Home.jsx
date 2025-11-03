import React, { useState, useEffect, useRef } from "react";
import "../layouts/RootLayout.css";
import WeatherDisplay from "../components/WeatherDisplay";
import { fetchWeatherData, fetchLocationSuggestions } from "../services/weatherApi";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Auto-complete khi người dùng gõ
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length < 2) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      try {
        const data = await fetchLocationSuggestions(searchQuery);
        setSuggestions(data);
        setShowSuggestions(true);
        setSelectedIndex(-1);
      } catch {
        // Silently fail for suggestions
        setSuggestions([]);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  // Đóng suggestions khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError(null);
    setShowSuggestions(false);

    try {
      const data = await fetchWeatherData(searchQuery);
      setWeatherData(data);
    } catch (err) {
      setError(err.message || "An error occurred while fetching weather data");
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(`${suggestion.name}, ${suggestion.region}, ${suggestion.country}`);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    
    // Tự động tìm kiếm sau khi chọn suggestion
    setTimeout(() => {
      const form = document.querySelector('.d-flex');
      if (form) {
        form.requestSubmit();
      }
    }, 100);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleSuggestionClick(suggestions[selectedIndex]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }
  };

  return (
    <div className="rootLayout">
      <div className="rootHeader">
        <form className="d-flex" onSubmit={handleSearch}>
          <div className="search-container">
            <input
              ref={inputRef}
              className="form-control me-2"
              type="search"
              placeholder="Search city..."
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.length >= 2 && setShowSuggestions(true)}
              onKeyDown={handleKeyDown}
            />
            {showSuggestions && suggestions.length > 0 && (
              <div ref={suggestionsRef} className="suggestions-dropdown">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className={`suggestion-item ${index === selectedIndex ? 'selected' : ''}`}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <div className="suggestion-name">{suggestion.name}</div>
                    <div className="suggestion-location">
                      {suggestion.region}, {suggestion.country}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button className="btn btn-outline-success" type="submit" disabled={loading}>
            {loading ? "Loading..." : "Search"}
          </button>
        </form>
      </div>
      
      <div className="main-content">
        <WeatherDisplay error={error} weatherData={weatherData} />
      </div>
    </div>
  );
};

export default Home;

