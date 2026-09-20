import API_URL from "../Api/api";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import "./Dashboard.css";
import WeatherSection from "../Components/WeatherSection";
import CropSection from "../Components/CropSection";
import { useEffect, useState } from "react";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      const response = await fetch(`${API_URL}/users/`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to get user");
      }

      setUser(data);
    } catch (error) {
      console.error("Error getting user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-page">
        <Navbar />
        <div className="loading-state">
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <Navbar />
      <div className="dashboard">
        {/* HEADER */}
        <div className="dashboard-header">
          <div>
            <h1>Hello, {user.user.name} 👋</h1>
            <p>Here is your farm update for today.</p>
          </div>

          <div className="location">
            <span>📍</span>
            <span>
              {user.user.location.village},{user.user.location.state}
            </span>
          </div>
        </div>

        {/* WEATHER */}
        <div className="dashboard-section">
          <div className="section-title">
            <span>🌦️</span>
            <h2>Weather</h2>
          </div>
          <WeatherSection />
        </div>

        {/* CROPS */}
        <div className="dashboard-section">
          <div className="crops-section-heading">
            <div className="section-title">
              <span>🌱</span>
              <h2>My Crops</h2>
            </div>

            <Link to="/add-crop" className="primary-btn">
              + Add Crop
            </Link>
          </div>
          {/* <CropSection /> */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
