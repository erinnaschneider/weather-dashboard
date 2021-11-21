// variables
let apiKey = "0b71a56e08e923ace97d75b3cf84952f";
let searchInputs = document.getElementById("searchInput");
let searchedValue = document.getElementById("searched");
let searchButton = document.getElementById("button");
let searchedCities = [];
let forecastDiv = document.getElementById("5dayforecast");


// save user inputs to local storage when search button is clicked
  function saveUserInputs(event) {
    // stop form from submitting
    event.preventDefault();
    // creating a saved cities object to push into an array for storage
    let inputText = {
        city: searchedValue.value.trim()
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
    let cityList = document.createElement("div");
    cityList.innerHTML = "<p>" + inputText.city + "</p>"
       
    searchedInputsList.append(cityList);
};

// add event listeners 
searchButton.addEventListener("click", saveUserInputs);

