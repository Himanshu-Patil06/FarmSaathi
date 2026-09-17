import API_URL from "../Api/api";
import { useEffect, useState } from "react";
import "./WeatherSection.css";
const WeatherSection = () => {

    const [weather, setWeather] = useState(null); 
    const [loading, setLoading] = useState(true);
    const getWeather = async () => {
        try {
            const response = await fetch(`${API_URL}/weather`, {
                method: "GET",
                credentials: "include"
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to get weather");
            }

            setWeather(data);

        } catch (error) {
            console.error("Weather error:", error);
        }finally {
                setLoading(false);
            }
    };
    useEffect(() => {
      getWeather();
    }, [])
    
     if (loading) {
        return <h2>Loading...</h2>;
    }
    

    
  const{ temperature,humidity,windSpeed,condition }=weather.current
    

    return (
        <div className="weather-card">

            <div className="weather-main">

                <div className="temperature">
                    {temperature}°C
                </div>

                <div className="weather-condition">
                    <span>{condition}</span>
                </div>

            </div>


            <div className="weather-details">

                <div className="weather-detail">
                    <span className="detail-icon">💧</span>

                    <div>
                        <small>Humidity</small>
                        <strong>{humidity}</strong>
                    </div>
                </div>


                <div className="weather-detail">
                    <span className="detail-icon">💨</span>

                    <div>
                        <small>Wind</small>
                        <strong>{windSpeed}</strong>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default WeatherSection;