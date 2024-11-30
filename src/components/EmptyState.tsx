import { Image, Text, View } from "react-native";
import React from "react";

import { images } from "../constans";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

interface EmptyStateProps {
  title: string;
  subtitle: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, subtitle }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="test-xl text-center font-arial_regular color-secondary-white">
        {title}
      </Text>
      <Text className="text-sm color-secondary-grey font-arial_regular mt-2">
        {subtitle}
      </Text>

      <CustomButton title="Upload an image" handlePress={()=> router.push('/create')} containerStyles="w-full my-5"/>
    </View>
  );
};

export default EmptyState;
