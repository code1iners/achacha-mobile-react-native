import React, { useState } from "react";
import RootNavigator from "./src/navigators/RootNavigator";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { Ionicons } from "@expo/vector-icons";
import { loadFonts } from "./src/utils/assetUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TOKEN } from "./src/utils/constants";
import states from "./src/apollo/states";
import { ThemeProvider } from "styled-components";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "./src/utils/themes/colors";
import { round, spacing } from "./src/utils/themes/spacing";
import { ApolloProvider } from "@apollo/client";
import client from "./src/apollo/apollo";
import CodePush from "react-native-code-push";

const App = () => {
  const [ready, setReady] = useState(false);
  const isDark = useColorScheme() === "dark";
  const theme = {
    colors: isDark ? darkTheme : lightTheme,
    round,
    spacing,
  };

  // Methods.
  // App loading start.

  /**
   * ### Assets prefetch method.
   */
  const prefetch = async () => {
    const fonts = loadFonts([Ionicons.font]);
    await Promise.all([...fonts]);
  };

  /**
   * ### App loading loading start method.
   */
  const loadingStart = async () => {
    await prefetch();
    preload();
  };

  /**
   * ### App config preload method.
   */
  const preload = async () => {
    const token = await AsyncStorage.getItem(TOKEN);

    if (token) {
      states.tokenVar(token);
    }
  };

  /**
   * ### App loading loading finished method.
   */
  const onLoadingFinish = () => setReady(true);
  // App loading end.

  if (!ready) {
    return (
      <AppLoading
        startAsync={loadingStart}
        onError={console.error}
        onFinish={onLoadingFinish}
      />
    );
  }

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default CodePush(App);
