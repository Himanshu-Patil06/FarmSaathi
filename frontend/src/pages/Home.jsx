function Home({ setPage }) {
  return (
    <div className="app">

      <header className="header">
        <div className="logo">
          🌱 <span>FarmSaathi</span>
        </div>

        <div className="language">
          <select>
            <option value="en">English</option>
            <option value="mr">मराठी</option>
            <option value="hi">हिंदी</option>
          </select>
        </div>
      </header>

      <main className="hero">

        <div className="hero-content">

          <div className="farmer-icon">
            🌾
          </div>

          <h1>
            Welcome to <span>FarmSaathi</span>
          </h1>

          <p className="subtitle">
            Smart farming assistance for better decisions,
            better crops and a better future.
          </p>

          <div className="buttons">

            <button
              className="login-btn"
              onClick={() => setPage("login")}
            >
              Farmer Login
            </button>

            <button
              className="register-btn"
              onClick={() => setPage("register")}
            >
              Create Account
            </button>

          </div>

        </div>

        <div className="features">

          <div className="feature-card">
            <div className="feature-icon">🌦️</div>

            <h3>Weather Information</h3>

            <p>
              Get weather information based on your location.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🌱</div>

            <h3>Crop Management</h3>

            <p>
              Manage your crops and track their growth stages.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💡</div>

            <h3>Smart Recommendations</h3>

            <p>
              Get simple farming suggestions based on crop
              stage and weather.
            </p>
          </div>

        </div>

      </main>

      <footer>
        <p>
          © 2026 FarmSaathi • Community-Based Smart Farming Assistance
        </p>
      </footer>

    </div>
  );
}

export default Home;