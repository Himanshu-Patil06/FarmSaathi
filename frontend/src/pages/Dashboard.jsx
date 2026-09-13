function Dashboard({ setPage, crops }) {
  return (
    <div className="dashboard">

      {/* DASHBOARD HEADER */}
      <header className="dashboard-header">

        <div className="dashboard-logo">
          🌱 <span>FarmSaathi</span>
        </div>

        <div className="dashboard-user">
          <span>Welcome, Farmer 👨‍🌾</span>

          <button
            onClick={() => setPage("home")}
            className="logout-btn"
          >
            Logout
          </button>
        </div>

      </header>


      {/* DASHBOARD CONTENT */}
      <main className="dashboard-content">

        <div className="dashboard-title">
          <h1>Farmer Dashboard</h1>

          <p>
            Your farming information and smart assistance
          </p>
        </div>


        {/* FARMER INFORMATION */}
        <section className="dashboard-card farmer-info">

          <h2>👨‍🌾 Farmer Information</h2>

          <div className="info-grid">

            <div>
              <span>Full Name</span>
              <strong>Arjun Raut</strong>
            </div>

            <div>
              <span>Mobile Number</span>
              <strong>9876543210</strong>
            </div>

            <div>
              <span>Village</span>
              <strong>Palghar</strong>
            </div>

            <div>
              <span>District</span>
              <strong>Palghar</strong>
            </div>

            <div>
              <span>State</span>
              <strong>Maharashtra</strong>
            </div>

            <div>
              <span>Language</span>
              <strong>English</strong>
            </div>

          </div>

        </section>


        {/* WEATHER */}
        <section className="dashboard-card">

          <div className="card-header">

            <div>
              <h2>🌦️ Weather Information</h2>
              <p>Palghar, Maharashtra</p>
            </div>

            <div className="weather-temperature">
              28°C
            </div>

          </div>


          <div className="weather-grid">

            <div className="weather-item">
              <span>🌧️ Rain Probability</span>
              <strong>30%</strong>
            </div>

            <div className="weather-item">
              <span>💧 Humidity</span>
              <strong>72%</strong>
            </div>

            <div className="weather-item">
              <span>💨 Wind Speed</span>
              <strong>12 km/h</strong>
            </div>

            <div className="weather-item">
              <span>🌧️ Rainfall</span>
              <strong>2 mm</strong>
            </div>

          </div>

        </section>


        {/* MY CROPS */}
        <section className="dashboard-card">

          <div className="card-header">

            <div>
              <h2>🌾 My Crops</h2>
              <p>Track your crop growth</p>
            </div>

            <button
              className="add-crop-btn"
              onClick={() => setPage("addCrop")}
            >
              + Add Crop
            </button>

          </div>


         <div className="crop-grid">

  {crops.length === 0 ? (
    <p>No crops added yet.</p>
  ) : (
    crops.map((crop, index) => (
      <div className="crop-card" key={index}>

        <div className="crop-icon">
          🌱
        </div>

        <div className="crop-details">

          <h3>{crop.cropName}</h3>

          <p>
            Planted: {crop.plantingDate}
          </p>

          {crop.fieldSize && (
            <p>
              Field Size: {crop.fieldSize}
            </p>
          )}

          <span className="stage-badge">
            Growth Stage
          </span>

        </div>

      </div>
    ))
  )}

</div>

        </section>


        {/* WEATHER ALERT */}
        <section className="dashboard-card alert-card">

          <h2>⚠️ Weather Alerts</h2>

          <div className="alert">

            <span className="alert-icon">
              🌧️
            </span>

            <div>

              <h3>Rain Expected</h3>

              <p>
                Rain is possible today. Check field drainage
                and avoid unnecessary irrigation.
              </p>

            </div>

          </div>

        </section>


        {/* SMART RECOMMENDATIONS */}
        <section className="dashboard-card recommendation-card">

          <h2>💡 Smart Recommendations</h2>

          <div className="recommendation">

            <span className="recommendation-icon">
              🌱
            </span>

            <div>

              <h3>Rice — Vegetative Stage</h3>

              <p>
                Monitor crop growth and maintain suitable
                irrigation according to current weather
                conditions.
              </p>

            </div>

          </div>


          <div className="recommendation">

            <span className="recommendation-icon">
              🌧️
            </span>

            <div>

              <h3>Weather Precaution</h3>

              <p>
                Rain is expected. Check drainage around
                your field and monitor for excess water.
              </p>

            </div>

          </div>

        </section>

      </main>


      <footer className="dashboard-footer">
        © 2026 FarmSaathi • Smart Farming Assistance
      </footer>

    </div>
  );
}

export default Dashboard;