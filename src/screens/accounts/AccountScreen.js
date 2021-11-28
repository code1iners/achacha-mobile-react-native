import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { View, Text, FlatList } from "react-native";
import HeaderRightTextButton from "../../components/headers/HeaderRightTextButton";
import { gql, useQuery } from "@apollo/client";
import GET_ACCOUNTS_QUERY from "../../apollo/fetching/accounts/getAccounts/getAccounts.query";
import { FlexView, ThemeText } from "../../utils/styles/styleUtils";
import { Ionicons } from "@expo/vector-icons";
import SpacingSeparator from "../../components/SpacingSeparator";
import { colors, getIsDark } from "../../utils/themes/colors";
import LoadingView from "../../components/LoadingView";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const AccountListContainer = styled(FlatList)`
  flex: 1;
  width: 100%;
`;

const AccountItemContainer = styled(FlexView)`
  margin: ${(props) =>
    props.isFirstItem ? "20px 20px 20px 20px" : "0 20px 20px 20px"};
  padding: 10px;
  border-radius: 10px;
  background-color: ${(props) =>
    props.isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"};
  align-items: center;
`;
const AccountThumbnailWrapper = styled.View``;
const AccountThumbnail = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 5px;
`;

const AccountInfoContainer = styled.View`
  justify-content: space-between;
  margin-left: 10px;
`;
const AccountTitleWrapper = styled(FlexView)`
  align-items: center;
`;
const AccountTitle = styled(ThemeText)`
  font-size: 16px;
  letter-spacing: 1.5px;
`;
const AccountSubtitle = styled(ThemeText)`
  font-size: 14px;
  margin-left: 10px;
  opacity: 0.8;
`;
const AccountInfoWrapper = styled.View`
  margin-top: 5px;
`;
const AccountName = styled(ThemeText)`
  font-size: 12px;
`;
const AccountPassword = styled(ThemeText)`
  font-size: 12px;
  opacity: 0.8;
`;

const AccountScreen = ({ navigation }) => {
  const isDark = getIsDark();
  const { data, loading, error } = useQuery(GET_ACCOUNTS_QUERY);

  const headerRight = () =>
    loading ? null : (
      <HeaderRightTextButton text="Add" onPress={handleAddClick} />
    );

  const renderItem = ({ item, index }) => {
    const isFirstItem = index === 0;
    return (
      <AccountItemContainer isDark={isDark} isFirstItem={isFirstItem}>
        <AccountThumbnailWrapper>
          {item?.thumbnail ? (
            <AccountThumbnail
              source={{
                uri: item?.thumbnail,
              }}
            />
          ) : (
            <Ionicons name="image-outline" size={50} />
          )}
        </AccountThumbnailWrapper>

        <AccountInfoContainer>
          <AccountTitleWrapper>
            <AccountTitle>{item?.title}</AccountTitle>
            <AccountSubtitle>{item?.subtitle}</AccountSubtitle>
          </AccountTitleWrapper>

          <AccountInfoWrapper>
            <AccountName>{item?.accountName}</AccountName>
            <AccountPassword>{item?.accountPassword}</AccountPassword>
          </AccountInfoWrapper>
        </AccountInfoContainer>
      </AccountItemContainer>
    );
  };

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
