import React, { useEffect } from "react";
import styled from "styled-components/native";
import { FlatList } from "react-native";
import SettingItem from "../../components/settings/SettingItem";
import { userDelete, userSignOut } from "../../hooks/useAuth";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import { colors, getIsDark } from "../../utils/themes/colors";

const DELETE_USER_MUTATION = gql`
  mutation deleteUser {
    deleteUser {
      ok
      error
    }
  }
`;

const Container = styled.View``;

const ItemSeparator = styled.View`
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.2);
`;

const SettingScreen = ({ navigation }) => {
  const renderItem = ({ item }) => <SettingItem {...item} />;
  const deleteUserMutation = useMutation(DELETE_USER_MUTATION);
  const isDark = getIsDark();

  /**
   * ### Setting screen menus.
   */
  const settingMenus = [
    {
      id: 1,
      label: "Profile",
      contents: [
        {
          title: "Me",
          type: "component",
          componentName: "ProfileScreen",
          color: isDark ? colors.white : colors.black,
        },
        {
          title: "Sign out",
          type: "function",
          function: () => userSignOut(),
          color: isDark ? colors.white : colors.black,
        },
        {
          title: "Delete account",
          type: "function",
          function: () => userDelete(deleteUserMutation),
          color: colors.errorRed,
        },
      ],
    },
  ];

  // Watch.

  return (
    <Container>
      <FlatList
        data={settingMenus}
        renderItem={renderItem}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={ItemSeparator}
      />
    </Container>
  );
};

export default SettingScreen;
