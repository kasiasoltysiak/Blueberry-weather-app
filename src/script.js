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
  console.log(response.data);
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind-speed").innerHTML = response.data.wind.speed;
}

let apiKey = "0e2e078ob6fa6c32484571t470bf53fe";
let apiUrl =
  "https://api.shecodes.io/weather/v1/current?query=" +
  "Berlin" +
  "&key=" +
  apiKey +
  "&units=metric";

axios.get(apiUrl).then(showWeather);
