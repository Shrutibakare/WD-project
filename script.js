const apiKey = "7d5e74e7b112e34001dc87b79a2fc7c3"; // replace with your API key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Select elements
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// 🌤 Main function
async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    // Error handling
    if (response.status === 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
      return;
    }

    const data = await response.json();

    // Update UI
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    // Change weather icon
    const condition = data.weather[0].main;

    if (condition === "Clouds") {
      weatherIcon.src = "img/clouds.png";
    } 
    else if (condition === "Clear") {
      weatherIcon.src = "img/clear.png";
    } 
    else if (condition === "Rain") {
      weatherIcon.src = "img/rain.png";
    } 
    else if (condition === "Drizzle") {
      weatherIcon.src = "img/drizzle.png";
    } 
    else if (condition === "Mist") {
      weatherIcon.src = "img/mist.png";
    }

    // Show weather
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";

  } catch (error) {
    console.log(error);
    alert("Something went wrong!");
  }
}

// 🔍 Button click
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value.trim());
});

// ⌨️ Enter key support
searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkWeather(searchBox.value.trim());
  }
});

// 🌍 Default weather on page load
window.addEventListener("load", () => {
  const defaultCity = "Kolhapur"; // change if needed
  searchBox.value = defaultCity;
  checkWeather(defaultCity);
});