import React from "react";
import styled from "styled-components/native";
import { FlexView, ThemeText } from "../../utils/styles/styleUtils";
import { getIsDark } from "../../utils/themes/colors";
import { Ionicons } from "@expo/vector-icons";

const Container = styled(FlexView)`
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

const AccountItem = ({
  thumbnail,
  title,
  subtitle,
  accountName,
  accountPassword,
  itemIndex,
}) => {
  const isDark = getIsDark;
  const isFirstItem = itemIndex === 0;
  return (
    <Container isDark={isDark} isFirstItem={isFirstItem}>
      <AccountThumbnailWrapper>
        {thumbnail ? (
          <AccountThumbnail
            source={{
              uri: thumbnail,
            }}
          />
        ) : (
          <Ionicons name="image-outline" size={50} />
        )}
      </AccountThumbnailWrapper>

      <AccountInfoContainer>
        <AccountTitleWrapper>
          <AccountTitle>{title}</AccountTitle>
          <AccountSubtitle>{subtitle}</AccountSubtitle>
        </AccountTitleWrapper>

        <AccountInfoWrapper>
          <AccountName>{accountName}</AccountName>
          <AccountPassword>{accountPassword}</AccountPassword>
        </AccountInfoWrapper>
      </AccountInfoContainer>
    </Container>
  );
};

export default AccountItem;
