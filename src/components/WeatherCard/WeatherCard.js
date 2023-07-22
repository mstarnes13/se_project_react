const weatherOptions = [
  { url: require ("../../images/Day/sunny.svg").default, day: true, type: "sunny" },
  { url: require ("../../images/Day/cloudy.svg").default, day: true, type: "cloudy" },
  { url: require ("../../images/Day/fog.svg").default, day: true, type: "fog" },
  { url: require ("../../images/Day/rain.svg").default, day: true, type: "rain" },
  { url: require ("../../images/Day/snow.svg").default, day: true, type: "snow" },
  { url: require ("../../images/Day/storm.svg").default, day: true, type: "storm" },
  { url: require ("../../images/Night/clear.svg").default, day: false, type: "clear" },
  { url: require ("../../images/Night/cloudy.svg").default, day: false, type: "cloudy" },
  { url: require ("../../images/Night/fog.svg").default, day: false, type: "fog" },
  { url: require ("../../images/Night/rain.svg").default, day: false, type: "rain" },
  { url: require ("../../images/Night/snow.svg").default, day: false, type: "snow" },
  { url: require ("../../images/Night/storm.svg").default, day: false, type: "storm" },
];

const WeatherCard = ({ day=true, type='sunny' }) => {
  console.log("weather card");
  const imageSrc = weatherOptions.filter((i) => {
    return i.day === day && i.type === type;
  });

  const imageSrcUrl = imageSrc[0].url || "";
  return (
    <section className="weather" id="weather">
      <div className="weather__info"> F</div>
      <img src={imageSrcUrl} className="weather__image" alt="sunny"/>
    </section>
  );
};
export default WeatherCard;
