import { useNotificationObserver } from "@/hooks/useNotificationObserver";
import useSetupForPushNotifications from "@/hooks/useSetupForPushNotifications";
import { useUser } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";
import React from "react";

const AuthenticatedLayout = () => {
  const { user } = useUser();

  if (!user) return <Redirect href={"/(public)"} />;

  useSetupForPushNotifications();
  useNotificationObserver();

  return <Stack screenOptions={{ headerShown: false }} />;
};

export default AuthenticatedLayout;
