import { useNotificationObserver } from "@/hooks/useNotificationObserver";
import { useUser } from "@clerk/clerk-expo";
import { useQuickActionRouting } from "expo-quick-actions/router";
import { Redirect, Stack } from "expo-router";
import React from "react";

const AuthenticatedLayout = () => {
  const { user } = useUser();

  if (!user) return <Redirect href={"/(public)"} />;

  //useSetupForPushNotifications();
  useNotificationObserver();
  useQuickActionRouting();
  return <Stack screenOptions={{ headerShown: true }} />;
};

export default AuthenticatedLayout;
