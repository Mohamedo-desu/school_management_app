import { useAuth } from "@clerk/clerk-expo";
import { useQuickActionRouting } from "expo-quick-actions/router";
import { Redirect, Stack } from "expo-router";
import React from "react";

const PublicLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return null;
  if (isSignedIn) return <Redirect href={"/(authenticated)"} />;

  useQuickActionRouting();

  return <Stack screenOptions={{ headerShown: false }} />;
};

export default PublicLayout;
