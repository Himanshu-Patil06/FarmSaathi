import { useLanguage } from "../LanguageContext";

const LanguageToggle = ({ className = "" }) => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <button
      type="button"
      className={`language-toggle ${className}`.trim()}
      onClick={() => setLanguage(language === "mr" ? "en" : "mr")}
      aria-label={t(language === "mr" ? "Switch to English" : "मराठीमध्ये बदला")}
      aria-pressed={language === "mr"}
    >
      {language === "mr" ? t("English") : t("Marathi")}
    </button>
  );
};

export default LanguageToggle;
