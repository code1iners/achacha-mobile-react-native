import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/welcome/WelcomeScreen";

const Nav = createNativeStackNavigator();

const LoggedOutNavigator = () => {
  return (
    <Nav.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Nav.Screen name="WelcomeScreen" component={WelcomeScreen} />
    </Nav.Navigator>
  );
};

export default LoggedOutNavigator;
