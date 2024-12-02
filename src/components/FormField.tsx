import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";

import { icons } from "../constans";

interface FormFieldProps {
  title: string;
  value: string;
  handleChangeText: (e: string) => void;
  placeholder?: string;
  otherStyles?: string;
  keyboardType?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  title,
  value,
  placeholder = "",
  handleChangeText,
  otherStyles,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y2 ${otherStyles}`}>
      <Text className="font-arial-regular color-secondary-grey">{title}</Text>
      <View className="border-2 border-yellow-100 w-full h-16 px-4 bg-primary-black rounded-2xl focus:border-secondary-yellow items-center flex-row">
        <TextInput
          className="flex-1 color-secondary-white font-arial_regular"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
