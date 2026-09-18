import "./RecommendationSection.css";

const conditionLabels = {
    moderate_rain: "Moderate Rain",
    high_rain_probability: "High Rain Probability",
    normal_temperature: "Normal Temperature",
    high_temperature: "High Temperature",
    low_temperature: "Low Temperature",
    heavy_rain: "Heavy Rain"
};

const conditionIcons = {
    moderate_rain: "🌧️",
    high_rain_probability: "☔",
    normal_temperature: "🌡️",
    high_temperature: "🔥",
    low_temperature: "🥶",
    heavy_rain: "⛈️"
};

const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
};

const formatValue = (condition, value) => {
    if (condition === "high_rain_probability") {
        return `${value}% probability`;
    }

    if (
        condition === "normal_temperature" ||
        condition === "high_temperature" ||
        condition === "low_temperature"
    ) {
        return `${value}°C`;
    }

    if (
        condition === "moderate_rain" ||
        condition === "heavy_rain"
    ) {
        return `${value} mm`;
    }

    return value;
};


const RecommendationSection = ({
    recommendation,
    cropId,
    loading
}) => {



    if (loading) {
        return (
            <div className="recommendation-section">
                <p className="recommendation-loading">
                    Loading recommendations...
                </p>
            </div>
        );
    }

    const data = recommendation.find(
        (item) => item.id === cropId
    );
   
    

    if (!data || !data.recommendations?.length) {
        return (
            <div className="recommendation-section">
                <p className="no-recommendations">
                    No recommendations available.
                </p>
            </div>
        );
    }

 

   return (
    <div className="recommendation-section">

        <h3 className="recommendation-heading">
            🌦️ Recommendations
        </h3>

        <div className="recommendations-list">

            {data.recommendations.map((recommendation) => {

                const condition = data.conditions?.find(
                    (item) =>
                        item.condition === recommendation.condition
                );

                return (
                    <div
                        className="recommendation-card"
                        key={recommendation._id}
                    >

                        <div className="recommendation-header">

                            <div className="recommendation-title">

                                <span className="recommendation-icon">
                                    {
                                        conditionIcons[
                                            recommendation.condition
                                        ] || "🌱"
                                    }
                                </span>

                                <div>
                                    <h4>
                                        {
                                            conditionLabels[
                                                recommendation.condition
                                            ] ||
                                            recommendation.condition
                                        }
                                    </h4>

                                    {condition && (
                                        <p>
                                            {formatValue(
                                                condition.condition,
                                                condition.value
                                            )}
                                            {" • "}
                                            {formatDate(condition.date)}
                                        </p>
                                    )}
                                </div>

                            </div>

                            <span
                                className={`priority priority-${recommendation.priority}`}
                            >
                                {recommendation.priority}
                            </span>

                        </div>

                        <p className="recommendation-advice">
                            {recommendation.advice}
                        </p>

                    </div>
                );
            })}

        </div>
    </div>
);
};


export default RecommendationSection;