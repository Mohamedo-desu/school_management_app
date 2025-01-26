import i18next from "i18next";
import { useCallback, useMemo, useState } from "react";

export const useLanguage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [languageModalVisible, setLanguageModalVisible] = useState(false);

  const languages = useMemo(
    () => [
      { code: "en", name: "English" },
      { code: "so", name: "Somali" },
      { code: "sw", name: "Kiswahili" },
      { code: "fr", name: "French" },
      { code: "es", name: "Spanish" },
      { code: "de", name: "German" },
      { code: "it", name: "Italian" },
      { code: "zh", name: "Chinese" },
      { code: "ar", name: "Arabic" },
      { code: "hi", name: "Hindi" },
      { code: "pt", name: "Portuguese" },
      { code: "ru", name: "Russian" },
      { code: "ja", name: "Japanese" },
      { code: "ko", name: "Korean" },
    ],
    []
  );

  const handleChangeLanguage = useCallback(
    (language: { code: string; name: string }) => {
      i18next.changeLanguage(language.code, (err) => {
        if (err) console.error("Error loading language:", err);
      });
      setSelectedLanguage(language.name);
      setLanguageModalVisible(false);
    },
    []
  );

  return {
    selectedLanguage,
    setLanguageModalVisible,
    languageModalVisible,
    languages,
    handleChangeLanguage,
  };
};
