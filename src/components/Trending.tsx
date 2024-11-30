import React from "react";
import { FlatList, Text } from "react-native";

interface Post {
  $id: string;
  id: string | number;
}

interface TrendingProps {
  posts: Post[];
}

const Trending: React.FC<TrendingProps> = ({ posts }) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <Text className="text-3xl color-secondary-white font-arial_bold">
          {item.id}
        </Text>
      )}
      horizontal
    />
  );
};

export default Trending;
