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
    const temperature = `${data.current.temperature_2m} ${data.current_units.temperature_2m}`;
    const humidity = `${data.current.relative_humidity_2m} ${data.current_units.relative_humidity_2m}`;
    const wind_speed = `${data.current.wind_speed_10m} ${data.current_units.wind_speed_10m}`;
    const weather_data = [temperature, humidity, wind_speed];
    const weatherContainerDiv = document.createElement("div");
    weather_data.forEach((entry) => {
      const pElement = document.createElement("p");
      pElement.textContent = entry;
      weatherContainerDiv.appendChild(pElement);
    });
    document.body.appendChild(weatherContainerDiv);
  })
  .catch((error) => console.log(error));
