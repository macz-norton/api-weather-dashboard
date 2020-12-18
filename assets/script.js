// Define global variables
var lat;
var lon;
var userCity;
var cityListItem;
var savedCitySearch = JSON.parse(localStorage.getItem("Search History")) || [];

// When user clicks `citySearch` button
$("#citySearch").click(function(event) {
    event.preventDefault();

    // Collect `userInput`
    userCity = $(".userInput").val();

    // Store `userCity` in local storage
    localStorage.setItem("city", JSON.stringify(userCity));

    // Create and prepend a `cityListItem` to save city searches
    cityListItem = $("<button>");
    cityListItem.addClass("list-group-item");
    cityListItem.attr("data-city", userCity);
    cityListItem.text(userCity);
    $(".searchList").prepend(cityListItem);

    savedCitySearch.push(userCity);
    localStorage.setItem("Search History", JSON.stringify(savedCitySearch));

    // Run `getCurrentWeather` to query API
    getCurrentWeather(userCity);

});

$(".searchList").click(function(event) {
    event.preventDefault();

    userCity = $(this).data("city");

    // Run `getCurrentWeather` to query API
    getCurrentWeather(userCity);

});

// Function to query Current Weather API
function getCurrentWeather(userCity) {

    // Variables for query URL
    var APIkey = "d5fdfbd079865261527ef46dccc3c543";
    var queryCurrentWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&appid=" + APIkey + "&units=imperial";

    $.ajax({
        url: queryCurrentWeather,
        method: "GET"
    }).then(function(response) {

        // Create variables to store new HTML element with API response data
        var currentSearch = $("<h2>").addClass("card-title").text(response.name + " " + (moment.unix(response.dt).format("(L)")));
        var currentIcon = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon + ".png");
        var currentTemp = $("<p>").addClass("card-text").text("Temperature: " + response.main.temp + " °F");
        var currentHumidity = $("<p>").addClass("card-text").text("Humidity: " + response.main.humidity + "%");
        var currentWindSpeed = $("<p>").addClass("card-text").text("Wind Speed: " + response.wind.speed + " MPH");
       
        // Empty current weather HTML on the page
        $(".currentWeather").empty();

        // Append new variables to the HTML page
        $(".currentWeather").append(currentSearch, currentTemp, currentHumidity, currentWindSpeed);
        $(currentSearch).append(currentIcon);
       
        // Store API values for lat and lon
        lat = response.coord.lat;
        lon = response.coord.lon;

        // Call `getOneCall` function, passing in lat and lon values
        getOneCall(lat, lon);

    })
}

// Function to query One Call API
function getOneCall(lat, lon) {

    // Variables for query URL
    var APIkey = "8355a314da7feb918a55961d626714a9";
    var queryOneCall = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&appid=" + APIkey + "&units=imperial";

    $.ajax({
        url: queryOneCall,
        method: "GET"
    }).then(function(response) {

        // Create variables to store new HTML element with API response data
        var currentUVIndex = $("<p>").addClass("card-text").text("UV Index: ");
        var uvSpan = $("<span></span>").addClass("badge").text(response.current.uvi);
        // Append new variables to the HTML page
        $(".currentWeather").append(currentUVIndex);
        $(currentUVIndex).append(uvSpan)

        // If statement to add colors to HTML based on UV index scale
        if (response.current.uvi < 3) {
            uvSpan.addClass("bg-success");
        } else if (3 <= response.current.uvi < 6) {
            uvSpan.addClass("bg-warning");
        } else if (6 <= response.current.uvi < 7) {
            uvSpan.addClass("text-orange-600");
        } else if (7 <= response.current.uvi < 11 ) {
            uvSpan.addClass("bg-warning");
        } else {
            uvSpan.addClass("text-pink-700");
        }

        // For loop to create variables for five day forecast and append to the cards
        for (var dayIndex = 1; dayIndex < 6; dayIndex++) {

            // Empty current weather HTML on the page
            $(".day" + dayIndex).empty();

            var fiveDayDate = $("<h6>").addClass("card-title fw-bold").text(moment.unix(response.daily[dayIndex].dt).format("L"));
            var fiveDayWeather = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.daily[dayIndex].weather[0].icon + ".png")
            var fiveDayTemp = $("<p>").addClass("card-text").text("Temp: " + response.daily[dayIndex].temp.day + " °F");
            var fiveDayHumidity = $("<p>").addClass("card-text").text("Humidity: " + response.daily[dayIndex].humidity + "%");

            $(".day"+ dayIndex).append(fiveDayDate, fiveDayWeather, fiveDayTemp, fiveDayHumidity);
        } 

    });
}

