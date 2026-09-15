import { Link } from "react-router-dom";
import "./Dashboard.css"
import Navbar from "../Components/Navbar";
function Dashboard() {

    return (
        <div className="dashboard-page">

            {/* Navbar */}

           <Navbar/>

            {/* Dashboard Content */}

            <main className="dashboard-container">

                <div className="welcome-section">

                    <div>
                        <h1>
                            Hello, Farmer! 👋
                        </h1>

                        <p>
                            Here's your farming overview for today.
                        </p>
                    </div>

                    <div className="location">
                        📍 Palghar, Maharashtra
                    </div>

                </div>


                {/* Weather */}

                <section className="dashboard-grid">

                    <div className="dashboard-card weather-card">

                        <div className="card-header">

                            <h2>🌤️ Weather</h2>

                            {/* <Link to="/weather">
                                View More
                            </Link> */}

                        </div>

                        <div className="weather-main">

                            <div className="temperature">
                                28°C
                            </div>

                            <div>
                                <p>Partly Cloudy</p>
                                <small>
                                    Humidity: 76%
                                </small>
                            </div>

                        </div>

                        <p>
                            Wind: 12.4 km/h
                        </p>

                    </div>


                    {/* Crops */}

                    <div className="dashboard-card">

                        <div className="card-header">

                            <h2>🌱 My Crops</h2>

                            {/* <Link to="/my-crops">
                                View All
                            </Link> */}

                        </div>

                        <div className="Crop-cards">

                            <div className="crop-details">
                                <h3 className="crop-name">Rice</h3>
                                <p className="crop-stage"> 5 days, Seedling</p>
                            </div>

                        </div>

                        <Link
                            to="/add-crop"
                            className="dashboard-btn"
                        >
                            + Add Crop
                        </Link>

                    </div>

                </section>


                {/* Today's Condition */}

                <section className="dashboard-card condition-card">

                    <h2>
                        🌦️ Today's Condition
                    </h2>

                    <div className="condition-content">

                        <div className="condition-icon">
                            🌤️
                        </div>

                        <div>

                            <h3>
                                Partly Cloudy
                            </h3>

                            <p>
                                No significant rainfall expected today.
                            </p>

                        </div>

                    </div>

                </section>


                {/* Recommendation */}

                <section className="dashboard-card recommendation-card">

                    <div className="card-header">

                        <h2>
                            💡 Today's Recommendation
                        </h2>

                        {/* <Link to="/recommendations">
                            View All
                        </Link> */}

                    </div>

                    <div className="recommendation">

                        <span className="recommendation-icon">
                            🌱
                        </span>

                        <div>

                            <h3>
                                Crop Care Advice
                            </h3>

                            <p>
                                Check your crops regularly and monitor
                                weather conditions before farming activities.
                            </p>

                        </div>

                    </div>

                </section>

            </main>

        </div>
    );
}

export default Dashboard;