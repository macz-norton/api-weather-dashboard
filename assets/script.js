// Define global variables
var lat;
var lon;
var citySearched;

// When user clicks `citySearch` button
$("#citySearch").click(function(event) {
    event.preventDefault();

    // Collect `userInput`
    var userCity = $(".userInput").val().trim();

    // Store `userCity` in local storage
    JSON.stringify(userCity);
    localStorage.setItem("city", userCity);

    // Run `getCurrentWeather` to query API
    getCurrentWeather(citySearched);

});

// Function to query Current Weather API
function getCurrentWeather(citySearched) {

    // Get `userCitySaved` out of local storage
    citySearched = localStorage.getItem("city");

    // Create and prepend a `cityListItem` to save city searches
    var cityListItem = $("<li>");
    cityListItem.addClass("list-group-item");
    cityListItem.attr("data-city", citySearched);
    cityListItem.text(citySearched);
    $(".searchList").prepend(cityListItem);

    // Variables for query URL
    var APIkey = "d5fdfbd079865261527ef46dccc3c543";
    var queryCurrentWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearched + "&appid=" + APIkey;

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

function getOneCall(lat, lon) {
    var APIkey = "8355a314da7feb918a55961d626714a9";
    var queryOneCall = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&appid=" + APIkey;

    console.log(queryOneCall);

    $.ajax({
        url: queryOneCall,
        method: "GET"
    }).then(function(response) {

            var currentUVIndex = $("<p>").addClass("card-text").text("UV Index: " + response.current.uvi);
            $(".currentWeather").append(currentUVIndex);

            if (response.current.uvi < 3) {
                currentUVIndex.addClass("bg-success");
            } else if (3 <= response.current.uvi < 6) {
               currentUVIndex.addClass("bg-warning");
            } else if (6 <= response.current.uvi < 7) {
               currentUVIndex.addClass("text-orange-600");
            } else if (7 <= response.current.uvi < 11 ) {
               currentUVIndex.addClass("bg-warning");
            } else {
               currentUVIndex.addClass("text-pink-700");
            }

            for (var dayIndex = 1; dayIndex < 6; dayIndex++) {
                var fiveDayDate = $("<h4>").addClass("card-title fw-bold").text(moment.unix(response.daily[dayIndex].dt).format("L"));
                var fiveDayWeather = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.daily[dayIndex].weather[0].icon + ".png")
                var fiveDayTemp = $("<p>").addClass("card-text").text("Temp: " + response.daily[dayIndex].temp.day + " °F");
                var fiveDayHumidity = $("<p>").addClass("card-text").text("Humidity: " + response.daily[dayIndex].humidity) + "%";

                $(".dayOne").append(fiveDayDate, fiveDayWeather, fiveDayTemp, fiveDayHumidity);
            } 

    });
}

