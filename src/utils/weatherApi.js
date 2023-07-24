//https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}

import { latitude } from "./constants";
import { longitude } from "./constants";
import { APIkey } from "./constants";

const processServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

export const getForecastWeather = () => {
  const weatherApi = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  )
    .then(processServerResponse)
    .catch((error) => {
      console.log(error);
    });
  return weatherApi;
};

export const getTemperature = (data) => {
  const main = data.main;
  const temperature = main && main.temp;
  return Math.ceil(temperature);
};
export const getCityName = (data) => {
  const cityName = data["name"];
  return cityName;
};
