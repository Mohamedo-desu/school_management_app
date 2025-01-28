import CustomButton from "@/components/global/CustomButton";
import CustomText from "@/components/global/CustomText";
import LanguageModal from "@/components/global/LanguageModal";
import { appName } from "@/constants";
import { Fonts } from "@/constants/Fonts";
import { useLanguage } from "@/hooks/useLanguage";
import { useSettingsStore } from "@/store/settingsStore";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, View } from "react-native";
import CountryFlag from "react-native-country-flag";
import { RFValue } from "react-native-responsive-fontsize";
import { moderateScale } from "react-native-size-matters";
import { StyleSheet, useUnistyles } from "react-native-unistyles";

const HEADER_ICON_SIZE = RFValue(12);

const OnboardingScreen = () => {
  const { t } = useTranslation();
  const { theme } = useUnistyles();
  const currTheme = useSettingsStore((state) => state.theme);
  const setTheme = useSettingsStore((state) => state.setTheme);

  const {
    selectedLanguage,
    setLanguageModalVisible,
    languageModalVisible,
    languages,
    handleChangeLanguage,
  } = useLanguage();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => setLanguageModalVisible(true)}
          activeOpacity={0.8}
          style={styles.headerLanguage}
        >
          <CountryFlag
            isoCode={selectedLanguage.flag}
            size={RFValue(10)}
            style={styles.flagIcon}
          />
          <CustomText
            fontFamily={Fonts.Medium}
            variant="h6"
            style={styles.headerText}
          >
            {selectedLanguage.name}
          </CustomText>
          <AntDesign
            name="down"
            size={HEADER_ICON_SIZE}
            color={theme.Colors.gray[500]}
          />
        </TouchableOpacity>

        {/* Animated theme icon */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setTheme(currTheme === "light" ? "dark" : "light");
          }}
        >
          {currTheme === "light" ? (
            <MaterialCommunityIcons
              name="white-balance-sunny"
              size={RFValue(24)}
              color={theme.Colors.sun}
            />
          ) : (
            <MaterialCommunityIcons
              name="moon-waxing-crescent"
              size={RFValue(24)}
              color={theme.Colors.typography}
            />
          )}
        </TouchableOpacity>
      </View>

      {/* Content */}
      <Image
        source={require("@/assets/images/logo.png")}
        contentFit="contain"
        style={styles.image}
      />

      <CustomText fontFamily={Fonts.Bold} style={styles.appName}>
        {appName}
      </CustomText>
      <CustomText
        variant="h5"
        fontFamily={Fonts.Regular}
        style={styles.appDesc}
      >
        {t("onboarding.description")}
      </CustomText>

      <CustomButton
        text={t("onboarding.get_started")}
        onPress={() => router.navigate("/(public)/sign_in")}
        style={styles.button}
        textStyle={styles.buttonText}
      />

      {/* Language Modal */}
      <LanguageModal
        visible={languageModalVisible}
        onClose={() => setLanguageModalVisible(false)}
        languages={languages}
        onLanguageSelect={handleChangeLanguage}
      />
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    backgroundColor: theme.Colors.background,
    paddingHorizontal: theme.margins.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: rt.insets.top + 5,
    width: "100%",
    justifyContent: "space-between",
  },
  headerLanguage: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  image: {
    width: moderateScale(200),
    aspectRatio: 1,
    marginVertical: 20,
  },
  headerText: {
    fontSize: RFValue(14),
    color: theme.Colors.gray[500],
  },
  appName: {
    fontSize: RFValue(25),
    textAlign: "center",
    marginVertical: 20,
  },
  appDesc: {
    color: theme.Colors.gray[500],
    textAlign: "center",
  },
  button: {
    position: "absolute",
    bottom: rt.insets.bottom + 5,
    borderRadius: theme.border.sm,
  },
  buttonText: {
    fontFamily: Fonts.SemiBold,
    fontSize: RFValue(16),
  },
  flagIcon: {},
}));
