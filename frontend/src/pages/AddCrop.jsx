import API_URL from "../Api/api";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

import "./AddCrop.css";

function AddCrop() {
    const navigate = useNavigate();

    const [cropName, setCropName] = useState("");
    const [plantingDate, setPlantingDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!cropName || !plantingDate) {
            alert("Please select crop and planting date.");
            return;
        }

        setError("");
        setLoading(true);

       try {


            const response = await fetch(
                `${API_URL}/crop/`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    credentials: "include",

                    body: JSON.stringify({
                        cropName,
                        plantingDate
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Login failed");
                return;
            }

            // Login successful
            navigate("/dashboard");

        } catch (error) {

            setError("Unable to connect to server");

        } finally {

            setLoading(false);

        }
        

        setLoading(false);

        // Temporary navigation
        navigate("/dashboard");
    };

    return (
        <div className="add-crop-page">
            <Navbar />

            <main className="add-crop-container">

                <div className="add-crop-header">
                    <Link to="/dashboard" className="back-link">
                        ← Back to Dashboard
                    </Link>

                    <div className="crop-title">
                        <div className="crop-icon">🌱</div>

                        <div>
                            <h1>Add Your Crop</h1>
                            <p>
                                Tell us about the crop you are currently growing.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="add-crop-card">

                    <div className="card-heading">
                        <h2>Crop Details</h2>
                        <p>
                            This information helps FarmSaathi provide
                            crop-stage and weather-based advice.
                        </p>
                    </div>
                    {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                    <form onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label htmlFor="crop">
                                Select Crop
                            </label>

                            <select
                                id="crop"
                                value={cropName}
                                onChange={(e) => setCropName(e.target.value)}
                                required
                            >
                                <option value="">
                                    Select your crop
                                </option>
                                <option value="Rice">Rice</option>
                                <option value="Tomato">Tomato</option>
                                <option value="Chilli">Chilli</option>
                                <option value="Brinjal">Brinjal</option>
                                <option value="Wheat">Wheat</option>
                                <option value="Corn">Corn</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="plantingDate">
                                Planting Date
                            </label>

                            <input
                                type="date"
                                id="plantingDate"
                                value={plantingDate}
                                onChange={(e) =>
                                    setPlantingDate(e.target.value)
                                }
                                required
                            />

                            <small>
                                Enter the date when you planted this crop.
                            </small>
                        </div>

                        <div className="crop-info">
                            <span>💡</span>

                            <p>
                                FarmSaathi uses your planting date to
                                determine the current growth stage of your
                                crop.
                            </p>
                        </div>

                        <button
                            type="submit"
                            className="primary-btn add-crop-btn"
                            disabled={loading}
                        >
                            {loading ? "Adding Crop..." : "🌱 Add Crop"}
                        </button>

                    </form>
                </div>

            </main>
        </div>
    );
}

export default AddCrop;