import { ScrollView, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { images } from "../constans";
import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";

import CustomButton from "../components/CustomButton";
import "../styles/global.css";
import { useGlobalContext } from "../context/GlobalProvider";

const App = () => {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="bg-primary-black h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />

          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-3xl color-secondary-white font-arial-bold text-center">
              Discover Endless Possibilities with{" "}
              <Text className="font-arial_regular color-secondary-yellow">
                Aora
              </Text>
            </Text>
            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-3 right-28"
              resizeMode="contain"
            />
          </View>

          <Text className="text-sm font-arial_regular color-secondary-grey mt-7 text-center">
            Where creativity meets innovation: embark on a journey of limitless
            exploration
          </Text>

          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("sign-in")}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default App;
