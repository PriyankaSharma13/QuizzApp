import React, { createContext, useState, useContext, useEffect } from "react";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { darkTheme, lightTheme, ThemeType } from "./themeSlice";

interface ThemeContextProps {
  theme: ThemeType;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};


export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>(lightTheme);


  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem("appTheme");
      if (savedTheme) {
        setTheme(savedTheme === "dark" ? darkTheme : lightTheme);
      } else {
        const systemTheme = Appearance.getColorScheme();
        setTheme(systemTheme === "dark" ? darkTheme : lightTheme);
      }
    };

    loadTheme();
  }, []);


  const toggleTheme = async () => {
    const newTheme = theme.mode === "light" ? darkTheme : lightTheme;
    setTheme(newTheme);
    await AsyncStorage.setItem("appTheme", newTheme.mode); 
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
