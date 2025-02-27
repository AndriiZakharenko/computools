import React, { useState, useRef, useCallback } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  ViewToken,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { icons } from "../constans";
import { ResizeMode, Video } from "expo-av";

interface Post {
  $id: string;
  id: string | number;
  thumbnail: string;
  video: string;
}

interface TrendingProps {
  posts: Post[];
}

interface TrendingItemProps {
  activeItem: string | null;
  item: Post;
}

const zoomIn = {
  0: {
    transform: [{ scale: 0.9 }],
  },
  1: {
    transform: [{ scale: 1.05 }],
  },
};

const zoomOut = {
  0: {
    transform: [{ scale: 1 }],
  },
  1: {
    transform: [{ scale: 0.9 }],
  },
};

const TrendingItem: React.FC<TrendingItemProps> = ({ activeItem, item }) => {
  const isActive = activeItem === item.$id;

  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      className="mr-5"
      animation={isActive ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (
              status.isLoaded &&
              "didJustFinish" in status &&
              status.didJustFinish
            ) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center "
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{
              uri: item.thumbnail,
            }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-black border border-yellow-100"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending: React.FC<TrendingProps> = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(
    posts.length > 0 ? posts[0].$id : null
  );

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 70,
  }).current;

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setActiveItem(viewableItems[0].key);
      }
    },
    []
  );

  if (!posts || posts.length === 0) {
    return <Text>No posts available</Text>;
  }

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
      contentOffset={{ x: 170, y: 0 }}
    />
  );
};

export default Trending;
