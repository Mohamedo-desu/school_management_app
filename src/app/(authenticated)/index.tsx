import { getStoredValues } from "@/store/storage";
import { Redirect } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const index = () => {
  const { user_setup } = getStoredValues(["user_setup"]);

  if (!user_setup || user_setup === "false") {
    return <Redirect href={"/(authenticated)/user_setup"} />;
  }

  return (
    <View>
      <Text>index</Text>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
