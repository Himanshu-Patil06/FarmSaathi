import API_URL from "../Api/api";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import Notification from "../Components/Notification";
import LanguageToggle from "../Components/LanguageToggle";
import { useLanguage } from "../LanguageContext";
function Login() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [notification, setNotification] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify({
          mobile,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || t("Login failed"));
        return;
      }

      setNotification({
        message: t("Login successful!"),
        type: "success",
      });

      setTimeout(() => {
        navigate("/dashboard");
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

      <div className="auth-card">
        <Link to="/" className="back-link">
          {t("← Home")}
        </Link>
        <LanguageToggle className="auth-language-toggle" />

        <div className="auth-logo">🌾</div>

        <h1>{t("Welcome Back")}</h1>

        <p className="auth-subtitle">{t("Login to your FarmSaathi account")}</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>{t("Mobile Number")}</label>

            <input
              type="tel"
              placeholder={t("Enter mobile number")}
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>{t("Password")}</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder={t("Enter password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          <button
            type="submit"
            className="primary-btn auth-btn"
            disabled={loading}
          >
            {loading ? t("Logging in...") : t("Login")}
          </button>
        </form>

        <p className="auth-footer">
          {t("Don't have an account?")} <Link to="/register">{t("Sign Up")}</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
