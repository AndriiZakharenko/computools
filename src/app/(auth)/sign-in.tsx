  import React, { useState } from "react";
  import { Alert, Image, ScrollView, Text, View } from "react-native";
  import { SafeAreaView } from "react-native-safe-area-context";

  import { images } from "../../constans";
  import FormField from "../../components/FormField";
  import CustomButton from "../../components/CustomButton";
  import { Link, router } from "expo-router";
  import { getCurrentUser, signIn } from "../../lib/appwrite";
  import { useGlobalContext } from "../../context/GlobalProvider";

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const SignIn = () => {
    const { setUser, setIsLogged } = useGlobalContext();
    const [isSubmitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
      email: "",
      password: "",
    });

    const submit = async () => {
      const { email, password } = form;

      if (!email || !password) {
        Alert.alert("Error", "Please fill in all the fields");
        return;
      }
  
      if (!isValidEmail(email)) {
        Alert.alert("Error", "Please enter a valid email address");
        return;
      }
  
      if (password.length < 8) {
        Alert.alert("Error", "Password must be at least 8 characters long");
        return;
      }

      setSubmitting(true);

      try {
        await signIn(form.email, form.password);

        const result = await getCurrentUser();

        setUser(result);
        setIsLogged(true);

        router.replace("/home");
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert("Error", error.message);
        } else {
          Alert.alert("Error", "An unknown error occurred");
        }
      } finally {
        setSubmitting(false);
      }
    };

    return (
      <SafeAreaView className="bg-primary-black h-full">
        <ScrollView>
          <View className="w-full justify-center min-h-[83vh] px-4 my-6">
            <Image
              source={images.logo}
              resizeMode="contain"
              className="w-[115px] h-[35px]"
            />
            <Text className="text-2xl color-secondary-white font-arial_regular mt-10">
              Log in to Computools
            </Text>

            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles="mt-7"
              keyboardType="email-address"
              placeholder="e-mail"
            />

            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mt-7"
              placeholder="password"
            />

            <CustomButton
              title="Sign In"
              handlePress={submit}
              containerStyles="mt-7"
              isLoading={isSubmitting}
            />
            <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg color-secondary-grey">
                Don't have an account?
              </Text>
              <Link
                href="/sign-up"
                className="text-lg color-secondary-yellow font-arial_bold"
              >
                Sign Up
              </Link>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };

  export default SignIn;
