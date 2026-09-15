import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);

    const location = useLocation();

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <nav className="navbar">

            {/* Logo */}

            <Link
                to="/"
                className="logo"
                onClick={closeMenu}
            >
                🌾 FarmSaathi
            </Link>


            {/* Mobile Menu Button */}

            <button
                className="menu-btn"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
            >
                {menuOpen ? "✕" : "☰"}
            </button>


            {/* Navigation */}

            <div
                className={`nav-links ${
                    menuOpen ? "menu-open" : ""
                }`}
            >

                <Link
                    to="/"
                    className={location.pathname === "/" ? "active" : ""}
                    onClick={closeMenu}
                >
                    Home
                </Link>

                <Link
                    to="/dashboard"
                    className={
                        location.pathname === "/dashboard"
                            ? "active"
                            : ""
                    }
                    onClick={closeMenu}
                >
                    Dashboard
                </Link>

                {/* <Link
                    to="/mycrops"
                    className={
                        location.pathname === "/mycrops"
                            ? "active"
                            : ""
                    }
                    onClick={closeMenu}
                >
                    My Crops
                </Link>

                <Link
                    to="/Weather"
                    onClick={closeMenu}
                >
                    Weather
                </Link> */}
                
               <button
                    className="logout-btn"
                    // onClick={}
                >
                    Logout
                </button>

            </div>

        </nav>
    );
}

export default Navbar; 