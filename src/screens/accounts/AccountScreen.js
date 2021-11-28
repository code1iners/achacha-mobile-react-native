import React, { useEffect } from "react";
import styled from "styled-components/native";
import { View, Text } from "react-native";
import HeaderRightTextButton from "../../components/headers/HeaderRightTextButton";
import { gql } from "@apollo/client";

const GET_ACCOUNTS_QUERY = gql`
  query getAccount($page: Int!) {
    getAccount(page: $page) {
      id
      title
      subtitle
      thumbnail
      accountName
      accountPassword
      user
      userId
      createdAt
      updatedAt
    }
  }
`;

const Container = styled.View``;

const AccountScreen = ({ navigation }) => {
  const headerRight = () => (
    <HeaderRightTextButton text="Add" onPress={handleAddClick} />
  );

  // Handlers.
  const handleAddClick = () => {
    navigation.navigate("StackNavigators", {
      screen: "AccountCreateScreen",
    });
  };

  // Watch.
  useEffect(() => {
    navigation.setOptions({
      headerRight,
    });
  }, []);

  return (
    <Container>
      <View>
        <Text>AccountScreen</Text>
      </View>
    </Container>
  );
};

export default AccountScreen;
