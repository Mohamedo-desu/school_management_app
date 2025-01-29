import AuthHeader from "@/components/global/AuthHeader";
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

const HelpScreen = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <AuthHeader title={t("help.title")} description={t("help.description")} />
    </View>
  );
};

export default HelpScreen;

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    backgroundColor: theme.Colors.background,
    paddingHorizontal: theme.margins.lg,
  },
}));
