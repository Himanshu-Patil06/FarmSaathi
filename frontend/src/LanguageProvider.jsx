import { useEffect, useMemo, useState } from "react";
import { LanguageContext, translations } from "./LanguageContext";

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      return localStorage.getItem("farmsaathi-language") === "mr" ? "mr" : "en";
    } catch {
      return "en";
    }
  });

  const setLanguage = (nextLanguage) => {
    const next = nextLanguage === "mr" ? "mr" : "en";
    setLanguageState(next);
    try {
      localStorage.setItem("farmsaathi-language", next);
    } catch {
      // The selected language remains active for this session.
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    t: (text, values = {}) => {
      const translated = translations[language]?.[text] ?? text;
      return translated.replace(/\{(\w+)\}/g, (match, key) =>
        Object.hasOwn(values, key) ? values[key] : match
      );
    },
  }), [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
