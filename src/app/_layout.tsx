import React from "react";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import GlobalProvider from "../context/GlobalProvider";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Arial-Regular": require("../assets/fonts/Arial-Regular.ttf"),
    "Arial-Bold": require("../assets/fonts/Arial-Bold.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    <GlobalProvider>
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="search/[query]" options={{ headerShown: false }} />
    </Stack>
    </GlobalProvider>
  );
};

export default RootLayout;
