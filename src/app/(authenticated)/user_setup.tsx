import CustomText from "@/components/global/CustomText";
import React from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

const UserSetupScreen = () => {
  return (
    <View style={styles.container}>
      <CustomText>UserSetupScreen</CustomText>
    </View>
  );
};

export default UserSetupScreen;

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.Colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
}));
