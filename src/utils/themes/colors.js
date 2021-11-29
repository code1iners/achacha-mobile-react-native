import { useColorScheme } from "react-native";

export const colors = {
  accentColor: "#2ecc71",
  blue: "#0652DD",
  yellow: "#feb024",
  errorRed: "#fd4646",

  black: "#1e272e",
  darkTextColor: "#D2D0CA",
  darkPrimary: "#F0EDCC",
  darkSecondary: "#02343F",

  white: "#ffffff",
  lightTextColor: "#1e272e",
  lightPrimary: "#02343F",
  lightSecondary: "#F0EDCC",
};

export const lightTheme = {
  mainBackgroundColor: colors.white,
  textColor: colors.lightTextColor,
  primary: colors.lightPrimary,
  secondary: colors.lightSecondary,
  ...colors,
};

export const darkTheme = {
  mainBackgroundColor: colors.black,
  textColor: colors.darkTextColor,
  primary: colors.darkPrimary,
  secondary: colors.darkSecondary,
  ...colors,
};

export const getIsDark = () => useColorScheme() === "dark";
