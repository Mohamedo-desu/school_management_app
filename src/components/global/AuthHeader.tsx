import { Fonts } from "@/constants/Fonts";
import React, { FC } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import CustomText from "../global/CustomText";
import ArrowLeftIcon from "./ArrowLeftIcon";

interface AuthHeaderProps {
  title: string;
  description: string;
  showArrow?: boolean;
}

const AuthHeader: FC<AuthHeaderProps> = ({
  title,
  description,
  showArrow = true,
}) => {
  return (
    <View style={styles.container}>
      {showArrow && <ArrowLeftIcon />}
      <View style={styles.descriptionContainer}>
        <CustomText fontFamily={Fonts.Bold} variant="h1">
          {title}
        </CustomText>
        <CustomText variant="h5" style={styles.subText}>
          {description}
        </CustomText>
      </View>
    </View>
  );
};

export default AuthHeader;

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    marginTop: rt.insets.top,
  },
  descriptionContainer: {
    marginTop: theme.margins.xl,
    gap: 10,
  },
  subText: {
    color: theme.Colors.gray[500],
  },
}));
