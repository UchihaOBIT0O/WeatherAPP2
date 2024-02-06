import React, { useState } from "react";
import styles from "../styles/Weather.module.css";
import { LinearProgress } from "@mui/material";
import Button from "@mui/material/Button";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { NavLink } from "react-router-dom";

const API_KEY = "84a37ac9b852577cdbd332f286a44407";

function Weather() {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);

  function handleLogout() {
    signOut(auth)
      .then(() => {
        localStorage?.removeItem("errorCode");
        localStorage?.removeItem("errorCodeLogin");
        localStorage?.removeItem("errorMessage");
        localStorage?.removeItem("errorMessageLogin");
      })
      .catch((error) => console.error(error));
  }

  function handleLocationClick() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }
  }

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLocation({ latitude, longitude });
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        setWeather(data);
      })
      .catch((error) => console.log(error));
  }

  function error() {
    console.log("Unable to retrieve your location");
  }

  return (
    <div className={styles.main}>
      {!location ? (
        <div className={styles.initialPage}>
          <h1>Get Weather Details Near You</h1>
          <Button
            className="start"
            onClick={handleLocationClick}
            variant="contained"
            disableElevation
          >
            GET WEATHER
          </Button>
        </div>
      ) : null}
      {location && !weather ? (
        <>
          <LinearProgress color="secondary" />
          <LinearProgress color="success" />
          <LinearProgress color="inherit" />
        </>
      ) : null}
      {weather && (
        <>
          <div className={styles.title}>
            <h1>
              Current Weather in {weather.name}, {weather.sys.country}.
            </h1>
            {Number(weather.main.temp) > 20 ? (
              <img
                src="src\assets\weatherIcons\cloudy-day-2.svg"
                alt="cloudy"
              />
            ) : (
              <img src="src\assets\weatherIcons\snowy-2.svg" alt="cloudy" />
            )}
          </div>

          <div className={styles.details}>
            <div className={styles.hero}>
              <span>Detailed Weather Conditions at Your Location</span>
              <div>
                <img
                  src="src\assets\weatherIcons\cloudy-day-1.svg"
                  alt="cloudy"
                />
                <span>Temperature: {weather.main.temp} ℃</span>
              </div>
            </div>
            <div className={styles.leftContainer}>
              <div>
                <img
                  src="src\assets\weatherIcons\cloudy-day-3.svg"
                  alt="cloudy"
                />
                <span>Minumum Temperature: {weather.main.temp_min} ℃</span>
              </div>
              <div>
                <img
                  src="src\assets\weatherIcons\cloudy-day-2.svg"
                  alt="cloudy"
                />
                <span>Maximum Temperature: {weather.main.temp_max} ℃</span>
              </div>
              <div>
                <img
                  src="src\assets\weatherIcons\cloudy-day-2.svg"
                  alt="cloudy"
                />
                <span>Temperature Feels Like: {weather.main.feels_like} ℃</span>
              </div>
              <div>
                <img
                  src="src\assets\weatherIcons\cloudy-day-2.svg"
                  alt="cloudy"
                />
                <span>Atmospheric Pressure: {weather.main.pressure} hPa</span>
              </div>
              <div>
                <img
                  src="src\assets\weatherIcons\cloudy-day-2.svg"
                  alt="cloudy"
                />
                <span>Humidiy Rate: {weather.main.humidity} %</span>
              </div>
            </div>
            <div className={styles.rightContainer}>
              <div>
                <img
                  src="src\assets\weatherIcons\cloudy-day-2.svg"
                  alt="cloudy"
                />
                <span>Visibility: {weather.visibility} m</span>
              </div>
              <div>
                <img
                  src="src\assets\weatherIcons\cloudy-day-2.svg"
                  alt="cloudy"
                />
                <span>Wind Speed: {weather.wind.speed} km/h</span>
              </div>
              <div>
                <img
                  src="src\assets\weatherIcons\cloudy-day-1.svg"
                  alt="cloudy"
                />
                <span>Wind Degree: {weather.wind.deg}</span>
              </div>
              <div>
                <img
                  src="src\assets\weatherIcons\cloudy-day-2.svg"
                  alt="cloudy"
                />
                <span>Wind Gust: {weather.wind.gust}</span>
              </div>
            </div>
            <div className={styles.logout}>
              <NavLink className={styles.logoutNavLinka} to="/">
                <Button
                  onClick={handleLogout}
                  variant="contained"
                  disableElevation
                >
                  LOGOUT
                </Button>
              </NavLink>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Weather;

// {!location ? (
//   <button onClick={handleLocationClick}>Get Location</button>
// ) : null}
// {location && !weather ? <p>Loading weather data...</p> : null}
// {weather ? (
//   <div>
//     <p>Location: {weather.name}</p>
//     <p>Temperature: {weather.main.temp} °C</p>
//     <p>Weather: {weather.weather[0].description}</p>
//   </div>
// ) : null}
