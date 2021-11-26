import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import states from "../apollo/states";
import { TOKEN } from "../utils/constants";

/**
 * ### Store access token method.
 * @param {string} token User access token.
 */
export const userSignIn = async (token) => {
  try {
    // Store token in cache.
    states.tokenVar(token);
    // Store token in storage.
    await AsyncStorage.setItem(TOKEN, token);
  } catch (error) {
    console.error("[userSignIn]", error);
  }
};

/**
 * ### Remove access token method.
 */
export const userSignOut = async ({ asking = true }) => {
  try {
    if (asking) {
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
    } else {
      // Remove token in cache.
      states.tokenVar(null);
      // Remove token in storage.
      await AsyncStorage.removeItem(TOKEN);
    }
  } catch (error) {
    console.error("[userSignOut]", error);
  }
};

/**
 *
 * @param {*} deleteFunction
 */
export const userDelete = (deleteFunction) => {
  try {
    Alert.alert("Delete user", "Are you sure you want to delete account?", [
      {
        text: "OK",
        onPress: async () => {
          const [deleteUserMutation, { loading }] = deleteFunction;
          if (!loading) {
            const {
              data: { deleteUser },
            } = await deleteUserMutation();
            if (deleteUser?.ok) {
              userSignOut({
                asking: false,
              });
            } else {
              Alert.alert("Delete user", deleteUser?.error);
            }
          }
        },
        style: "destructive",
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  } catch (error) {
    console.error("[userDelete]", error);
  }
};
