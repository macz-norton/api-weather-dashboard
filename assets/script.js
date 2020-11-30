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

// When user clicks `citySearch` button
$("#citySearch").on("click", function(event) {
    event.preventDefault();

    // Collect `userInput`
    var userCity = $(".userInput").val().trim();

    // Store `userCity` in local storage
    JSON.stringify(userCity);
    localStorage.setItem("city", userCity);

    // Get `userCitySaved` out of local storage
    var userCitySaved = localStorage.getItem("city");

    // Create and prepend a `cityButton` to save city searches
    var cityButton = $("<button>");
    cityButton.attr("type", "button");
    cityButton.addClass("btn btn-light btn-lg btn-block");
    cityButton.attr("data-city", userCitySaved);
    cityButton.text(userCitySaved);
    $(".searchList").prepend(cityButton);

});

function getCurrentWeather() {

    var city = "";
    var APIkey = "d5fdfbd079865261527ef46dccc3c543";
    var queryCurrentWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey;
    
    $.ajax({
        url: queryCurrentWeather,
        method: "GET"
    }).then(function(response) {

        var currentCity = $("<h2>").addClass("card-title").text(response.name + response.dt);
        var currentWeatherIcon = $("<i>").addClass("card-text").text(response.weather.icon);
        var currentTemp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp.metric + "F");
        var currentHumidity = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + " %");
        var currentWindSpeed = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + " MPH");
    })

}

function getOneCall() {

    var cityLat =
    var cityLong = 
    var APIkey = "";
    var queryOneCall = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&appid=" + APIkey;

    $.ajax({
        url: queryOneCall,
        method: "GET"
    }).then(function(response) {

        var currentUVIndex = $("<p>").addClass("card-text").text("UV Index: " + response.current.uvi);
        var fiveDayWeather = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + data.weather.icon + ".png")
        var fiveDayTemp = $("<p>").addClass("card-text").text("Temp: " + response.daily.temp.day.metric);
        var fiveDayHumidity = $("<p>").addClass("card-text").text("Humidity: " + response.daily.humidity);
    });
}