const API_KEY = "9537012ad163c23b65881707cd6b61e8";

function WeatherApp() {
  const [city, setCity] = React.useState("");
  const [weather, setWeather] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const getWeather = async () => {
    const cleanedCity = city.trim();
    if (!cleanedCity) {
      alert("Please enter a city.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cleanedCity}&units=metric&appid=${API_KEY}`
      );
      const data = await res.json();
      if (data.cod === 200) {
        setWeather(data);
      } else {
        alert("City not found.");
        setWeather(null);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Failed to fetch weather.");
    } finally {
      setLoading(false);
    }
  };

  const getSuggestion = (condition) => {
    switch (condition.toLowerCase()) {
      case "rain": return "☔ Carry an umbrella.";
      case "clear": return "😎 Great day to go outside!";
      case "clouds": return "🌥 It might feel cooler today.";
      case "snow": return "❄️ Dress warmly, it's snowing!";
      case "thunderstorm": return "⚡ Stay indoors if possible!";
      default: return "🌈 Have a great day!";
    }
  };

  return (
    <div className="container">
      <h2>🌤️ Weather App</h2>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>
        {loading ? "Loading..." : "Get Weather"}
      </button>

      {weather && (
        <div className="slideshow">
          <div className="slide">
            <h3>📍 {weather.name}, {weather.sys.country}</h3>
            <p>Timezone: GMT+{weather.timezone / 3600}</p>
          </div>
          <div className="slide">
            <h3>🌡 Temperature</h3>
            <p>{weather.main.temp}°C</p>
            <p>Feels like: {weather.main.feels_like}°C</p>
          </div>
          <div className="slide">
            <h3>🌤 Weather</h3>
            <p>{weather.weather[0].main}</p>
            <p>{weather.weather[0].description}</p>
          </div>
          <div className="slide">
            <h3>💨 Wind</h3>
            <p>Speed: {weather.wind.speed} m/s</p>
          </div>
          <div className="slide">
            <h3>💡 Suggestion</h3>
            <p>{getSuggestion(weather.weather[0].main)}</p>
          </div>
        </div>
      )}
    </div>
  );
}

ReactDOM.render(<WeatherApp />, document.getElementById("root"));
