import { useEffect, useState } from "react";
import { Alert } from "react-native";

type AsyncFunction<T> = () => Promise<T>;

const useAppwrite = <T>(fn: AsyncFunction<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
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
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, loading, refetch };
};

export default useAppwrite;
