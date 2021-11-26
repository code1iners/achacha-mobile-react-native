import React, { useContext, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeContext } from "styled-components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useReactiveVar } from "@apollo/client";
import LoggedInNavigator from "./LoggedInNavigator";
import LoggedOutNavigator from "./LoggedOutNavigator";
import states from "../apollo/states";
import { getIsDark } from "../utils/themes/colors.js";
import { TOKEN } from "../utils/constants";

const Nav = createNativeStackNavigator();

const RootNavigator = () => {
  const token = useReactiveVar(states.tokenVar);
  const themeContext = useContext(ThemeContext);
  const { mainBackgroundColor } = themeContext;
  const isDark = getIsDark();

  // Watch.
  useEffect(async () => {
    const persistedToken = await AsyncStorage.getItem(TOKEN);
    if (persistedToken) {
      states.tokenVar(persistedToken);
    }
  }, [token]);

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
