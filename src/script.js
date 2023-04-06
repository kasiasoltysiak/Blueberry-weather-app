function formatDate(now) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let date =
    days[now.getDay()] + ", " + now.getDate() + " " + months[now.getMonth()];

  let hour = now.getHours();
  if (hour < 10) {
    hour = "0" + hour;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  let displayDate = document.querySelector("#now");

  displayDate.innerHTML = hour + ":" + minutes + "<br />" + date;
}

function showWeather(response) {
  console.log(response.data);
  celsiusTemp = Math.round(response.data.temperature.current);

  document.querySelector("h1").innerHTML = response.data.city;
  document.querySelector("#temp").innerHTML = Math.round(celsiusTemp);
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind-speed").innerHTML = response.data.wind.speed;
  document
    .querySelector("#icon")
    .setAttribute("src", response.data.condition.icon_url);

  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

function displayForecast() {
  let forecast = document.querySelector("#forecast");
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  let forecastHTML = `<div class="row">`;

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    <div class="col-2">
     <div class="weather-forecast-date">${day}</div>
        <img src="https://s3.amazonaws.com/shecodesio-production/uploads/files/000/071/261/original/Untitled-2-05.png?1678652090" alt="semi-cloudy" id="icon" width="70%">
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> 18° </span>
          <span class="weather-forecast-temperature-min"> 12° </span>
        </div>
      </div>
   `;
  });

  forecastHTML = forecastHTML + `</div>`;

  forecast.innerHTML = forecastHTML;
}

function search(city) {
  let apiKey = "0e2e078ob6fa6c32484571t470bf53fe";
  let apiUrl =
    "https://api.shecodes.io/weather/v1/current?query=" +
    city +
    "&key=" +
    apiKey +
    "&units=metric";

  axios.get(apiUrl).then(showWeather);
}

function citySearch(event) {
  event.preventDefault();
  let citySearchElement = document.querySelector("#search-text-input");
  search(citySearchElement.value);
}

function showFahrenheit(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let fahrenheitTemp = Math.round((celsiusTemp * 9) / 5 + 32);
  document.querySelector("#temp").innerHTML = fahrenheitTemp;
}

function showCelsius(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  document.querySelector("#temp").innerHTML = Math.round(celsiusTemp);
}

let now = new Date();
formatDate(now);

let form = document.querySelector("#city-search");
form.addEventListener("submit", citySearch);

let celsiusTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsius);

search("Amsterdam");
displayForecast();
