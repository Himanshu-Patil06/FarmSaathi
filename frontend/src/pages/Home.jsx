import { Link } from "react-router-dom";
import "./Home.css";
import Navbar from "../Components/Navbar";

function Home() {
    return (
        <div className="home-page">

            <Navbar />

            {/* HERO SECTION */}
            <section className="hero">

                <div className="hero-content">

                    <p className="hero-tagline">
                        Smart Farming, Simple Decisions
                    </p>

                    <h1>
                        Farm smarter with your
                        <span> FarmSaathi 🌱</span>
                    </h1>

                    <p className="hero-description">
                        FarmSaathi helps farmers understand their crop
                        growth and make better decisions using local
                        weather information and crop-based recommendations.
                    </p>

                </div>

                <div className="hero-image">
                    🌾
                </div>

            </section>


            {/* HOW IT HELPS */}
            <section className="features">

                <p className="section-tag">
                    FARM MANAGEMENT
                </p>

                <h2>
                    Everything you need to understand your crops
                </h2>

                <p className="section-description">
                    Keep your crop information in one place and get
                    useful information based on weather and crop growth.
                </p>


                <div className="feature-container">

                    <div className="feature-card">

                        <div className="feature-icon">
                            🌤️
                        </div>

                        <h3>
                            Weather Information
                        </h3>

                        <p>
                            View current weather conditions and upcoming
                            weather information for your location.
                        </p>

                    </div>


                    <div className="feature-card">

                        <div className="feature-icon">
                            🌱
                        </div>

                        <h3>
                            Track Your Crops
                        </h3>

                        <p>
                            Add your crops, record planting dates, and
                            follow their growth stages over time.
                        </p>

                    </div>


                    <div className="feature-card">

                        <div className="feature-icon">
                            💡
                        </div>

                        <h3>
                            Crop Recommendations
                        </h3>

                        <p>
                            Get recommendations based on your crop's
                            current growth stage and weather conditions.
                        </p>

                    </div>

                </div>

            </section>


            {/* SIMPLE PROCESS */}
            <section className="how-it-works">

                <p className="section-tag">
                    HOW IT WORKS
                </p>

                <h2>
                    Simple steps for better crop management
                </h2>

                <div className="steps">

                    <div className="step">

                        <span className="step-number">
                            01
                        </span>

                        <h3>
                            Add Your Crop
                        </h3>

                        <p>
                            Select your crop and provide its planting date.
                        </p>

                    </div>


                    <div className="step">

                        <span className="step-number">
                            02
                        </span>

                        <h3>
                            Check the Weather
                        </h3>

                        <p>
                            See weather conditions and upcoming forecasts
                            for your location.
                        </p>

                    </div>


                    <div className="step">

                        <span className="step-number">
                            03
                        </span>

                        <h3>
                            Get Recommendations
                        </h3>

                        <p>
                            Receive useful recommendations according to
                            your crop stage and weather.
                        </p>

                    </div>

                </div>

            </section>


            {/* BOTTOM MESSAGE */}
            <section className="home-footer">

                <h2>
                    Your crops. Your weather. Your FarmSaathi.
                </h2>

                <p>
                    Keep track of your crops and stay informed throughout
                    their growth.
                </p>

            </section>

        </div>
    );
}

export default Home;