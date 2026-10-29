const fetchWeatherData = () => {
  fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=-1.2864&longitude=36.8172&current=temperature_2m,relative_humidity_2m,wind_speed_10m",
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      return response.json();
    })
    .then((data) => {
      const temperature =
        `${data.current.temperature_2m} ${data.current_units.temperature_2m}` ||
        23;
      const humidity =
        `${data.current.relative_humidity_2m} ${data.current_units.relative_humidity_2m}` ||
        300;
      const wind_speed =
        `${data.current.wind_speed_10m} ${data.current_units.wind_speed_10m}` ||
        340;
      const weatherData = [temperature, humidity, wind_speed];
      console.log(weatherData);
      const weatherContainerDiv = document.querySelector("section");
      const pElements = weatherContainerDiv.querySelectorAll("div");
      pElements.forEach((pElement, index) => {
        pElement.textContent = weatherData[index];
      });
    })
    .catch((error) => console.log(error));
};
fetchWeatherData();
