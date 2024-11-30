import { useEffect, useState } from "react";
import { getAllPosts } from "./appwrite";
import { Alert } from "react-native";

type AsyncFunction<T> = () => Promise<T>;

const useAppwrite = <T>(fn: AsyncFunction<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fn();
      setData(response as T[]);
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "An error occurred"
      );
    }
    finally{
        setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, isLoading, refetch };
};

export default useAppwrite;
