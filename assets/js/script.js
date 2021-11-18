// variables
let apiKey = "0b71a56e08e923ace97d75b3cf84952f";
let searchInputs = document.getElementById("searchInput");
let searchedInputsList = document.getElementById("searchedList");
let searchedValue = document.getElementById("searched");
let searchButton = document.getElementById("button");
// save user inputs to local storage

searchButton.addEventListener("click", function (event) {
    event.preventDefault();
    localStorage.setItem("city", searchedValue.value);
});


