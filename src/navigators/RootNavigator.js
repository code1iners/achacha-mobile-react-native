import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeContext } from "styled-components";
import LoggedInNavigator from "./LoggedInNavigator";
import LoggedOutNavigator from "./LoggedOutNavigator";
import states from "../apollo/states";
import { getIsDark } from "../utils/themes/colors.js";

const Nav = createNativeStackNavigator();

const RootNavigator = () => {
  const token = states.tokenVar();
  const themeContext = useContext(ThemeContext);
  console.log(themeContext);
  const { mainBackgroundColor } = themeContext;
  const isDark = getIsDark();

  return (
    <Nav.Navigator
      sceneContainerStyle={{
        backgroundColor: isDark ? mainBackgroundColor : "white",
      }}
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
