import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigators from "./BottomTabNavigators";
import StackNavigators from "./StackNavigators";
import { colors, getIsDark } from "../utils/themes/colors";
import { ThemeContext } from "styled-components/native";
import ProfileScreen from "../screens/settings/profiles/ProfileScreen";

const Nav = createNativeStackNavigator();

const LoggedInNavigator = () => {
  return (
    <Nav.Navigator
      screenOptions={{
        presentation: "modal",
        headerShown: false,
      }}
    >
      <Nav.Screen name="BottomTabNavigators" component={BottomTabNavigators} />
      <Nav.Screen name="StackNavigators" component={StackNavigators} />
    </Nav.Navigator>
  );
};

export default LoggedInNavigator;
