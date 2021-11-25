import { useColorScheme } from "react-native";

export const colors = {
  accentColor: "#2ecc71",
};

export const lightTheme = {
  mainBackgroundColor: "#ffffff",
  textColor: "#1e272e",
  primary: "#02343F",
  secondary: "#F0EDCC",
  ...colors,
};

export const darkTheme = {
  mainBackgroundColor: "#1e272e",
  textColor: "#D2D0CA",
  primary: "#F0EDCC",
  secondary: "#02343F",
  ...colors,
};

export const getIsDark = () => useColorScheme() === "dark";
