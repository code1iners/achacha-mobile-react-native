import { PermissionsAndroid } from "react-native";

export const requestPermission = (permission) => {
  return PermissionsAndroid.request(permission);
};
