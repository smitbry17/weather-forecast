var APIkey = "93123c14cd91010190e3bd9cf7680e3b";
var cityName = "Los Angeles";
var currentWeatherUrl =
  "https://api.openweathermap.org/data/2.5/weather?q=" +
  cityName +
  ",us&appid=" +
  APIkey +
  "&units=imperial";
var forecastUrl =
  "https://api.openweathermap.org/data/2.5/forecast?q=" +
  cityName +
  ",us&appid=" +
  APIkey +
  "&units=imperial";
fetchData();

// Variables for DOM manipulation
var searchHistory = document.querySelector("#search-history");
var citySearched;

// Checks if there are recent city searches stored in local storage
if (localStorage.getItem("cities") !== null) {
  citySearched = JSON.parse(localStorage.getItem("cities"));
  pullSearch();
} else {
  citySearched = [];
}

// Eventlistener for input field when searching city
document.addEventListener("submit", function (event) {
  event.preventDefault();

  // Update fetch URL and run API fetch
  cityName = document.querySelector("#search-field").value;
  currentWeatherUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    ",us&appid=" +
    APIkey +
    "&units=imperial";
  forecastUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    ",us&appid=" +
    APIkey +
    "&units=imperial";
  fetchData();

  // Save  city into local storage
  pushSearch();

  // Pull saved city and append to Recent Searches
  pullSearch();

  // Clear search field
  document.querySelector("#search-field").value = "";
});

// Eventlistener for displaying weather data from recent searches or clear the specific city from recent searches
searchHistory.addEventListener("click", function (event) {
  if (event.target.textContent === "") {
    var cityIndex = citySearched.indexOf(
      event.target.parentElement.textContent
    );
    var newArr = citySearched.splice(cityIndex, 1);
    localStorage.setItem("cities", JSON.stringify(citySearched));
    event.target.parentElement.remove();
  } else {
    cityName = event.target.textContent;
    currentWeatherUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      ",us&appid=" +
      APIkey +
      "&units=imperial";
    forecastUrl =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      cityName +
      ",us&appid=" +
      APIkey +
      "&units=imperial";
    fetchData();
  }
});

// Function for pushing searched city into local storage
function pushSearch() {
  citySearched.push(cityName);
  localStorage.setItem("cities", JSON.stringify(citySearched));
}

// Function for pulling city from local storage and appending to Recent Searches
function pullSearch() {
  searchHistory.innerHTML = "";
  for (var i = 0; i < citySearched.length; i++) {
    var cityBtn = document.createElement("button");
    cityBtn.setAttribute("class", "btn btn-secondary searched");
    searchHistory.append(cityBtn);
    cityBtn.textContent = citySearched[i];

    // Added close button to recent cities
    var closeBtn = document.createElement("button");
    closeBtn.setAttribute("class", "btn-close btn-close-white");
    cityBtn.append(closeBtn);
  }
}

function fetchData() {
  // Fetch current weather data
  fetch(currentWeatherUrl)
    .then(function (response) {
      if (response.status !== 200) {
        document.querySelector("#city-name").textContent =
          "CITY NOT FOUND, PLEASE TRY AGAIN";
        return;
      }
      return response.json();
    })
    .then(function (data) {
      // Fetch city name
      document.querySelector("#city-name").textContent = data.name;

      // Display current date
      var dateArr = Date().split(" ");
      var day = dateArr[0];
      var month = dateArr[1];
      var date = dateArr[2];
      var year = dateArr[3];
      document.querySelector("#current-date").textContent =
        day + ", " + month + " " + date + ", " + year;

      // Fetch current weather icon
      var iconID = data.weather[0].icon;
      var IconUrl = "https://openweathermap.org/img/wn/" + iconID + "@2x.png";
      document.querySelector("#day0img").setAttribute("src", IconUrl);

      // Fetch temperature, humidity, and wind data
      document.querySelector("#temperature").textContent = data.main.temp;
      document.querySelector("#humidity").textContent = data.main.humidity;
      document.querySelector("#wind").textContent = data.wind.speed;
    });

  // Fetch 5-day forecast weather data
  fetch(forecastUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Fetch forecast date
      var d1Date = data.list[3].dt_txt.split(" ")[0];
      document.querySelector("#day1forecast").textContent = d1Date;
      var d2Date = data.list[11].dt_txt.split(" ")[0];
      document.querySelector("#day2forecast").textContent = d2Date;
      var d3Date = data.list[19].dt_txt.split(" ")[0];
      document.querySelector("#day3forecast").textContent = d3Date;
      var d4Date = data.list[27].dt_txt.split(" ")[0];
      document.querySelector("#day4forecast").textContent = d4Date;
      var d5Date = data.list[35].dt_txt.split(" ")[0];
      document.querySelector("#day5forecast").textContent = d5Date;

      // Fetch forecast weather icon
      var d1IconID = data.list[3].weather[0].icon;
      var d1IconUrl =
        "https://openweathermap.org/img/wn/" + d1IconID + "@2x.png";
      document.querySelector("#day1img").setAttribute("src", d1IconUrl);
      var d2IconID = data.list[11].weather[0].icon;
      var d2IconUrl =
        "https://openweathermap.org/img/wn/" + d2IconID + "@2x.png";
      document.querySelector("#day2img").setAttribute("src", d2IconUrl);
      var d3IconID = data.list[19].weather[0].icon;
      var d3IconUrl =
        "https://openweathermap.org/img/wn/" + d3IconID + "@2x.png";
      document.querySelector("#day3img").setAttribute("src", d3IconUrl);
      var d4IconID = data.list[27].weather[0].icon;
      var d4IconUrl =
        "https://openweathermap.org/img/wn/" + d4IconID + "@2x.png";
      document.querySelector("#day4img").setAttribute("src", d4IconUrl);
      var d5IconID = data.list[35].weather[0].icon;
      var d5IconUrl =
        "https://openweathermap.org/img/wn/" + d5IconID + "@2x.png";
      document.querySelector("#day5img").setAttribute("src", d5IconUrl);

      // Fetch forecast temperature data
      var d1temp = data.list[3].main.temp;
      document.querySelector("#day1temp").textContent = d1temp;
      var d2temp = data.list[11].main.temp;
      document.querySelector("#day2temp").textContent = d2temp;
      var d3temp = data.list[19].main.temp;
      document.querySelector("#day3temp").textContent = d3temp;
      var d4temp = data.list[27].main.temp;
      document.querySelector("#day4temp").textContent = d4temp;
      var d5temp = data.list[35].main.temp;
      document.querySelector("#day5temp").textContent = d5temp;

      // Fetch forecast humidity data
      var d1humid = data.list[3].main.humidity;
      document.querySelector("#day1humid").textContent = d1humid;
      var d2humid = data.list[11].main.humidity;
      document.querySelector("#day2humid").textContent = d2humid;
      var d3humid = data.list[19].main.humidity;
      document.querySelector("#day3humid").textContent = d3humid;
      var d4humid = data.list[27].main.humidity;
      document.querySelector("#day4humid").textContent = d4humid;
      var d5humid = data.list[35].main.humidity;
      document.querySelector("#day5humid").textContent = d5humid;

      // Fetch forecast wind data
      var d1wind = data.list[3].wind.speed;
      document.querySelector("#day1wind").textContent = d1wind;
      var d2wind = data.list[11].wind.speed;
      document.querySelector("#day2wind").textContent = d2wind;
      var d3wind = data.list[19].wind.speed;
      document.querySelector("#day3wind").textContent = d3wind;
      var d4wind = data.list[27].wind.speed;
      document.querySelector("#day4wind").textContent = d4wind;
      var d5wind = data.list[35].wind.speed;
      document.querySelector("#day5wind").textContent = d5wind;
    });
}
