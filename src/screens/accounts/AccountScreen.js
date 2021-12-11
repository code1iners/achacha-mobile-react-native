import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { FlatList } from "react-native";
import HeaderRightTextButton from "../../components/headers/HeaderRightTextButton";
import { useQuery } from "@apollo/client";
import GET_ACCOUNTS_QUERY from "../../apollo/fetching/accounts/getAccounts.query";
import LoadingView from "../../components/LoadingView";
import AccountItem from "../../components/accounts/AccountItem";
import { ThemeText } from "../../utils/styles/styleUtils";
import states from "../../apollo/states";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const AccountListContainer = styled(FlatList)`
  flex: 1;
  width: 100%;
`;

const EmptyAccountText = styled(ThemeText)``;

const AccountScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch } = useQuery(GET_ACCOUNTS_QUERY);

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

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
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
      ) : data?.accounts?.length ? (
        <AccountListContainer
          data={data?.accounts}
          renderItem={renderItem}
          keyExtractor={(item) => item?.id + ""}
          showsVerticalScrollIndicator={false}
          onScrollBeginDrag={() => states.accountVerticalMovingVar(true)}
          onScrollEndDrag={() => states.accountVerticalMovingVar(false)}
          onRefresh={onRefresh}
          refreshing={refreshing}
        />
      ) : (
        <EmptyAccountText>No accounts...</EmptyAccountText>
      )}
    </Container>
  );
};

export default AccountScreen;
