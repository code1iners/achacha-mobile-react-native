import React from "react";
import styled from "styled-components/native";
import { FlatList } from "react-native";
import { ThemeText } from "../../utils/styles/styleUtils";
import { settingMenus } from "../../utils/settings/settingMenus";
import SettingItem from "../../components/settings/SettingItem";
import { userDelete, userSignOut } from "../../hooks/useAuth";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";

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

const SettingScreen = () => {
  const renderItem = ({ item }) => <SettingItem {...item} />;
  const deleteUserMutation = useMutation(DELETE_USER_MUTATION);

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
        },
        {
          title: "Sign out",
          type: "function",
          function: () => userSignOut(),
        },
        {
          title: "Delete account",
          type: "function",
          function: () => userDelete(deleteUserMutation),
        },
      ],
    },
  ];

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
