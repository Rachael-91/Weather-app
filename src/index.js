function displayWeatherCondition(response) {
  console.log("API Response:", response.data);

  let temperatureElement = document.querySelector(".current-temp-value");
  let cityElement = document.querySelector(".current-city");
  let conditionElement = document.querySelector("#condition");
  let humidityElement = document.querySelector("#humidity");

  if (!temperatureElement || !cityElement || !conditionElement) {
    console.error("One or more elements were not found in the DOM.");
    return;
  }

  let temperature = Math.round(response.data.temperature.current);
  let city = response.data.city;
  let condition = response.data.condition.description;
  let humidity = response.data.temperature.humidity;

  cityElement.innerHTML = city;
  temperatureElement.innerHTML = temperature;
  conditionElement.innerHTML = condition;
  humidityElement.innerHTML = humidity;
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#form-search-bar");
  let city = searchInputElement.value.trim();

  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  let apiKey = "beeet5337ba0d42b5b6310f3e39o1452";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios
    .get(apiUrl)
    .then(displayWeatherCondition)
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      alert("Unable to fetch weather data. Please try again.");
    });
}

let searchForm = document.querySelector("#form-search");
if (searchForm) {
  searchForm.addEventListener("submit", search);
  console.log("Search form found and event listener attached.");
} else {
  console.error("Search form not found");
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}
let currentDate = new Date();

let currentDateElement = document.querySelector("#current-date");
if (currentDateElement) {
  currentDateElement.innerHTML = formatDate(currentDate);
} else {
  console.error("Element with ID #date not found");
}
