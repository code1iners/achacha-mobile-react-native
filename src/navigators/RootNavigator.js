import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoggedInNavigator from "./LoggedInNavigator";
import LoggedOutNavigator from "./LoggedOutNavigator";

const Nav = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <Nav.Navigator>
      <Nav.Screen name="LoggedInNavigator" component={LoggedInNavigator} />
      <Nav.Screen name="LoggedOutNavigator" component={LoggedOutNavigator} />
    </Nav.Navigator>
  );
};

export default RootNavigator;
