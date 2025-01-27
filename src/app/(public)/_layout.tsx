import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";
import React from "react";

const PublicLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return null;
  if (isSignedIn) return <Redirect href={"/(authenticated)/(tabs)"} />;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="sign_in"
        options={{
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen name="sign_up" />
      <Stack.Screen
        name="forgot_password"
        options={{
          animation: "slide_from_bottom",
        }}
      />
      <Stack.Screen
        name="reset_password"
        options={{
          animation: "slide_from_bottom",
        }}
      />
    </Stack>
  );
};

export default PublicLayout;
