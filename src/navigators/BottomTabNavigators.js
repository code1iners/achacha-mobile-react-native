import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import AccountScreen from "../screens/accounts/AccountScreen";
import SettingScreen from "../screens/settings/SettingScreen";
import { colors, getIsDark } from "../utils/themes/colors";

const Tab = createBottomTabNavigator();

const BottomTabNavigators = () => {
  const isDark = getIsDark();
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: isDark ? colors.black : colors.white,
      }}
      screenOptions={{
        headerStyle: {
          backgroundColor: isDark ? colors.black : colors.white,
        },
        headerTitleStyle: {
          color: isDark ? colors.darkTextColor : colors.lightTextColor,
        },
        headerTitleAlign: "center",

        tabBarStyle: {
          backgroundColor: isDark ? colors.black : colors.white,
          borderTopColor: "rgba(255, 255, 255, 0.2)",
        },
        tabBarActiveTintColor: isDark ? colors.white : colors.black,
        tabBarInactiveTintColor: "grey",
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" color={color} size={size} />
          ),
          headerTitle: "Accounts",
        }}
        name="AccountScreen"
        component={AccountScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" color={color} size={size} />
          ),
          headerTitle: "Settings",
        }}
        name="SettingScreen"
        component={SettingScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigators;
