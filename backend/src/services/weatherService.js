const getWeatherConditionCode = (code) => {
    const conditions = {
        0: "Clear Sky",
        1: "Mainly Clear",
        2: "Partly Cloudy",
        3: "Overcast",

        45: "Fog",
        48: "Fog",

        51: "Light Drizzle",
        53: "Moderate Drizzle",
        55: "Dense Drizzle",

        61: "Light Rain",
        63: "Moderate Rain",
        65: "Heavy Rain",

        71: "Light Snow",
        73: "Moderate Snow",
        75: "Heavy Snow",

        80: "Light Rain Showers",
        81: "Moderate Rain Showers",
        82: "Heavy Rain Showers",

        95: "Thunderstorm",
        96: "Thunderstorm",
        99: "Thunderstorm"
    };

    return conditions[code] || "Unknown";
};

const getCoordinates = async (location) => {
    console.log("In getCorrdinats");

    const district = location;
    console.log("District: ", district);

    const url =
        `https://geocoding-api.open-meteo.com/v1/search` +
        `?name=${encodeURIComponent(district)}` +
        `&count=1` +
        `&language=en` +
        `&format=json`;

    try {
        console.log(" start feching coordinates ");

        const response = await fetch(url);

        console.log(" complete feching coordinates ");
        console.log("Response: ", response);
        if (!response.ok) {
            throw new Error(`Geocoding API returned ${response.status}`);
        }

        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            throw new Error("Location not found");
        }
        console.log("Coordinates: ", data.results[0].latitude, data.results[0].longitude);
        return {
            latitude: data.results[0].latitude,
            longitude: data.results[0].longitude
        };

    } catch (error) {
        console.error("GEOCODING ERROR:", error);
        throw error;
    }
};

const getWeather = async (location) => {
    console.log("In getweather");


    const { latitude, longitude } = await getCoordinates(location);
    console.log("Coordinates: ", latitude, longitude);
    const url = `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${latitude}` +
        `&longitude=${longitude}` +
        `&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m` +
        `&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max` +
        `&forecast_days=7` +
        `&timezone=auto`;
    console.log(" start feching weather data");

    const response = await fetch(url);
    console.log(" compelet feching weather data");
    if (!response.ok) {
        throw new Error("Failed to fetch weather");
    }

    const data = await response.json();
    console.log("Data: ", data);
    console.log("Current Weather: ", data.current);

    return {
        current: {
            temperature: data.current.temperature_2m,
            humidity: data.current.relative_humidity_2m,
            windSpeed: data.current.wind_speed_10m,
            condition: getWeatherConditionCode(data.current.weather_code)
        },

        dailyData: data.daily
    };
};




const getWeatherCondition = async (location) => {

    const weatherData = await getWeather(location);
    const weather = weatherData.dailyData;

    const conditions = [];


    const maxRain = Math.max(...weather.precipitation_sum);

    const rainIndex = weather.precipitation_sum.indexOf(maxRain);

    if (maxRain > 20) {

        conditions.push({
            condition: "heavy_rain",
            date: weather.time[rainIndex],
            value: maxRain
        });

    } else if (maxRain >= 5) {

        conditions.push({
            condition: "moderate_rain",
            date: weather.time[rainIndex],
            value: maxRain
        });

    } else if (maxRain > 0) {

        conditions.push({
            condition: "light_rain",
            date: weather.time[rainIndex],
            value: maxRain
        });
    }



    const maxRainProbability =
        Math.max(...weather.precipitation_probability_max);

    const probabilityIndex =
        weather.precipitation_probability_max.indexOf(maxRainProbability);

    if (maxRainProbability >= 80) {

        conditions.push({
            condition: "high_rain_probability",
            date: weather.time[probabilityIndex],
            value: maxRainProbability
        });

    } else if (maxRainProbability >= 60) {

        conditions.push({
            condition: "rain_expected",
            date: weather.time[probabilityIndex],
            value: maxRainProbability
        });
    }


    const highestTemperature =
        Math.max(...weather.temperature_2m_max);

    const highestTempIndex =
        weather.temperature_2m_max.indexOf(highestTemperature);


    if (highestTemperature >= 35) {

        conditions.push({
            condition: "very_high_temperature",
            date: weather.time[highestTempIndex],
            value: highestTemperature
        });

    } else if (highestTemperature >= 32) {

        conditions.push({
            condition: "high_temperature",
            date: weather.time[highestTempIndex],
            value: highestTemperature
        });
    }


    const lowestTemperature =
        Math.min(...weather.temperature_2m_min);

    const lowestTempIndex =
        weather.temperature_2m_min.indexOf(lowestTemperature);


    if (lowestTemperature < 15) {

        conditions.push({
            condition: "very_low_temperature",
            date: weather.time[lowestTempIndex],
            value: lowestTemperature
        });

    } else if (lowestTemperature < 20) {

        conditions.push({
            condition: "low_temperature",
            date: weather.time[lowestTempIndex],
            value: lowestTemperature
        });

    } else {

        conditions.push({
            condition: "normal_temperature",
            date: weather.time[0],
            value: lowestTemperature
        });
    }


    return conditions;
};

module.exports = { getWeather, getWeatherCondition }