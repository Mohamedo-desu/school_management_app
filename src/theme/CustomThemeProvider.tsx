import { useSettingsStore } from "@/store/settingsStore";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { PropsWithChildren, useEffect, useMemo } from "react";
import { useColorScheme } from "react-native";
import { UnistylesRuntime } from "react-native-unistyles";

const CustomThemeProvider = ({ children }: PropsWithChildren) => {
  const theme = useSettingsStore((state) => state.theme);
  const colorScheme = useColorScheme();

  const selectedTheme: any = useMemo(() => {
    const useSystemTheme = theme === "system";
    const appliedTheme = useSystemTheme ? colorScheme : theme;

    UnistylesRuntime.setAdaptiveThemes(useSystemTheme);
    return appliedTheme;
  }, [theme, colorScheme]);

  useEffect(() => {
    if (theme !== "system") UnistylesRuntime.setTheme(selectedTheme);
  }, [selectedTheme]);

  const currentNavigationTheme = useMemo(
    () => (selectedTheme === "dark" ? DarkTheme : DefaultTheme),
    [selectedTheme]
  );

  return (
    <NavigationThemeProvider value={currentNavigationTheme}>
      {children}
      <StatusBar style={selectedTheme === "dark" ? "light" : "dark"} />
    </NavigationThemeProvider>
  );
};

export default CustomThemeProvider;
