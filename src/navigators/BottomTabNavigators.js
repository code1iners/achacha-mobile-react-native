import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AccountScreen from "../screens/accounts/AccountScreen";
import SettingScreen from "../screens/settings/SettingScreen";

const Tab = createBottomTabNavigator();

const BottomTabNavigators = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="AccountScreen" component={AccountScreen} />
      <Tab.Screen name="SettingScreen" component={SettingScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigators;
