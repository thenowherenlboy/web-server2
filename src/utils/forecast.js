const request = require('request');

const forecast = (latitude, longitude, callback) => {
    // WeatherStack
    const url = `http://api.weatherstack.com/current?access_key=f3307dad82e6b58031c432ff31aefbaf&query=${latitude},${longitude}&units=f`;
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather api. Please try again later.', undefined);
        } else if (body.error) {
            callback('Cannot get weather for given location. Please check your location or try a different search.', undefined);
        } else {
            weatherObj = {
                temp: body.current.temperature,
                feelsLike: body.current.feelslike,
                description: body.current.weather_descriptions[0]
            }
            callback(undefined, weatherObj);
        }

    });
}

const forecast2 = (latitude, longitude, callback) => {
    // OpenWeatherMap
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=52582593c40aea93bc92d3d2d908bb59&units=imperial`;
    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to weather api. Please try again later.', undefined);
        } else if (response.body.cod === '400') {
            callback('Cannot get weather for given location. Please check your location or try a different search.', undefined);
        } else {
            weatherObj = {
                temp: response.body.main.temp,
                feelsLike: response.body.main.feels_like,
                description: response.body.weather[0].description,
                humidity: response.body.main.humidity
            }
            var weatherString = `Weather/sky condition: ${weatherObj.description}. Current temperature is ${weatherObj.temp}°F; it feels like ${weatherObj.feelsLike}°F. Humidity is ${weatherObj.humidity}%.`
            callback(undefined, weatherString);
        }

    });
}

module.exports = {
    forecast: forecast,
    forecast2: forecast2
}