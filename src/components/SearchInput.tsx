import { View, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import React, { useState } from "react";
import { icons } from "../constans";
import { router, usePathname } from "expo-router";

const SearchInput: React.FC<{ initialQuery?: string }> = ({initialQuery}) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  return (
    <View className="border-2 border-yellow-100 w-full h-16 px-4 bg-primary-black rounded-2xl focus:border-secondary-yellow items-center flex-row space-x-4">
      <TextInput
        className="flex-1 color-secondary-white font-arial_regular mt-0.5"
        value={query}
        placeholder="search for a file..."
        placeholderTextColor="#7CDCDE0"
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if (query === "")
            return Alert.alert(
              "Missing querry",
              "Please input something to search results across database"
            );

          if (pathname.startsWith("./search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Image source={icons.search} resizeMode="contain" className="w-5 h-5" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
