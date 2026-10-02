const getWeather = async (location) => {
    console.log("In getWeather");
    console.log("Location:", location);

    const apiKey = process.env.WEATHER_API_KEY;

    if (!apiKey) {
        throw new Error("WEATHER_API_KEY is not configured");
    }

    const url =
        `https://api.weatherapi.com/v1/forecast.json` +
        `?key=${apiKey}` +
        `&q=${encodeURIComponent(location)}` +
        `&days=7` +
        `&aqi=no` +
        `&alerts=no`;

    console.log("Fetching weather data...");

    try {
        const response = await fetch(url);

        console.log("Weather fetch completed");
        console.log("Weather status:", response.status);
        console.log("Weather status text:", response.statusText);

        if (!response.ok) {
            const errorText = await response.text();

            console.error("WEATHER API ERROR:", errorText);

            throw new Error(
                `Weather API returned ${response.status}: ${errorText}`
            );
        }

        const data = await response.json();

        console.log("Weather JSON received");

        return {
            current: {
                temperature: data.current.temp_c,
                humidity: data.current.humidity,
                windSpeed: data.current.wind_kph,
                condition: data.current.condition.text
            },

            dailyData: data.forecast.forecastday
        };

    } catch (error) {
        console.error("WEATHER ERROR:", error);
        throw error;
    }
};


const getWeatherCondition = async (location) => {

    const weatherData = await getWeather(location);

    const weather = weatherData.dailyData;

    const conditions = [];


    // -----------------------------
    // RAINFALL
    // -----------------------------

    let maxRain = 0;
    let rainIndex = 0;

    weather.forEach((day, index) => {

        const rain = day.day.totalprecip_mm;

        if (rain > maxRain) {
            maxRain = rain;
            rainIndex = index;
        }
    });


    if (maxRain > 20) {

        conditions.push({
            condition: "heavy_rain",
            date: weather[rainIndex].date,
            value: maxRain
        });

    } else if (maxRain >= 5) {

        conditions.push({
            condition: "moderate_rain",
            date: weather[rainIndex].date,
            value: maxRain
        });

    } else if (maxRain > 0) {

        conditions.push({
            condition: "light_rain",
            date: weather[rainIndex].date,
            value: maxRain
        });
    }


    // -----------------------------
    // RAIN PROBABILITY
    // -----------------------------

    let maxRainProbability = 0;
    let probabilityIndex = 0;

    weather.forEach((day, index) => {

        const probability = day.day.daily_chance_of_rain;

        if (probability > maxRainProbability) {
            maxRainProbability = probability;
            probabilityIndex = index;
        }
    });


    if (maxRainProbability >= 80) {

        conditions.push({
            condition: "high_rain_probability",
            date: weather[probabilityIndex].date,
            value: maxRainProbability
        });

    } else if (maxRainProbability >= 60) {

        conditions.push({
            condition: "rain_expected",
            date: weather[probabilityIndex].date,
            value: maxRainProbability
        });
    }


    // -----------------------------
    // HIGHEST TEMPERATURE
    // -----------------------------

    let highestTemperature = -Infinity;
    let highestTempIndex = 0;

    weather.forEach((day, index) => {

        const temperature = day.day.maxtemp_c;

        if (temperature > highestTemperature) {
            highestTemperature = temperature;
            highestTempIndex = index;
        }
    });


    if (highestTemperature >= 35) {

        conditions.push({
            condition: "very_high_temperature",
            date: weather[highestTempIndex].date,
            value: highestTemperature
        });

    } else if (highestTemperature >= 32) {

        conditions.push({
            condition: "high_temperature",
            date: weather[highestTempIndex].date,
            value: highestTemperature
        });
    }


    // -----------------------------
    // LOWEST TEMPERATURE
    // -----------------------------

    let lowestTemperature = Infinity;
    let lowestTempIndex = 0;

    weather.forEach((day, index) => {

        const temperature = day.day.mintemp_c;

        if (temperature < lowestTemperature) {
            lowestTemperature = temperature;
            lowestTempIndex = index;
        }
    });


    if (lowestTemperature < 15) {

        conditions.push({
            condition: "very_low_temperature",
            date: weather[lowestTempIndex].date,
            value: lowestTemperature
        });

    } else if (lowestTemperature < 20) {

        conditions.push({
            condition: "low_temperature",
            date: weather[lowestTempIndex].date,
            value: lowestTemperature
        });

    } else {

        conditions.push({
            condition: "normal_temperature",
            date: weather[0].date,
            value: lowestTemperature
        });
    }


    return conditions;
};


module.exports = {
    getWeather,
    getWeatherCondition
};