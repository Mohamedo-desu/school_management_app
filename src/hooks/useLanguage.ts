import i18next from "i18next";
import { useCallback, useMemo, useState } from "react";

export const useLanguage = () => {
  const languages = useMemo(
    () => [
      { code: "en", name: "English", flag: "GB" },
      { code: "sw", name: "Kiswahili", flag: "KE" },
    ],
    []
  );

  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);

  const handleChangeLanguage = useCallback(
    (language: { code: string; name: string; flag: string }) => {
      i18next.changeLanguage(language.code, (err) => {
        if (err) console.error("Error loading language:", err);
      });
      setSelectedLanguage(language);
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
