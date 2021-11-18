// variables
let apiKey = "0b71a56e08e923ace97d75b3cf84952f";
let searchInputs = document.getElementById("searchInput");
let searchedInputsList = document.getElementById("searchedList");
let searchedValue = document.getElementById("searched");
let searchButton = document.getElementById("button");
let searchedCities = [];


// save user inputs to local storage when search button is clicked
  function saveUserInputs(event) {
    // stop form from submitting
    event.preventDefault();
    // creating a saved cities object to push into an array for storage
    let savedCities = {
        city: searchedValue.value
    };
    // push user input values into searchedCities array
    searchedCities.push(savedCities);

    // save this array full of user input-saved objects to local storage
    localStorage.setItem("SearchedCitiesFromUser", JSON.stringify(searchedCities));
};

// add event listeners 
searchButton.addEventListener("click", saveUserInputs);

