// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
// WHEN I open the weather dashboard
// THEN I am presented with the last searched city forecast

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

    getCurrentWeather(citySearched);

});


function getCurrentWeather(citySearched) {

    // Get `userCitySaved` out of local storage
    citySearched = localStorage.getItem("city");

    // Create and prepend a `cityListItem` to save city searches
    var cityListItem = $("<li>");
    cityListItem.addClass("list-group-item");
    cityListItem.attr("data-city", citySearched);
    cityListItem.text(citySearched);
    $(".searchList").prepend(cityListItem);

    var APIkey = "d5fdfbd079865261527ef46dccc3c543";
    var queryCurrentWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearched + "&appid=" + APIkey;

    console.log(queryCurrentWeather);

    $.ajax({
        url: queryCurrentWeather,
        method: "GET"
    }).then(function(response) {
        console.log(response.name);
        var currentSearch = $("<h2>").addClass("card-title").text(response.name + " " + (moment.unix(response.dt).format("L")));
        var currentIcon = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon + ".png");
        var currentTemp = $("<p>").addClass("card-text").text("Temperature: " + response.main.temp.metric + "F");
        var currentHumidity = $("<p>").addClass("card-text").text("Humidity: " + response.main.humidity + " %");
        var currentWindSpeed = $("<p>").addClass("card-text").text("Wind Speed: " + response.wind.speed + " MPH");
       
        $(".currentWeather").append(currentSearch, currentIcon, currentTemp, currentHumidity, currentWindSpeed);
       
        lon = response.coord.lon;
        lat = response.coord.lat;

        // getOneCall(lat, lon);

    })
}

// function getOneCall(lat, lon) {
//     var APIkey = "8355a314da7feb918a55961d626714a9";
//     var queryOneCall = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&appid=" + APIkey;

//     $.ajax({
//         url: queryOneCall,
//         method: "GET"
//     }).then(function(response) {

//         var currentUVIndex = $("<p>").addClass("card-text").text("UV Index: " + response.current.uvi);
//         var fiveDayWeather = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.weather.icon + ".png")
//         var fiveDayTemp = $("<p>").addClass("card-text").text("Temp: " + response.daily.temp.day.metric);
//         var fiveDayHumidity = $("<p>").addClass("card-text").text("Humidity: " + response.daily.humidity);
//     });
// }

