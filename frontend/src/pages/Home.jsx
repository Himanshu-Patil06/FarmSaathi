import { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <div className="home-page">

           <nav className="navbar">

    <div className="logo">
        🌾 FarmSaathi
    </div>

    <button
        className="menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
    >
        {menuOpen ? "✕" : "☰"}
    </button>

    <div className={`nav-links ${menuOpen ? "menu-open" : ""}`}>

        <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
        </Link>

        <Link to="/login" onClick={() => setMenuOpen(false)}>
            Login
        </Link>

        <Link
            to="/register"
            className="signup-btn"
            onClick={() => setMenuOpen(false)}
        >
            Sign Up
        </Link>

    </div>

</nav>

            <section className="hero">

                <div className="hero-content">

                    <h1>
                        Your Smart Farming
                        <span> Saathi 🌱</span>
                    </h1>

                    <p>
                        FarmSaathi helps farmers make better farming
                        decisions using weather information, crop stages,
                        and personalized recommendations.
                    </p>

                    <div className="hero-buttons">
                        <Link to="/register" className="primary-btn">
                            Get Started
                        </Link>

                        <Link to="/login" className="secondary-btn">
                            Login
                        </Link>
                    </div>

                </div>

                <div className="hero-image">
                    🌾
                </div>

            </section>

            <section className="features">

                <h2>What FarmSaathi Provides</h2>

                <div className="feature-container">

                    <div className="feature-card">
                        <div className="feature-icon">🌤️</div>
                        <h3>Weather Updates</h3>
                        <p>
                            Get current weather and upcoming forecast
                            information for your location.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">🌱</div>
                        <h3>Crop Management</h3>
                        <p>
                            Add your crops and keep track of their
                            planting dates and growth stages.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">💡</div>
                        <h3>Smart Recommendations</h3>
                        <p>
                            Receive useful advice based on your crop stage
                            and current weather conditions.
                        </p>
                    </div>

                </div>

            </section>

        </div>
    );
}

export default Home;