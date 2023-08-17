export const username = "Michelle Starnes";

//day
import sunny from "../images/Day/sunny.svg";
import cloudy from "../images/Day/cloudy.svg";
import fog from "../images/Day/fog.svg";
import rain from "../images/Day/rain.svg";
import snow from "../images/Day/snow.svg";
import storm from "../images/Day/storm.svg";

//night
import clear from "../images/Night/clear.svg";
import nightcloudy from "../images/Night/cloudy.svg";
import nightfog from "../images/Night/fog.svg";
import nightrain from "../images/Night/rain.svg";
import nightsnow from "../images/Night/snow.svg";
import nightstorm from "../images/Night/storm.svg";

export const latitude = 40.71427;
export const longitude = -74.00597;
export const APIkey = "f970ef09677a792031b6e402b28b0e3b";

export const weatherOptions = [
  {
    url: sunny,
    day: true,
    type: "sunny",
  },
  {
    url: cloudy,
    day: true,
    type: "cloudy",
  },
  {
    url: fog,
    day: true,
    type: "fog",
  },
  {
    url: rain,
    day: true,
    type: "rain",
  },
  {
    url: snow,
    day: true,
    type: "snow",
  },
  {
    url: storm,
    day: true,
    type: "storm",
  },
  {
    url: clear,
    day: false,
    type: "Clear sky",
  },
  {
    url: nightcloudy,
    day: false,
    type: "cloudy",
  },
  {
    url: nightfog,
    day: false,
    type: "fog",
  },
  {
    url: nightrain,
    day: false,
    type: "rain",
  },
  {
    url: nightsnow,
    day: false,
    type: "snow",
  },
  {
    url: nightstorm,
    day: false,
    type: "storm",
  },
];
