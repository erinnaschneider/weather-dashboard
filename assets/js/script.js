// variables
let apiKey = "0b71a56e08e923ace97d75b3cf84952f";
let searchHistory = document.getElementById("searchInput");
let searchedValue = document.getElementById("searched");
let searchButton = document.getElementById("searchbutton");
let clearButton = document.getElementById("clearbutton");
let searchedCities = [];
let forecastDiv = document.getElementById("5dayforecast");
let allWeather = document.getElementById("weatherInfo");

dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

// save user inputs to local storage when search button is clicked
  function saveUserInputs(event) {
    // stop form from submitting
    event.preventDefault();
    var userinput = searchedValue.value.trim()
    // creating a saved cities object to push into an array for storage
    let inputText = {
        city: userinput
    };

    searchedCities.push(inputText.city);

    // save this array full of user input-saved objects to local storage
    localStorage.setItem('SearchedCitiesFromUser', searchedCities);
    
    // add to list div 
    let pValue = "";

    for (i = 0; i < searchedCities.length; i++) {
        pValue = pValue + searchedCities[i];
    }


    // creating child elements to put pValue inside of
    let cityListLi = document.createElement("li");
    let cityList = document.createElement("button");
    cityList.innerHTML =  inputText.city;
    cityList.classList = "button is-white is-normal";
    

    cityListLi.append(cityList);
    searchHistory.append(cityListLi);


    getCoords(userinput)


    
    // clear searched input 
    searchedValue.value = "";
    cityList.addEventListener("click", function() {
      getCoords(userinput);
    });
};

function getCoords(cityname){

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}`).then(function (data){
        return data.json()
    }).then(function(res){
        getWeatherData(res)
    })
};

function getWeatherData(coordinates){
    
    let lat = coordinates.coord.lat;
    let lon =  coordinates.coord.lon;
    let city = coordinates.name;

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&units=imperial&appid=${apiKey}`).then(
      function(data){
return data.json()
    }).then(function(res){
     // console.log('first resp', res)
    renderCurrentWeather(city, res.current, res.timezone)
    // }).then(function(res){
    //   console.log('second resp', res)
      fiveDayWeather(res.daily, res.timezone)  
    })
};

let fiveDayWeather = function(data) {
  //console.log('data!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', data[1].weather[0].icon)
    for (var i = 1; i < data.length - 2; i++) {
      
      console.log(data[i]);
      forecastDiv.innerHTML += `<div class="card column is-one-fifth">
      <div class="card-content">
        <div class="content">
    <div class="media">
        <div class="is-centered">
        <p class="title is-4"><figure class="image is-48x48">
        <img src='http://openweathermap.org/img/wn/${data[i].weather[0].icon}@2x.png'>
        </figure>${moment(data[i].dt, "X").format('M/D/YYYY')}</p>
        </div>
        </div>
        <p class="subtitle is-6">Temp: ${Math.round(data[i].temp.day)} \u00B0 F</p>
        <p class="subtitle is-6">Humidity: ${data[i].humidity}%</p>
        <p class="subtitle is-6">Windspeed: ${data[i].wind_speed} mph</p>
      </div>
    </div>
    </div>`
}
}

function renderCurrentWeather(city, weather, timezone){
    clearCurrentWeather(allWeather);
    clearCurrentWeather(forecastDiv);
    
    let date = dayjs().tz(timezone).format('M/D/YYYY');
    let temperature = weather.temp;
    let humidity = weather.humidity;
    let uvIndex = weather.uvi;
    let windSpeed = weather.wind_speed;
    let icon = weather.weather[0].icon;
    
    //city date/temp/humid/windspeed/uv
    //console.log(weather);

    // append current weather to weatherInfo (allWeather) div
    
    //add city name and date
    let currentSearch = document.createElement("h1");
    currentSearch.innerHTML = city + " " + date + " " + `<img src='http://openweathermap.org/img/wn/${icon}@2x.png'>`;
    allWeather.appendChild(currentSearch);
    // add temp
  let temp = document.createElement("p");
  temp.innerHTML = "Temperature: " + + Math.round(temperature) + "\u00B0 F"
  allWeather.appendChild(temp);

  // append humidity
  let humid = document.createElement("p");
  humid.innerHTML = "Humidity: " + humidity + "%";
  allWeather.appendChild(humid);
  //append uvindex
  let uv = document.createElement("p");

  if (uvIndex < 3) {
    uv.innerHTML = "UV Index: " + "<span class='green'>" + uvIndex + "</span>";
  } else {
    uv.innerHTML = "UV Index: " + "<span class='red'>" + uvIndex + "</span>";
  };

  allWeather.appendChild(uv);

  //append windspeed
  let wind = document.createElement("p");
  wind.innerHTML = "Wind speed: " + windSpeed + " mph";
  allWeather.appendChild(wind);
 
};

let clearCurrentWeather = function(data) {
    while (data.firstChild) {
        data.removeChild(data.firstChild);
    }
};


function clearSearches() {
    allWeather.innerHTML = "";
    searchHistory.innerHTML = "";
    forecastDiv.innerHTML = "";
    localStorage.removeItem('SearchedCitiesFromUser');
    saveUserInputs();
};




// add event listeners 
searchButton.addEventListener("click", saveUserInputs);
clearButton.addEventListener("click", clearSearches);
