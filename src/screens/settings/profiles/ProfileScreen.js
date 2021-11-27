import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useMe from "../../../hooks/useMe";
import HeaderRightTextButton from "../../../components/headers/HeaderRightTextButton";
import { FlexView, ThemeText } from "../../../utils/styles/styleUtils";
import { colors, getIsDark } from "../../../utils/themes/colors";
import { useFocusEffect } from "@react-navigation/core";

const Container = styled.View``;

const UserInfoContainer = styled.View`
  padding: 20px;
`;
const UserAvatarWrapper = styled(FlexView)`
  justify-content: center;
  align-items: center;
  padding: 20px 20px 0;
`;
const UserAvatar = styled.Image`
  width: 150px;
  height: 150px;
`;
const UserEmail = styled(ThemeText)`
  font-size: 20px;
  text-align: center;
  opacity: 0.5;
  letter-spacing: 2px;
`;
const Username = styled(ThemeText)`
  text-align: center;
  font-size: 24px;
  letter-spacing: 2px;
`;

const ProfileScreen = ({ navigation }) => {
  const me = useMe();
  const isDark = getIsDark();

  // Methods.
  const handleEditClick = () => {
    navigation.navigate("StackNavigators", {
      screen: "ProfileEditScreen",
      params: { me },
    });
  };

  // Watch.
  useEffect(() => {
    if (me) {
      navigation.setOptions({
        title: me?.username,
        headerRight: () => {
          return (
            <HeaderRightTextButton text="Edit" onPress={handleEditClick} />
          );
        },
      });
    }
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: me?.username,
      headerRight: () => {
        return <HeaderRightTextButton text="Edit" onPress={handleEditClick} />;
      },
      params: { me },
    });
  }, [me]);

  return (
    <Container>
      <UserInfoContainer>
        <UserAvatarWrapper>
          {/* Avatar */}
          {me?.avatar ? (
            <UserAvatar
              source={{
                uri: me?.avatar,
              }}
            />
          ) : (
            <Ionicons
              name="person-circle-outline"
              color={isDark ? colors.darkTextColor : colors.lightTextColor}
              size={150}
            />
          )}
        </UserAvatarWrapper>

        <UserEmail>{me?.email}</UserEmail>
        <Username>{me?.username}</Username>
      </UserInfoContainer>
    </Container>
  );
};

export default ProfileScreen;
