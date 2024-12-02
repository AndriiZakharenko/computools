import { Text, View } from "react-native";
import React from "react";

const InfoBox = ({ title, subtitle, containerStyles, titleStyles }) => {
  return (
    <View className={containerStyles}>
      <Text
        className={`text-secondary-white text-center font-arial_bold ${titleStyles}`}
      >
        {title}
      </Text>
      <Text
        className={`text-gray-500 text-center font-arial_regular test-sm ${titleStyles}`}
      >
        {subtitle}
      </Text>
    </View>
  );
};

export default InfoBox;