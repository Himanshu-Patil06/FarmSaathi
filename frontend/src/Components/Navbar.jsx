import API_URL from "../Api/api";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useEffect } from "react";

const Navbar=()=> {
    
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const closeMenu = () => {
        setMenuOpen(false);
    };
    
 
    const getUser = async () => {
        try {
            const response = await fetch(`${API_URL}/users/`, {
                method: "GET",
                credentials: "include"
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to get user");
            }

            setUser(data);

        } catch (error) {
            console.error("Error getting user:", error);
        }finally {
            setLoading(false);
        }
    };
    

    useEffect(() => {
        getUser();
       
    }, []);

    const handleLogout = async () => {
        try {
            const response = await fetch(
                `${API_URL}/users/logout`,
                {
                    method: "POST",
                    credentials: "include"
                }
            );

            const data = await response.json();

            alert("Logout successful!");
            
setUser(null)
            closeMenu();

            // Go to login page
            navigate("/");

        } catch (error) {
            console.error("Logout error:", error);
        }
    }

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
{!loading && user?(
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

              
                
               <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>
):(
    <div className={`nav-links ${menuOpen ? "menu-open" : ""}`}>

        <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
        </Link>

        <Link to="/login" onClick={() => setMenuOpen(false)}>
            Login
        </Link>

        <Link
            to="/register"
            className="signup-btn"
            onClick={() => setMenuOpen(false)}
        >
            Sign Up
        </Link>

    </div>
)}
            

        </nav>
    );
}

export default Navbar; 