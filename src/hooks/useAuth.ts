import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import states from "../apollo/states";
import { TOKEN } from "../utils/constants";

/**
 * ### Store access token method.
 * @param {string} token User access token.
 */
export const userSignIn = async (token: string) => {
  // Store token in cache.
  states.tokenVar(token);
  // Store token in storage.
  await AsyncStorage.setItem(TOKEN, token);
};

/**
 * ### Remove access token method.
 */
export const userSignOut = () => {
  Alert.alert("Sign out", "Are you sure you want to sign out?", [
    {
      text: "OK",
      onPress: async () => {
        // Remove token in cache.
        states.tokenVar(null);
        // Remove token in storage.
        await AsyncStorage.removeItem(TOKEN);
      },
      style: "destructive",
    },
    {
      text: "Cancel",
      style: "cancel",
    },
  ]);
};
