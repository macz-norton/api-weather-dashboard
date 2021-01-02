# API Weather Dashboard
![Last Commit](https://img.shields.io/github/last-commit/macz-norton/api-weather-dashboard)

## Description

The API Weather Dashboard uses the [OpenWeather API](https://openweathermap.org/api) to retrieve weather data for cities, runs in the browser, features dynamically updated HTML and CSS, and uses `localStorage` to store persistent data. 

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly.
```

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Tests](#tests)
* [Credits](#credits)
* [License](#license)

## Installation

No installation required.

## Usage

When you open the weather dashboard, type a city name and click the search button to see the current weather and five-day weather forecast. When you reload the page, the last stored city's weather data will populate on the page.
* Link to the deployed application: https://macz-norton.github.io/api-weather-dashboard/
* Gif that demonstrates the application's functionality:
![A user searches for a city](https://user-images.githubusercontent.com/71162422/103448317-dd5cbd00-4c4c-11eb-806a-6738a732e461.gif)

## Tests

1. When you search for a city, you are presented with current and future conditions for that city and that city is added to the search history.
2. When you view current weather conditions for that city, you are presented with the city name, the date, and icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index.
3. When you view the UV index, you are presented with a color that indicates whether the conditions are favorable, moderate, or severe.
4. When you view future weather conditions for that city, you are presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity.
5. When you click on a city in the search history, you are again presented with current and future conditions for that city.
6. When you open the weather dashboard, you are presented with the last searched city forecast.

## Credits

* [OpenWeather API](https://openweathermap.org/api)
* [jQuery API](https://api.jquery.com/)
* [Bootstrap](https://getbootstrap.com/)
* [Font Awesome](https://fontawesome.com/)
* [Google Fonts](https://fonts.google.com/)

## License

[MIT License](https://choosealicense.com/licenses/mit/)