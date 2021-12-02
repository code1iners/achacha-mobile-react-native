import React, { useRef } from "react";
import { Animated, PanResponder } from "react-native";
import styled from "styled-components/native";
import { FlexView, ThemeText } from "../../utils/styles/styleUtils";
import { colors, getIsDark } from "../../utils/themes/colors";
import { Ionicons } from "@expo/vector-icons";
import ColoredCircle from "../shared/ColoredCircle";
import { Alert, View } from "react-native";
import { useMutation } from "@apollo/client";
import DELETE_ACCOUNT_MUTATION from "../../apollo/fetching/accounts/deleteAccount.mutation";
import { useNavigation } from "@react-navigation/native";

const Container = styled(FlexView)`
  /* flex: 1; */
  align-items: center;
  margin: ${(props) =>
    props.isFirstItem ? "20px 20px 20px 20px" : "0 20px 20px 20px"};
`;

const DeleteAccountContainer = styled(
  Animated.createAnimatedComponent(FlexView)
)`
  height: 100%;
  position: absolute;
  right: -70px;
  align-items: center;
`;

const DeleteAccountText = styled.Text`
  color: ${colors.errorRed};
`;

const UpdateAccountContainer = styled(
  Animated.createAnimatedComponent(FlexView)
)`
  height: 100%;
  position: absolute;
  left: -70px;
  align-items: center;
`;

const UpdateAccountText = styled.Text`
  color: ${colors.yellow};
`;

const AccountContainer = styled(Animated.createAnimatedComponent(FlexView))`
  padding: 10px;
  border-radius: 10px;
  background-color: ${(props) =>
    props.isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"};
`;
const AccountThumbnailWrapper = styled.View``;
const AccountThumbnail = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 5px;
`;

const AccountInfoContainer = styled.View`
  flex: 1;
  justify-content: space-between;
  margin-left: 10px;
`;
const AccountInfoTopContainer = styled(FlexView)`
  justify-content: space-between;
  align-items: center;
`;
const AccountActionsContainer = styled(FlexView)``;

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
  id,
  thumbnail,
  title,
  subtitle,
  accountName,
  accountPassword,
  itemIndex,
}) => {
  const isDark = getIsDark;
  const isFirstItem = itemIndex === 0;
  const [deleteAccountMutation, { loading: deleteAccountLoading }] =
    useMutation(DELETE_ACCOUNT_MUTATION);
  const navigation = useNavigation();

  const position = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  // Animations start.

  const deleteAccountPosition = position.interpolate({
    inputRange: [-70, 70],
    outputRange: [-70, 70],
    extrapolate: "clamp",
  });

  const onPressIn = Animated.spring(scale, {
    toValue: 0.9,
    useNativeDriver: true,
  });

  const onPressOut = Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  });

  const itemOutRight = Animated.spring(position, {
    toValue: 400,
    useNativeDriver: true,
  });

  const itemOutLeft = Animated.spring(position, {
    toValue: -400,
    useNativeDriver: true,
  });

  const goOrigin = Animated.spring(position, {
    toValue: 0,
    useNativeDriver: true,
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        onPressIn.start();
      },
      onPanResponderMove: (_, { dx }) => {
        position.setValue(dx);
      },
      onPanResponderRelease: (evt, { dx }) => {
        const { item } = evt._targetInst.memoizedProps;
        if (dx < -200) {
          deleteAccount(item?.id);
          itemOutLeft.start();
        } else if (dx > 200) {
          handleEditClick({ ...item });
          Animated.parallel([goOrigin, onPressOut]).start();
        } else {
          Animated.parallel([goOrigin, onPressOut]).start();
        }
      },
    })
  ).current;

  // Animations end.

  // Methods.
  /**
   * ### Update account cache when finished delete item.
   */
  const updateDeleteAccount = (cache, result) => {
    try {
      const {
        data: { deleteAccount },
      } = result;

      if (deleteAccount?.ok) {
        Alert.alert("Succeed", "Successfully deleted the account item.", [
          {
            text: "OK",
            style: "destructive",
            onPress: () => {
              const accountId = `Account:${id}`;
              cache.modify({
                fields: {
                  accounts(previous) {
                    return previous.filter((item) => item?.__ref !== accountId);
                  },
                },
              });
            },
          },
        ]);
      } else {
        Alert.alert("Failed", deleteAccount?.error);
      }
    } catch (error) {
      console.error("[updateDeleteAccount]", error);
      Alert.alert("Warning", "Failed update cache about deleted account item.");
    }
  };

  /**
   * ### Run delete account mutation.
   */
  const deleteAccount = (id) => {
    if (deleteAccountLoading) return;

    deleteAccountMutation({
      variables: { id },
      update: updateDeleteAccount,
    });
  };

  // Handlers.
  /**
   * ### Delete account item event handler.
   */
  const handleDeleteClick = () => {
    Alert.alert(
      `Delete '${title}' account`,
      "Surely you want a delete account?",
      [
        {
          text: "OK",
          style: "destructive",
          onPress: () => deleteAccount(id),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };

  /**
   * ### Edit account item event handler.
   */
  const handleEditClick = ({
    id,
    thumbnail,
    title,
    subtitle,
    accountName,
    accountPassword,
  }) => {
    navigation.navigate("StackNavigators", {
      screen: "AccountUpdateScreen",
      params: {
        account: {
          id,
          thumbnail,
          title,
          subtitle,
          accountName,
          accountPassword,
        },
      },
    });
  };

  return (
    <Container isFirstItem={isFirstItem}>
      <DeleteAccountContainer
        style={{ transform: [{ translateX: deleteAccountPosition }] }}
      >
        <DeleteAccountText>Delete</DeleteAccountText>
      </DeleteAccountContainer>
      <UpdateAccountContainer
        style={{ transform: [{ translateX: deleteAccountPosition }] }}
      >
        <UpdateAccountText>Update</UpdateAccountText>
      </UpdateAccountContainer>

      <AccountContainer
        {...panResponder.panHandlers}
        isDark={isDark}
        style={{
          transform: [
            {
              translateX: position,
            },
            { scale },
          ],
        }}
        item={{ id, thumbnail, title, subtitle, accountName, accountPassword }}
      >
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
          <AccountInfoTopContainer>
            <AccountTitleWrapper>
              <AccountTitle>{title}</AccountTitle>
              <AccountSubtitle>{subtitle}</AccountSubtitle>
            </AccountTitleWrapper>

            <AccountActionsContainer>
              {/* Edit button */}
              <ColoredCircle
                color={colors.yellow}
                onPress={() =>
                  handleEditClick({
                    id,
                    thumbnail,
                    title,
                    subtitle,
                    accountName,
                    accountPassword,
                  })
                }
              />
              {/* Spacing */}
              <View style={{ marginRight: 10 }} />
              {/* Delete button */}
              <ColoredCircle
                color={colors.errorRed}
                onPress={handleDeleteClick}
              />
            </AccountActionsContainer>
          </AccountInfoTopContainer>

          <AccountInfoWrapper>
            <AccountName>{accountName}</AccountName>
            <AccountPassword>{accountPassword}</AccountPassword>
          </AccountInfoWrapper>
        </AccountInfoContainer>
      </AccountContainer>
    </Container>
  );
};

export default AccountItem;
