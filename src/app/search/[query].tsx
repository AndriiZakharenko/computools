import React, { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import useAppwrite from "../../lib/useAppwrite";
import { searchPosts } from "../../lib/appwrite";
import VideoCard from "../../components/VideoCard";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
  const { query } = useLocalSearchParams();
  const searchQuery = Array.isArray(query) ? query[0] : query;

  const { data: posts, refetch } = useAppwrite(() => searchPosts(searchQuery || ""));

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary-black h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard video={item}
          />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="text-sm color-secondary-grey font-arial_regular">
              Search Results
            </Text>
            <Text className="test-2xl font-arial_regular color-secondary-white">
              {query}
            </Text>
            <View className="mt-6 mb-6">
            <SearchInput initialQuery={query} refetch={refetch} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No images Found"
            subtitle="No video found for this search"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
