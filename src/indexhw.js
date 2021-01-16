let apiKey = "b845e30b65afd54ed70dc17b14503f26";
let units = "metric";
var temp = 65;

document.getElementById("searchButton").onclick = searchCity;

function searchCity() {
  let city = document.getElementById("searchCity").value;
  city = city?.toLowerCase();
  showCity(city);
  document.getElementById(
    "todayCity"
  ).innerHTML = `Today in ${city.toUpperCase()}`;
  document.getElementById("dateTime").innerHTML = formatDate();
}

document.getElementById("f").onclick = function () {
  let f = Math.round(1.8 * temp + 32);
  document.getElementById("todaysTemp").innerHTML = `${f} F`;
};
document.getElementById("c").onclick = function () {
  let c = Math.round(temp);
  document.getElementById("todaysTemp").innerHTML = `${c} C`;
};

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function showCity(cityName) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  let weather = document.querySelector("#todaysTemp");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");

  temp = Math.round(response.data.main.temp);

  weather.innerHTML = `${temp} C`;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  wind.innerHTML = `Wind: ${response.data.wind.speed} km/h`;

  if (response.data.name != null) {
    let city = document.getElementById("todayCity");
    city.innerHTML = `Today in ${response.data.name}`;
  }
}

function formatDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let date = new Date();
  let currentDay = days[date.getDay()];
  let currentHour = date.getHours();
  let currentMin = date.getMinutes();
  let formattedDate = `${currentDay} ${currentHour}:${addZero(currentMin)}`;

  return formattedDate;
}

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

navigator.geolocation.getCurrentPosition(handlePosition);
