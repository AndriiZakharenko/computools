import { Text, View } from "react-native";
import React from "react";

interface InfoBoxProps {
  title: string | number;
  subtitle?: string;
  containerStyles?: string;
  titleStyles?: string;
}

const InfoBox: React.FC<InfoBoxProps> = ({
  title,
  subtitle,
  containerStyles = "",
  titleStyles = "",
}) => {
  return (
    <View className={containerStyles}>
      <Text
        className={`text-secondary-white text-center font-arial_bold ${titleStyles}`}
      >
        {title}
      </Text>
      {subtitle && (
        <Text
          className={`text-gray-500 text-center font-arial_regular test-sm ${titleStyles}`}
        >
          {subtitle}
        </Text>
      )}
    </View>
  );
};

export default InfoBox;
