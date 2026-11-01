import "./RecommendationSection.css";
import { useLanguage } from "../LanguageContext";

const conditionLabels = {
  heavy_rain: "Heavy Rain",
  moderate_rain: "Moderate Rain",
  light_rain: "Light Rain",
  high_rain_probability: "High Rain Probability",
  rain_expected: "Rain Expected",
  very_high_temperature: "Very High Temperature",
  high_temperature: "High Temperature",
  very_low_temperature: "Very Low Temperature",
  low_temperature: "Low Temperature",
  normal_temperature: "Normal Temperature",
};

const conditionIcons = {
  moderate_rain: "🌧️",
  high_rain_probability: "☔",
  normal_temperature: "🌡️",
  high_temperature: "🔥",
  low_temperature: "🥶",
  heavy_rain: "⛈️",
};

const marathiAdvice = {
  heavy_rain: "मुसळधार पावसाची शक्यता आहे. शेतात पाणी साचू नये यासाठी योग्य निचरा ठेवा.",
  moderate_rain: "मध्यम पावसाची शक्यता आहे. जमिनीतील ओलावा तपासा आणि पाण्याचा निचरा योग्य ठेवा.",
  light_rain: "हलका पाऊस अपेक्षित आहे. जमिनीतील ओलावा पाहा आणि गरज नसताना सिंचन टाळा.",
  high_rain_probability: "पावसाची शक्यता जास्त आहे. शेतातील निचरा तपासा आणि गरज नसताना सिंचन करू नका.",
  rain_expected: "लवकरच पाऊस पडण्याची शक्यता आहे. शेताची पाहणी करा आणि अतिरिक्त पाण्याचा निचरा होईल याची खात्री करा.",
  very_high_temperature: "अतिउच्च तापमानाची शक्यता आहे. पिकावर उष्णतेचा ताण येत नाही ना ते पाहा आणि जमिनीत पुरेसा ओलावा ठेवा.",
  high_temperature: "उच्च तापमानाची शक्यता आहे. जमिनीतील ओलावा आणि पिकाची वाढ नियमित तपासा.",
  normal_temperature: "तापमान पिकासाठी अनुकूल आहे. नियमित पाहणी सुरू ठेवा आणि जमिनीतील योग्य ओलावा राखा.",
  low_temperature: "कमी तापमानाची शक्यता आहे. पिकाची वाढ आणि शेतातील परिस्थिती नियमित तपासा.",
  very_low_temperature: "अतिनीच तापमानाची शक्यता आहे. पिकावर थंडीचा ताण येत नाही ना ते बारकाईने पाहा.",
};

const formatValue = (condition, value, t) => {
  if (condition === "high_rain_probability") {
    return t("{value}% probability", { value });
  }

  if (
    condition === "normal_temperature" ||
    condition === "high_temperature" ||
    condition === "low_temperature"
  ) {
    return `${value}°C`;
  }

  if (condition === "moderate_rain" || condition === "heavy_rain") {
    return `${value} mm`;
  }

  return value;
};

const RecommendationSection = ({ recommendation, cropId, loading }) => {
  const { t, language } = useLanguage();
  if (loading) {
    return (
      <div className="recommendation-section">
        <p className="recommendation-loading">{t("Loading recommendations...")}</p>
      </div>
    );
  }

  const data = recommendation.find((item) => item.id === cropId);

  if (!data || !data.recommendations?.length) {
    return (
      <div className="recommendation-section">
        <p className="no-recommendations">{t("No recommendations available.")}</p>
      </div>
    );
  }

  return (
    <div className="recommendation-section">
      <h3 className="recommendation-heading">🌦️ {t("Recommendations")}</h3>

      <div className="recommendations-list">
        {data.recommendations.map((recommendation) => {
          const condition = data.conditions?.find(
            (item) => item.condition === recommendation.condition,
          );

          return (
            <div className="recommendation-card" key={recommendation._id}>
              <div className="recommendation-header">
                <div className="recommendation-title">
                  <span className="recommendation-icon">
                    {conditionIcons[recommendation.condition] || "🌱"}
                  </span>

                  <div>
                    <h4>
                      {t(conditionLabels[recommendation.condition] ||
                      recommendation.condition)}
                    </h4>

                    {condition && (
                      <p>
                        {formatValue(condition.condition, condition.value, t)}
                        {" • "}
                        {new Date(condition.date).toLocaleDateString(
                          language === "mr" ? "mr-IN" : "en-IN",
                          { day: "numeric", month: "short", year: "numeric" },
                        )}
                      </p>
                    )}
                  </div>
                </div>

                <span
                  className={`priority priority-${recommendation.priority}`}
                >
                  {t(recommendation.priority)}
                </span>
              </div>

              <p className="recommendation-advice">
                {language === "mr"
                  ? marathiAdvice[recommendation.condition] ||
                    "पिकाची आणि हवामानाची नियमित पाहणी करा."
                  : recommendation.advice}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecommendationSection;
