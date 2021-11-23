// variables
let apiKey = "0b71a56e08e923ace97d75b3cf84952f";
let searchHistory = document.getElementById("searchInput");
let searchedValue = document.getElementById("searched");
let searchButton = document.getElementById("button");
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
    localStorage.setItem("SearchedCitiesFromUser", searchedCities);
    
    // add to list div 
    let pValue = "";

    for (i = 0; i < searchedCities.length; i++) {
        pValue = pValue + searchedCities[i];
    }
    // creating child elements to put pValue inside of
    let cityList = document.createElement("li");
    cityList.innerHTML =  inputText.city;
       
    searchHistory.append(cityList);
    getCoords(userinput)

    // clear searched input 
    searchedValue.value = "";
};

function getCoords(cityname){

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}`).then(function (data){
        return data.json()
    }).then(function(res){
        getWeatherData(res)
    })
};

function getWeatherData(coordinates){
    //console.log(coordinates)
    var lat = coordinates.coord.lat;
    var lon =  coordinates.coord.lon;
    var city = coordinates.name;

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&units=imperial&appid=${apiKey}`).then(function(data){
return data.json()
    }).then(function(res){
    renderCurrentWeather(city, res.current, res.timezone)
    })
};

function renderCurrentWeather(city, weather, timezone){
    var date = dayjs().tz(timezone).format('M/D/YYYY');
    let temperature = weather.temp;
    let humidity = weather.humidity;
    let uvIndex = weather.uvi;
    let windSpeed = weather.wind_speed;
    let icon = weather.weather[0].icon;
    //city date/temp/humid/windspeed/uv

};


// add event listeners 
searchButton.addEventListener("click", saveUserInputs);

