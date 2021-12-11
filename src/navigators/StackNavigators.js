import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/settings/profiles/ProfileScreen";
import { colors, getIsDark } from "../utils/themes/colors";
import ProfileEditScreen from "../screens/settings/profiles/ProfileEditScreen";
import AccountCreateScreen from "../screens/accounts/AccountCreateScreen";
import AccountUpdateScreen from "../screens/accounts/AccountUpdateScreen";

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
          backgroundColor: isDark ? colors.black : colors.white,
        },
      }}
    >
      {/* Profile start. */}
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen
        options={{
          title: "Profile Edit",
        }}
        name="ProfileEditScreen"
        component={ProfileEditScreen}
      />
      {/* Profile end. */}

      {/* Account start. */}
      <Stack.Screen
        options={{
          title: "Account Create",
        }}
        name="AccountCreateScreen"
        component={AccountCreateScreen}
      />
      <Stack.Screen
        options={{
          title: "Account Update",
        }}
        name="AccountUpdateScreen"
        component={AccountUpdateScreen}
      />
      {/* Account end. */}
    </Stack.Navigator>
  );
};

export default StackNavigators;
