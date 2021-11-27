import React, { useEffect } from "react";
import styled from "styled-components/native";
import useMe from "../../../hooks/useMe";
import HeaderRightTextButton from "../../../components/headers/HeaderRightTextButton";
import { ThemeText } from "../../../utils/styles/styleUtils";
import UserAvatar from "../../../components/UserAvatar";

const Container = styled.View``;

const UserInfoContainer = styled.View`
  padding: 20px;
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
        title: `${me?.username}'s Profile`,
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
      title: `${me?.username}'s Profile`,
      headerRight: () => {
        return <HeaderRightTextButton text="Edit" onPress={handleEditClick} />;
      },
      params: { me },
    });
  }, [me]);

  return (
    <Container>
      <UserInfoContainer>
        <UserAvatar avatar={me?.avatar} />

        <UserEmail>{me?.email}</UserEmail>
        <Username>{me?.username}</Username>
      </UserInfoContainer>
    </Container>
  );
};

export default ProfileScreen;
