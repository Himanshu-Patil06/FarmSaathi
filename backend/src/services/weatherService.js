const { get } = require("mongoose");

const getCoordinates = async (location) => {


    const district = location;


    const url =
        `https://geocoding-api.open-meteo.com/v1/search` +
        `?name=${encodeURIComponent(district)}` +
        `&count=1` +
        `&language=en` +
        `&format=json`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("failed to find loction");

    }
    const data = await response.json();
    if (!data.results || data.results.length === 0) {
        throw new Error("Location not found");
    }
    return {
        latitude: data.results[0].latitude,
        longitude: data.results[0].longitude
    }


}

const getWeather = async (location) => {


    const { latitude, longitude } = await getCoordinates(location);
    const url = `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${latitude}` +
        `&longitude=${longitude}` +
        `&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m` +
        `&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max` +
        `&forecast_days=7` +
        `&timezone=auto`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch weather");
    }

    const data = await response.json();
    return data;


}
const getWeatherCondtion = async (location) => {
    const weatherData = await getWeather(location)


    const weather = weatherData.daily;
    ;
    const rain = weather.precipitation_sum[0]
    const rainProbability = weather.precipitation_probability_max[0];
    const maxTemp = weather.temperature_2m_max[0];
    const minTemp = weather.temperature_2m_min[0];
    const conditions = [];
    if (rain > 20) {
        conditions.push("heavy_rain");
    } else if (rain >= 5) {
        conditions.push("moderate_rain");
    } else if (rain > 0) {
        conditions.push("light_rain");
    }

    if (rainProbability >= 80) {
        conditions.push("high_rain_probability");
    } else if (rainProbability >= 60) {
        conditions.push("rain_expected");
    }


    if (maxTemp >= 35) {
        conditions.push("very_high_temperature");
    } else if (maxTemp >= 32) {
        conditions.push("high_temperature");
    } else if (minTemp < 15) {
        conditions.push("very_low_temperature");
    } else if (minTemp < 20) {
        conditions.push("low_temperature");
    } else {
        conditions.push("normal_temperature");
    }
    return conditions;

}

module.exports = { getWeatherCondtion }