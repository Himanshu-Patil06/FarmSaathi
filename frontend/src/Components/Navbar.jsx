import API_URL from "../Api/api";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useEffect } from "react";
import Notification from "./Notification";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "../LanguageContext";

const Navbar = () => {
  const { t } = useLanguage();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const [notification, setNotification] = useState(null);

  const closeMenu = () => {
    setMenuOpen(false);
  };

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

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_URL}/users/logout`, {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Logout failed");
      }
      setNotification({
        message: t("Logout successful!"),
        type: "success",
      });

      setUser(null);
      closeMenu();

      // Go to login page
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="navbar">
      {/* Logo */}

      <Link to="/" className="logo" onClick={closeMenu}>
        🌾 FarmSaathi
      </Link>

      {/* Mobile Menu Button */}

      <button
        className="menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={t("Toggle menu")}
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      {/* Navigation */}
      {!loading && user ? (
        <div className={`nav-links ${menuOpen ? "menu-open" : ""}`}>
          <LanguageToggle />
          <Link
            to="/"
            className={location.pathname === "/" ? "active" : ""}
            onClick={closeMenu}
          >
            {t("Home")}
          </Link>

          <Link
            to="/dashboard"
            className={location.pathname === "/dashboard" ? "active" : ""}
            onClick={closeMenu}
          >
            {t("Dashboard")}
          </Link>

          <button className="logout-btn" onClick={handleLogout}>
            {t("Logout")}
          </button>
        </div>
      ) : (
        <div className={`nav-links ${menuOpen ? "menu-open" : ""}`}>
          <LanguageToggle />
          <Link to="/" onClick={() => setMenuOpen(false)}>
            {t("Home")}
          </Link>

          <Link to="/login" onClick={() => setMenuOpen(false)}>
            {t("Login")}
          </Link>

          <Link
            to="/register"
            className="signup-btn"
            onClick={() => setMenuOpen(false)}
          >
            {t("Sign Up")}
          </Link>
        </div>
      )}

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </nav>
  );
};

export default Navbar;
