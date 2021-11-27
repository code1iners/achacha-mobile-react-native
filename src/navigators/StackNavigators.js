import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/settings/profiles/ProfileScreen";
import { colors, getIsDark } from "../utils/themes/colors";
import ProfileEditScreen from "../screens/settings/profiles/ProfileEditScreen";

const Stack = createNativeStackNavigator();

const StackNavigators = () => {
  const isDark = getIsDark();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: isDark ? colors.black : colors.white,
        },
        headerTintColor: isDark ? colors.darkTextColor : colors.lightTextColor,
        headerTitleStyle: {
          color: isDark ? colors.darkTextColor : colors.lightTextColor,
        },
        headerTitleAlign: "center",

        contentStyle: {
          backgroundColor: colors.black,
        },
      }}
    >
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen
        options={{
          title: "Profile Edit",
        }}
        name="ProfileEditScreen"
        component={ProfileEditScreen}
      />
    </Stack.Navigator>
  );
};

export default StackNavigators;
