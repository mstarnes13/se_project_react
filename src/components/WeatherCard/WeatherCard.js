import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import React, { useContext } from "react";

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  console.log("weather card");
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const weatherOption = weatherOptions.find((item) => {
    // console.log(item);
    return item.day === day && item.type === type;
  });

  const imageSrcUrl = weatherOption.url || "";

  return (
    <section className="weather" id="weather">
      <div className="weather__info">
        {weatherTemp}°{currentTemperatureUnit}
      </div>
      <img src={imageSrcUrl} className="weather__image" alt="weather display" />
    </section>
  );
};
export default WeatherCard;
