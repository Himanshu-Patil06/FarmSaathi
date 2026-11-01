import API_URL from "../Api/api";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import Notification from "../Components/Notification";
import { states } from "../Data/locations";
import LanguageToggle from "../Components/LanguageToggle";
import { useLanguage } from "../LanguageContext";

function Register() {
  const { t, setLanguage, language } = useLanguage();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    password: "",
    village: "",
    district: "",
    state: "",
    language,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [notification, setNotification] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "language") {
      setLanguage(value);
    }
  };

  const handleStateChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/users/register`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: formData.name,
          mobile: formData.mobile,
          password: formData.password,

          location: {
            village: formData.village,
            district: formData.district,
            state: formData.state,
          },

          language: formData.language,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || t("Registration failed"));

        return;
      }
      setNotification({
        message: t("Registration successful!"),
        type: "success",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch {
      setError(t("Unable to connect to server"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <div className="auth-card register-card">
        <Link to="/" className="back-link">
          {t("← Home")}
        </Link>
        <LanguageToggle className="auth-language-toggle" />
        <div className="auth-logo">🌾</div>

        <h1>{t("Create Account")}</h1>

        <p className="auth-subtitle">{t("Join FarmSaathi")}</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleRegister}>
          {/* Name */}

          <div className="form-group">
            <label>{t("Full Name")}</label>

            <input
              type="text"
              name="name"
              placeholder={t("Enter your name")}
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Mobile */}

          <div className="form-group">
            <label>{t("Mobile Number")}</label>

            <input
              type="tel"
              name="mobile"
              placeholder={t("Enter mobile number")}
              value={formData.mobile}
              onChange={handleChange}
              pattern="[0-9]{10}"
              title={t("Please enter a valid 10-digit mobile number.")}
              maxLength="10"
              inputMode="numeric"
              required
            />
          </div>

          {/* Password */}

          <div className="form-group">
            <label>{t("Password")}</label>

            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder={t("Create password")}
                value={formData.password}
                onChange={handleChange}
                pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}"
                title={t("Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.")}
                required
              />

              <button
                type="button"
                className="show-password-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? t("Hide") : t("Show")}
              </button>
            </div>
          </div>

          {/* State */}
          <div className="form-group">
            <label>{t("State")}</label>

            <select
              name="state"
              value={formData.state}
              onChange={handleStateChange}
              required
            >
              <option value="">{t("Select State")}</option>

              {Object.keys(states).map((state) => (
                <option key={state} value={state}>
                  {t(state)}
                </option>
              ))}
            </select>
          </div>

          {/* District */}

          <div className="form-group">
            <label>{t("District")}</label>

            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
              disabled={!formData.state}
              required
            >
              <option value="">
                {formData.state ? t("Select District") : t("Select State First")}
              </option>

              {formData.state &&
                states[formData.state].map((district) => (
                  <option key={district} value={district}>
                    {t(district)}
                  </option>
                ))}
            </select>
          </div>

          {/* Village */}

          <div className="form-group">
            <label>{t("Village")}</label>

            <input
              type="text"
              name="village"
              placeholder={t("Enter village")}
              value={formData.village}
              onChange={handleChange}
              required
            />
          </div>

          {/* Language */}

          <div className="form-group">
            <label>{t("Preferred Language")}</label>

            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
            >
              <option value="mr">मराठी</option>

              <option value="hi">हिन्दी</option>

              <option value="en">English</option>
            </select>
          </div>

          <button
            type="submit"
            className="primary-btn auth-btn"
            disabled={loading}
          >
            {loading ? t("Creating Account...") : t("Create Account")}
          </button>
        </form>

        <p className="auth-footer">
          {t("Already have an account?")} <Link to="/login">{t("Login")}</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
