import { Text, View } from "react-native";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "../../components/EmptyState";

const Bookmark = () => {
  return (
    <SafeAreaView className=" bg-primary-black h-full ">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Favourites</Text>
        <View className="justify-center h-[75vh]">
          <EmptyState
          title="This tab is under development"
          subtitle="Thank You for understanding"
        />
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default Bookmark;
