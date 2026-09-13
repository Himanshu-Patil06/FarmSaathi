function Register({ setPage, formData, handleChange, handleRegister }) {
  return (
    <div className="form-page">

      <div className="form-card register-card">

        <div className="form-logo">🌱</div>

        <h2>Create Farmer Account</h2>

        <p className="form-subtitle">
          Register with FarmSaathi
        </p>

        <form onSubmit={handleRegister}>

          <label>Full Name</label>

          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
          />

          <label>Mobile Number</label>

          <input
            type="tel"
            name="mobile"
            placeholder="Enter your mobile number"
            value={formData.mobile}
            onChange={handleChange}
            maxLength="10"
          />

          <label>Password</label>

          <input
            type="password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
          />

          <label>Village</label>

          <input
            type="text"
            name="village"
            placeholder="Enter your village"
            value={formData.village}
            onChange={handleChange}
          />

          <label>District</label>

          <input
            type="text"
            name="district"
            placeholder="Enter your district"
            value={formData.district}
            onChange={handleChange}
          />

          <label>State</label>

          <input
            type="text"
            name="state"
            placeholder="Enter your state"
            value={formData.state}
            onChange={handleChange}
          />

          <label>Preferred Language</label>

          <select
            className="language-input"
            name="language"
            value={formData.language}
            onChange={handleChange}
          >
            <option value="en">English</option>
            <option value="mr">मराठी</option>
            <option value="hi">हिंदी</option>
          </select>

          <button
            className="main-form-btn"
            type="submit"
          >
            Create Account
          </button>

        </form>

        <p className="switch-text">
          Already have an account?

          <button
            type="button"
            className="link-btn"
            onClick={() => setPage("login")}
          >
            Login
          </button>
        </p>

        <button
          type="button"
          className="back-btn"
          onClick={() => setPage("home")}
        >
          ← Back to Home
        </button>

      </div>

    </div>
  );
}

export default Register;