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

    return {
        coordinates: {
            latitude,
            longitude
        },
        current: data.current,
        daily: data.daily
    };
}

module.exports = { getWeather }