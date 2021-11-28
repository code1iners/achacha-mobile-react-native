import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { FlatList } from "react-native";
import HeaderRightTextButton from "../../components/headers/HeaderRightTextButton";
import { useQuery } from "@apollo/client";
import GET_ACCOUNTS_QUERY from "../../apollo/fetching/accounts/getAccounts/getAccounts.query";
import LoadingView from "../../components/LoadingView";
import AccountItem from "../../components/accounts/AccountItem";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const AccountListContainer = styled(FlatList)`
  flex: 1;
  width: 100%;
`;

const AccountScreen = ({ navigation }) => {
  const { data, loading, error } = useQuery(GET_ACCOUNTS_QUERY);

  const headerRight = () =>
    loading ? null : (
      <HeaderRightTextButton text="Add" onPress={handleAddClick} />
    );

  const renderItem = ({ item, index }) => (
    <AccountItem {...item} itemIndex={index} />
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

  useEffect(() => {
    navigation.setOptions({
      headerRight,
    });
  }, [loading]);

  return (
    <Container>
      {loading ? (
        <LoadingView />
      ) : (
        <AccountListContainer
          data={data?.accounts}
          renderItem={renderItem}
          keyExtractor={(item) => item?.id + ""}
          showsVerticalScrollIndicator={false}
        />
      )}
    </Container>
  );
};

export default AccountScreen;
