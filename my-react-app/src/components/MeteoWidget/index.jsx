import { useState, useEffect } from "react";
import axios from "axios";
import { getTemperaturePercentage, getTemperatureHue } from "../../utils";

import "./style.scss";
function MeteoWidget({ city, code = "75" }) {
  const [temperature, setTemperature] = useState(null);
  const [icon, setIcon] = useState(null);

  const percent = getTemperaturePercentage(temperature);
  const hue = getTemperatureHue(percent);

  let url;
  if (import.meta.env.MODE === "production") {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
      import.meta.env.VITE_API_KEY
    }`;
  } else {
    url = import.meta.env.VITE_DEVELOPMENT_SERVER;
  }

  useEffect(() => {
    //pour React ou autre sans VITE
    // process.env.VITE_LOCAL_SERVER

    //console.log("prod: ", import.meta.env.VITE_PROD_SERVER);
    //console.log(import.meta.env.VITE_LOCAL_SERVER);

    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        if (import.meta.env.MODE === "development") {
          setTemperature(response.data.main.temp);
        } else {
          setTemperature(response.data.main.temp);
          console.log(response.data.weather[0].icon);
          setIcon(response.data.weather[0].icon);
        }
      })
      .catch((err) => console.log(err));
  }, [city]);

  if (temperature === null) {
    return <article className='meteo loading'>Chargement...</article>;
  }

  return (
    <article className='meteo'>
      <div className='meteo-container'>
        <div className='meteo-infos'>
          <h3 className='meteo-city'>{city}</h3>
          <p className='meteo-code'>{code}</p>
          {import.meta.env.MODE === "production" && (
            <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
          )}
        </div>
        <p
          className='meteo-temperature'
          style={{
            color: `hsl(${hue}, 90%, 40%)`,
          }}
        >
          {Math.round(temperature)}°
        </p>
      </div>
      <div className='meteo-thermometer'>
        <div
          className='meteo-thermometer-inside'
          style={{
            width: `${percent}%`,
            backgroundColor: `hsl(${hue}, 90%, 40%)`,
          }}
        />
      </div>
    </article>
  );
}

export default MeteoWidget;
