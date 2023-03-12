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
let now = new Date();
formatDate(now);

function showWeather(response) {
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = response.data.name + ", " + response.data.sys.country;
  let currentTemp = document.querySelector("#temp");
  currentTemp.innerHTML = Math.round(response.data.main.temp);
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  //console.log(response);
}

function citySearch(city) {
  let apiKey = "d914567196481a3501772aa91076478e";
  let apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey +
    "&units=metric";

  axios.get(apiUrl).then(showWeather);
}

function inputSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let city = searchInput.value;
  citySearch(city);
}

let form = document.querySelector("#city-search");
form.addEventListener("submit", citySearch);
