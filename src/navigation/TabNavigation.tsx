import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import Icon from "react-native-vector-icons/Ionicons";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import CategoriesScreen from "../screens/CategoriesScreen";
import { useTheme } from "../theme/ThemeContext";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const { theme } = useTheme();
  const tabBarIconStyle = ({ focused }: any) => {
    const scale = focused ? 1.2 : 1;
    return {
      transform: [{ scale }],
    };
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.backgroundColor, 
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "600",
          color: theme.textColor,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <Icon
              name="home-outline"
              size={size}
              color={theme.iconColor}
              style={tabBarIconStyle({ focused })}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          tabBarLabel: "Categories",
          tabBarIcon: ({ color, size, focused }) => (
            <Icon
              name="grid-outline"
              size={size}
              color={theme.iconColor}
              style={tabBarIconStyle({ focused })}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <Icon
              name="person-outline"
              size={size}
              color={theme.iconColor}
              style={tabBarIconStyle({ focused })}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
