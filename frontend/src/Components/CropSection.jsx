import API_URL from "../Api/api";
import { useEffect, useState } from "react";
import "./CropSection.css"
import RecommendationSection from "./RecommendationSection";

const CropSection = () => {
    const cropIcons = {
    Rice: "🌾",
    Tomato: "🍅",
    Chilli: "🌶️",
    Brinjal: "🍆",
    Wheat: "🌾",
    Corn: "🌽"
};

const stageIndexes = {
    Seedling: 0,
    Vegetative: 1,
    Flowering: 2,
    Maturity: 3
};

    const [crops,setCrops]=useState([])
    const [loading, setLoading] = useState(true);
    
    const [recommendation, setRecommendation] = useState([]);
    const [recommendationLoading, setRecommendationLoading] = useState(true);

    const getCrops = async () => {
            try {
                const response = await fetch(`${API_URL}/crop`, {
                    method: "GET",
                    credentials: "include"
                });
    
                const data = await response.json();
    
                if (!response.ok) {
                    throw new Error(data.message || "Failed to get weather");
                }
                const updatedCrops = data.map((crop) => ({
                    ...crop,
                    icon: cropIcons[crop.name] || "🌱",
                    stageIndex: stageIndexes[crop.currentStage.stage] ?? 0
                }));

                setCrops(updatedCrops);
                
    
            } catch (error) {
                console.error("Weather error:", error);
            }finally {
                    setLoading(false);
                }
        };

    const handleDelete = async (cropId) => {
            try {
                const response = await fetch(
                    `${API_URL}/crop/${cropId}`,
                    {
                        method: "DELETE",
                        credentials: "include"
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Failed to delete crop");
                }

                
                setCrops((prevCrops) =>
                    prevCrops.filter((crop) => crop.id !== cropId)
                );

            } catch (error) {
                console.error("Delete crop error:", error);
            }
        };

   const getRecommendations = async () => {
    try {
        const response = await fetch(
            `${API_URL}/recommendation/`,
            {
                method: "GET",
                credentials: "include"
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message || "Failed to get recommendations"
            );
        }

        setRecommendation(result);

    } catch (error) {
        console.error("Recommendation error:", error);
    } finally {
        setRecommendationLoading(false);
    }
};
        useEffect(() => {
         getCrops();
         getRecommendations();
        }, [])
        
  
         if (loading) {
            return <h2>Loading...</h2>;
        }

  return (
    <div className="crops-list">

{crops.length===0?(
<div className="no-crops">
        <h3>No crops added yet</h3>
        <p>
            Add a crop to start tracking its growth and get
            weather-based recommendations.
        </p>
    </div>
):(
    <>    
               {crops.map((crop, index) => (

                        <div className="crop-card" key={index}>

                            {/* CROP HEADER */}
                            <div className="crop-header">

                                <div className="crop-name">

                                    <span className="crop-icon">
                                        {crop.icon}
                                    </span>

                                    <div>
                                        <h3>{crop.name}</h3>
                                        <p>{crop.currentStage.stage}</p>
                                    </div>

                                </div>


                                <div className="crop-days">
                                    <strong>{crop.currentStage.days}</strong>
                                    <span>Days</span>
                                </div>
                                <div>
                                    <button
                                        className="delete-crop-btn"
                                        onClick={() => handleDelete(crop.id)}>
                                        Delete
                                    </button>
                                </div>

                            </div>


                            {/* GROWTH STAGE */}
                            <div className="growth-section">

                                <p className="growth-title">
                                    Growth Stage
                                </p>

                                <div className="growth-stage">

                                    <div className="stage-line"></div>

                                    <div
                                        className={`stage-point ${
                                            crop.stageIndex >= 0
                                                ? "active"
                                                : ""
                                        }`}
                                    >
                                        <span></span>
                                        <small>Seedling</small>
                                    </div>


                                    <div
                                        className={`stage-point ${
                                            crop.stageIndex >= 1
                                                ? "active"
                                                : ""
                                        }`}
                                    >
                                        <span></span>
                                        <small>Vegetative</small>
                                    </div>


                                    <div
                                        className={`stage-point ${
                                            crop.stageIndex >= 2
                                                ? "active"
                                                : ""
                                        }`}
                                    >
                                        <span></span>
                                        <small>Flowering</small>
                                    </div>


                                    <div
                                        className={`stage-point ${
                                            crop.stageIndex >= 3
                                                ? "active"
                                                : ""
                                        }`}
                                    >
                                        <span></span>
                                        <small>Maturity</small>
                                    </div>

                                </div>

                            </div>


                            {/* RECOMMENDATION */}
                          <RecommendationSection 
                                recommendation={recommendation}
                                cropId={crop.id}
                                loading={recommendationLoading}
                            />
                        </div>

                    ))}
</>
)}
     
    </div>
  )
}


export default CropSection;