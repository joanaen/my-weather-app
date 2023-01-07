let now = new Date();

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
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
let day = days[now.getDay()];

let timeToday = document.querySelector("#dateToday");

timeToday.innerHTML = `${day}, ${hours}:${minutes}`;
if (day === "Wednesday") {
  timeToday.style.fontSize = "small";
}

function displayWeatherCondition(response) {
  let city = response.data.name;
  if (city.length > 15) {
    city = city.substring(0, 12) + "...";
  }
  document.querySelector("#currentCity").innerHTML = city;

  if (response.data.main.temp <= 10 && response.data.main.temp >= 0) {
    document.querySelector(
      "#temperatureNow"
    ).innerHTML = `&nbsp;&nbsp;${Math.round(response.data.main.temp)}`;
  } else {
    document.querySelector("#temperatureNow").innerHTML = `${Math.round(
      response.data.main.temp
    )}`;
  }
  if (response.data.main.temp < -1) {
    document.querySelector("#temperatureNow").style.left = "-30px";
  }

  document.querySelector("#pressure").innerHTML =
    response.data.main.pressure + "&nbsp;hPa";
  document.querySelector("#humidity").innerHTML =
    response.data.main.humidity + "%";
  document.querySelector("#wind").innerHTML =
    Math.round(response.data.wind.speed) + "km/h";
}
function search(event) {
  event.preventDefault();
  let city = document.querySelector("#citySearch").value;
  let apiKey = "2f82b2e1aade838b77682f4a7bfb86fe";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayWeatherCondition);
}

let searchForm = document.querySelector("#searchCity");
searchForm.addEventListener("submit", search);
