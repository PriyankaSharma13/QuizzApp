import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginSuccess, setToken } from "./src/redux/Slice/authSlice";
import Toast from "react-native-toast-message";
import AppNavigation from "./src/navigation/AppNavigation";
import { ThemeProvider } from "./src/theme/ThemeContext";
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (token) {
          const fullName = await AsyncStorage.getItem("fullName");
          const email = await AsyncStorage.getItem("email");
          if (fullName && email) {
            dispatch(loginSuccess({ fullName, email }));
            dispatch(setToken({ token }));
          }
        }
      } catch (error) {
        console.error("Failed to load user session: ", error);
      }
    };

    checkUserSession();
  }, [dispatch]);

  return (
    <ThemeProvider>
      <NavigationContainer>
        <AppNavigation />
        <Toast />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;

// const LightTheme = {
//   dark: false,
//   colors: {
//     primary: "#ff7e5f",
//     background: "#f9f9f9",
//     card: "#fff",
//     text: "#333",
//     border: "#ccc",
//     notification: "#ff7e5f",
//   },
// };

// const DarkTheme = {
//   dark: true,
//   colors: {
//     primary: "#ff7e5f",
//     background: "#1e1e1e",
//     card: "#252525",
//     text: "#fff",
//     border: "#333",
//     notification: "#ff7e5f",
//   },
// };
