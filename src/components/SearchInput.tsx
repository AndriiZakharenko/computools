import { View, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "../constans";

interface SearchProps {
  title: string;
  value: string;
  handleChangeText: (e: string) => void;
  placeholder?: string;
  otherStyles?: string;
  keyboardType?: string;
}

const SearchInput: React.FC<SearchProps> = ({
  title,
  value,
  placeholder = "",
  handleChangeText,
  otherStyles,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="border-2 border-yellow-100 w-full h-16 px-4 bg-primary-black rounded-2xl focus:border-secondary-yellow items-center flex-row space-x-4">
      <TextInput
        className="flex-1 color-secondary-white font-arial_regular mt-0.5"
        value={value}
        placeholder='search for a image...'
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
        secureTextEntry={title === "Password" && !showPassword}
      />

      <TouchableOpacity>
        <Image source={icons.search} resizeMode="contain" className="w-5 h-5" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
