import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { StyleSheet } from "react-native-unistyles";
import CustomText from "../global/CustomText";

const PrivacyTerms = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.footer}>
      <CustomText>{t("privacy.title")}</CustomText>
      <View style={styles.footerTextContainer}>
        <CustomText style={styles.footerText}>{t("privacy.terms")}</CustomText>
        <CustomText style={styles.footerText}>
          {t("privacy.privacy")}
        </CustomText>
        <CustomText style={styles.footerText}>
          {t("privacy.content")}
        </CustomText>
      </View>
    </View>
  );
};

export default PrivacyTerms;

const styles = StyleSheet.create((theme, rt) => ({
  footer: {
    position: "absolute",
    bottom: rt.insets.bottom,
    alignSelf: "center",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  footerTextContainer: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    flexWrap: "wrap",
  },
  footerText: {
    textDecorationLine: "underline",
    fontSize: RFValue(10),
    color: theme.Colors.primary,
  },
}));
