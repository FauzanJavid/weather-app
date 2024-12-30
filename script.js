const apiKey = "700aabb5e6c3d6b70e6e6f1296600508"; // Your OpenWeather API Key

document
  .getElementById("weather-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const cityInput = document.getElementById("city-input").value.trim();
    const weatherOutput = document.getElementById("weather-output");
    const errorMessage = document.getElementById("error-message");

    // Hide previous output and errors
    weatherOutput.classList.add("hidden");
    errorMessage.classList.add("hidden");

    if (!cityInput) {
      errorMessage.innerText = "Please enter a city name.";
      errorMessage.classList.remove("hidden");
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) throw new Error("City not found!");

      const data = await response.json();
      document.getElementById("city-name").innerText = data.name;
      document.getElementById(
        "temperature"
      ).innerText = `Temperature: ${data.main.temp}°C`;
      document.getElementById(
        "description"
      ).innerText = `Description: ${data.weather[0].description}`;
      weatherOutput.classList.remove("hidden");
    } catch (error) {
      errorMessage.innerText = error.message;
      errorMessage.classList.remove("hidden");
    }
  });
