import API_URL from "../Api/api";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import Notification from "../Components/Notification";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    password: "",
    village: "",
    district: "",
    state: "",
    language: "mr",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [notification, setNotification] = useState(null);


  const handleChange = (e) => {
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
        setError(data.message || "Registration failed");

        return;
      }
      setNotification({
        message: "Registration successful!",
        type: "success",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setError("Unable to connect to server");
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
        <div className="auth-logo">🌾</div>

        <h1>Create Account</h1>

        <p className="auth-subtitle">Join FarmSaathi</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleRegister}>
          {/* Name */}

          <div className="form-group">
            <label>Full Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Mobile */}

          <div className="form-group">
            <label>Mobile Number</label>

            <input
              type="tel"
              name="mobile"
              placeholder="Enter mobile number"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Village */}

          <div className="form-group">
            <label>Village</label>

            <input
              type="text"
              name="village"
              placeholder="Enter village"
              value={formData.village}
              onChange={handleChange}
              required
            />
          </div>

          {/* District */}

          <div className="form-group">
            <label>District</label>

            <input
              type="text"
              name="district"
              placeholder="Enter district"
              value={formData.district}
              onChange={handleChange}
              required
            />
          </div>

          {/* State */}

          <div className="form-group">
            <label>State</label>

            <input
              type="text"
              name="state"
              placeholder="Enter state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>

          {/* Language */}

          <div className="form-group">
            <label>Preferred Language</label>

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
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
