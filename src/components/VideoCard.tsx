import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "../constans";
import { ResizeMode, Video } from "expo-av";

type Creator = {
  username: string;
  avatar: string;
};

type VideoData = {
  title: string;
  thumbnail: string;
  video: string;
  creator: Creator | null;
};

type VideoCardProps = {
  video: VideoData | null;
};

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const [play, setPlay] = useState(false);

  // Handle case where video is null
  if (!video) {
    return (
      <View className="flex-col items-center px-4 mb-14">
        <Text className="text-secondary-white text-sm">No video available</Text>
      </View>
    );
  }

  // Destructure after null check
  const { title, thumbnail, video: videoUrl, creator } = video;
  const username = creator?.username || "Unknown Creator";
  const avatar = creator?.avatar || "";

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary-yellow justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="contain"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text className="text-secondary-white text-sm" numberOfLines={1}>
              {title}
            </Text>
            <Text
              className="text-xs color-secondary-grey font-arial_regular"
              numberOfLines={1}
            >
              {username || "Unknown Creator"}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>

      {play ? (
        <Video
          source={{ uri: video.video }}
          className="w-full h-60 rounded-xl mt-3"
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
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center border border-yellow-100"
          accessibilityLabel="Play video"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="cover"
          />
        </TouchableOpacity>
      )}
    </View>
    
  );
};

export default VideoCard;
