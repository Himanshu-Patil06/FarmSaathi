import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

import "./AddCrop.css";

function AddCrop() {
    const navigate = useNavigate();

    const [crop, setCrop] = useState("");
    const [plantingDate, setPlantingDate] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!crop || !plantingDate) {
            alert("Please select crop and planting date.");
            return;
        }

        setLoading(true);

        // API will be connected here
        console.log({
            crop,
            plantingDate
        });

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

                    <form onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label htmlFor="crop">
                                Select Crop
                            </label>

                            <select
                                id="crop"
                                value={crop}
                                onChange={(e) => setCrop(e.target.value)}
                                required
                            >
                                <option value="">
                                    Select your crop
                                </option>
                                <option value="rice">Rice</option>
                                <option value="tomato">Tomato</option>
                                <option value="chilli">Chilli</option>
                                <option value="brinjal">Brinjal</option>
                                <option value="wheat">Wheat</option>
                                <option value="corn">Corn</option>
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