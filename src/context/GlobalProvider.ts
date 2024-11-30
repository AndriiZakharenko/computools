// import {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   ReactNode,
// } from "react";
// import { getCurrentUser } from "../lib/appwrite";

// interface GlobalProviderProps {
//   children: ReactNode;
// }

// interface GlobalContextType {
//   isLoggedIn: boolean | undefined;
//   user: any;
//   isLoading: boolean;
//   setIsLoggedIn: (value: boolean) => void;
//   setUser: (value: any) => void;
// }

// const GlobalContext = createContext<GlobalContextType | undefined>(undefined);
// export const useGlobalContext = (): GlobalContextType => {
//   const context = useContext(GlobalContext);
//   if (!context) {
//     throw new Error("useGlobalContext must be used within a GlobalProvider");
//   }
//   return context;
// };

// const GlobalProvider = ({ children }: GlobalProviderProps) => {
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);
//   const [user, setUser] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(true);

//   useEffect(() => {
//     getCurrentUser()
//       .then((res) => {
//         if (res) {
//           setIsLoggedIn(true);
//           setUser(res);
//         } else {
//           setIsLoggedIn(false);
//           setUser(null);
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   }, []);

//   return (
//     <GlobalContext.Provider
//     value={{
//         isLoggedIn,
//         setIsLoggedIn,
//         user,
//         setUser,
//         isLoading
//       }}
//       {children}
//     </GlobalContext.Provider>
//     )
// };

// export default GlobalProvider;
