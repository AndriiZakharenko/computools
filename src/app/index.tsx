import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Link } from "expo-router";
import "../styles/global.css";

const App = () => {
  return (
    <View className="flex-1 items-center justify-center bg-green-200">
      <Text className="text-3xl font-arial_bold">Test</Text>
      <StatusBar style="auto" />
      <Link href="/home" className="color-secondary-blue">
        Go to Home
      </Link>
    </View>
  );
};

export default App;
