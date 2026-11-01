import API_URL from "../Api/api";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

import "./AddCrop.css";
import Notification from "../Components/Notification";
import { useLanguage } from "../LanguageContext";

function AddCrop() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [cropName, setCropName] = useState("");
  const [plantingDate, setPlantingDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [notification, setNotification] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cropName || !plantingDate) {
      alert(t("Please select crop and planting date."));
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/crop/`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify({
          cropName,
          plantingDate,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || t("Login failed"));
        return;
      }
      setNotification({
        message: t("Crop added successfully!"),
        type: "success",
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
      // Login successful
    } catch {
      setError(t("Unable to connect to server"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-crop-page">
      <Navbar />
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <main className="add-crop-container">
        <div className="add-crop-header">
          <Link to="/dashboard" className="back-link">
            {t("← Back to Dashboard")}
          </Link>

          <div className="crop-title">
            <div className="crop-icon">🌱</div>

            <div>
              <h1>{t("Add Your Crop")}</h1>
              <p>{t("Tell us about the crop you are currently growing.")}</p>
            </div>
          </div>
        </div>

        <div className="add-crop-card">
          <div className="card-heading">
            <h2>{t("Crop Details")}</h2>
            <p>
              {t("This information helps FarmSaathi provide crop-stage and weather-based advice.")}
            </p>
          </div>
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="crop">{t("Select Crop")}</label>

              <select
                id="crop"
                value={cropName}
                onChange={(e) => setCropName(e.target.value)}
                required
              >
                <option value="">{t("Select your crop")}</option>
                <option value="Rice">{t("Rice")}</option>
                <option value="Tomato">{t("Tomato")}</option>
                <option value="Chilli">{t("Chilli")}</option>
                <option value="Brinjal">{t("Brinjal")}</option>
                <option value="Wheat">{t("Wheat")}</option>
                <option value="Corn">{t("Corn")}</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="plantingDate">{t("Planting Date")}</label>

              <input
                type="date"
                id="plantingDate"
                value={plantingDate}
                onChange={(e) => setPlantingDate(e.target.value)}
                required
              />

              <small>{t("Enter the date when you planted this crop.")}</small>
            </div>

            <div className="crop-info">
              <span>💡</span>

              <p>
                {t("FarmSaathi uses your planting date to determine the current growth stage of your crop.")}
              </p>
            </div>

            <button
              type="submit"
              className="primary-btn add-crop-btn"
              disabled={loading}
            >
              {loading ? t("Adding Crop...") : t("🌱 Add Crop")}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default AddCrop;
