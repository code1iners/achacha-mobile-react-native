import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigators from "./BottomTabNavigators";
import StackNavigators from "./StackNavigators";

const Nav = createNativeStackNavigator();

const LoggedInNavigator = () => {
  return (
    <Nav.Navigator>
      <Nav.Screen name="BottomTabNavigators" component={BottomTabNavigators} />
      <Nav.Screen name="StackNavigators" component={StackNavigators} />
    </Nav.Navigator>
  );
};

export default LoggedInNavigator;
