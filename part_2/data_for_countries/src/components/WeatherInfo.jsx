import { useEffect, useState } from "react";
import axios from "axios";

// show weather info for country's capital
const WeatherInfo = ({ country }) => {
  const weather_api_key = import.meta.env.VITE_WEATHER_KEY;
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&units=metric&appid=${weather_api_key}`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, [country]);

  if (!weather) return null;

  const weatherIcon = weather.weather[0].icon;
  const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

  return (
    <>
      <h2>Weather in {country.capital}</h2>
      <p>Temperature {weather.main.temp} Celsius</p>
      <img src={weatherIconUrl} alt={weather.weather[0].description}></img>
      <p>Wind: {weather.wind.speed} m/s</p>
    </>
  );
};

export default WeatherInfo;
