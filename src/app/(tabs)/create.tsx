import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import { ResizeMode, Video } from "expo-av";
import { icons } from "../../constans";
import CustomButton from "../../components/CustomButton";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { createVideoPost } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

type FormState = {
  title: string;
  video: DocumentPicker.DocumentResult | null;
  thumbnail: DocumentPicker.DocumentResult | null;
  prompt: string;
};

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState<FormState>({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const openPicker = async (selectType: "image" | "video") => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectType === "image" ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4,3],
      quality: 1
      
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({ ...form, thumbnail: result.assets[0] });
      }
      if (selectType === "video") {
        setForm({ ...form, video: result.assets[0] });
      }
    }
  };

  const submit = async () => {
    if (!form.title || !form.prompt || !form.thumbnail || !form.video) {
      return Alert.alert("Please fill in all the fields");
    }

    setUploading(true);
    try {
      await createVideoPost({
        ...form,
        userId: user.$id,
      });

      Alert.alert("Success", "Post uploaded successfully");
      router.push("/home");
    } catch (error: unknown) {
      const errorMessage =
        (error as Error).message || "An unknown error occurred";
      Alert.alert("Error", errorMessage);
    } finally {
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });
    }

    setUploading(false);
  };

  return (
    <SafeAreaView className="bg-primary-black h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl color-secondary-white">Upload file</Text>
        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Give your file a catch title...."
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />

        <View className="mt-7 space-y-2 ">
          <Text className=" color-secondary-grey">Upload file</Text>
          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video && "uri" in form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl "
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View className="w-full h-40 px-4 bg-primary-black rounded-2xl justify-center items-center border border-yellow-100">
                <View className="w-14 h-14 border border-dashed border-yellow-100 justify-center items-center">
                  <Image
                    source={icons.upload}
                    className="w-1/2 h-1/2"
                    alt="upload"
                    resizeMode="contain"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-7 space-y-2">
          <Text className=" color-secondary-grey">Thumbnail Image</Text>
          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail && "uri" in form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-primary-black rounded-2xl justify-center items-center border-2 border-yellow-100 flex-row space-x-2">
                <Image
                  source={icons.upload}
                  className="w-5 h-5"
                  resizeMode="contain"
                />
                <Text className="text-sm color-secondary-grey">
                  Choose a File
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title="Desription"
          value={form.prompt}
          placeholder="Please describe your file"
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles="mt-7"
        />
        <CustomButton
          title="Submit & Publish"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
