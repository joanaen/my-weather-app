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

function displayForecast(response) {
  let forecastElement = document.querySelector("#weatherForecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col">
      <span class="forecastContainer">
                <span class="dayForecast"> ${day} </span>
                <div class="mondayicon">
                  <img
                    class="forecastIcon"
                    img
                    src="icons/rain-icon.png"
                    width="80px"
                    height="85px"
                  />
                </div>
                <div class ="minmax-temp">
                <span class="maxtemp"> 17º </span>
                <span class="smallvl"></span>
                <span class="mintemp"> 14º </span>
                </div>
              </span>
              </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "8161b4309ee03faae957729ba7104797";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
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
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  let descriptionElement = document.querySelector("#currentInfo");
  let sentence = response.data.weather[0].description;
  descriptionElement.innerHTML =
    sentence.charAt(0).toUpperCase() + sentence.slice(1);

  document.querySelector("#pressure").innerHTML =
    response.data.main.pressure + "&nbsp;hPa";
  document.querySelector("#humidity").innerHTML =
    response.data.main.humidity + "%";
  document.querySelector("#wind").innerHTML =
    Math.round(response.data.wind.speed) + "km/h";

  getForecast(response.data.coord);
}

displayForecast();

function search(city) {
  let apiKey = "8161b4309ee03faae957729ba7104797";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#citySearch").value;
  search(citySearch.value);
}

let searchForm = document.querySelector("#searchCity");
searchForm.addEventListener("submit", handleSubmit);
