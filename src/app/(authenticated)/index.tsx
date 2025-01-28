import CustomButton from "@/components/global/CustomButton";
import { useAuth } from "@clerk/clerk-expo";
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { StyleSheet } from "react-native-unistyles";

const Index = () => {
  const { t } = useTranslation();
  const { signOut } = useAuth();
  return (
    <View style={styles.container}>
      <CustomButton
        text={t("index.logOut")}
        onPress={() => signOut()}
        style={styles.button}
        textStyle={styles.buttonText}
      />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    backgroundColor: theme.Colors.background,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: theme.margins.lg,
  },
  button: {
    borderRadius: theme.border.sm,
  },
  buttonText: {
    fontFamily: theme.fonts.SemiBold,
    fontSize: RFValue(16),
  },
}));
