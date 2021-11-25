import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoggedInNavigator from "./LoggedInNavigator";
import LoggedOutNavigator from "./LoggedOutNavigator";
import states from "../apollo/states";

const Nav = createNativeStackNavigator();

const RootNavigator = () => {
  const token = states.tokenVar();
  return (
    <Nav.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {token ? (
        <Nav.Screen name="LoggedInNavigator" component={LoggedInNavigator} />
      ) : (
        <Nav.Screen name="LoggedOutNavigator" component={LoggedOutNavigator} />
      )}
    </Nav.Navigator>
  );
};

export default RootNavigator;
