import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigators from "./BottomTabNavigators";
import StackNavigators from "./StackNavigators";
import useMe from "../hooks/useMe";

const Nav = createNativeStackNavigator();

const LoggedInNavigator = () => {
  useMe();

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
