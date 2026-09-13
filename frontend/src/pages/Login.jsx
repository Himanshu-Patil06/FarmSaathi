function Login({ setPage, handleLogin }) {
  return (
    <div className="form-page">

      <div className="form-card">

        <div className="form-logo">🌱</div>

        <h2>Farmer Login</h2>

        <p className="form-subtitle">
          Welcome back to FarmSaathi
        </p>

        <form onSubmit={handleLogin}>

          <label>Mobile Number</label>

          <input
            type="tel"
            placeholder="Enter your mobile number"
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
          />

          <button
            className="main-form-btn"
            type="submit"
          >
            Login
          </button>

        </form>

        <p className="switch-text">
          Don't have an account?

          <button
            type="button"
            className="link-btn"
            onClick={() => setPage("register")}
          >
            Create Account
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

export default Login;