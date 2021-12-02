import React, { useEffect, useRef, useState } from "react";
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

const Background = styled(Animated.View)`
  position: absolute;
  left: -50%;
  width: 200%;
  height: 100%;
  flex: 1;
`;

const DeleteAccountContainer = styled(
  Animated.createAnimatedComponent(FlexView)
)`
  height: 100%;
  position: absolute;
  right: -70px;
  align-items: center;
`;

const DeleteAccountText = styled(Animated.Text)`
  color: white;
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
  color: white;
`;

const AccountContainer = styled(Animated.createAnimatedComponent(FlexView))`
  padding: 10px;
  border: 1px solid
    ${(props) =>
      props.isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"};
  border-radius: 10px;
  background-color: ${(props) => (props.isDark ? colors.black : colors.white)};
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

const AccountItem = (params) => {
  const [id, setId] = useState(params?.id);
  const [thumbnail, setThumbnail] = useState(params?.thumbnail);
  const [title, setTitle] = useState(params?.title);
  const [subtitle, setSubtitle] = useState(params?.subtitle);
  const [accountName, setAccountName] = useState(params?.accountName);
  const [accountPassword, setAccountPassword] = useState(
    params?.accountPassword
  );
  const [itemIndex, setItemIndex] = useState(params?.itemIndex);

  const isDark = getIsDark();
  const isFirstItem = itemIndex === 0;
  const [deleteAccountMutation, { loading: deleteAccountLoading }] =
    useMutation(DELETE_ACCOUNT_MUTATION);
  const navigation = useNavigation();

  const position = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  // Animations start.

  const backgroundColor = position.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: [colors.errorRed, "rgba(0, 0, 0, 0)", colors.yellow],
    extrapolate: "clamp",
  });

  const deleteAccountPosition = position.interpolate({
    inputRange: [-100, 100],
    outputRange: [-100, 100],
    extrapolate: "clamp",
  });

  const opacity = position.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: [1, 0, 1],
    extrapolate: "clamp",
  });

  const onPressIn = Animated.spring(scale, {
    toValue: 0.9,
    useNativeDriver: false,
  });

  const onPressOut = Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: false,
  });

  const itemOutRight = Animated.spring(position, {
    toValue: 400,
    useNativeDriver: false,
  });

  const itemOutLeft = Animated.spring(position, {
    toValue: -400,
    useNativeDriver: false,
  });

  const goCenter = Animated.spring(position, {
    toValue: 0,
    useNativeDriver: false,
    tension: 1,
  });

  const goOrigin = Animated.parallel([goCenter, onPressOut]);

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
        if (dx < -100) {
          handleDeleteClick(item?.id);
          itemOutLeft.start();
        } else if (dx > 100) {
          handleEditClick({ ...item });
          itemOutRight.start(() => goOrigin.start());
        } else {
          goOrigin.start();
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
  const handleDeleteClick = (id) => {
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
          onPress: () => goOrigin.start(),
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

  // Watch.
  useEffect(() => {
    setId(params?.id);
    setThumbnail(params?.thumbnail);
    setTitle(params?.title);
    setSubtitle(params?.subtitle);
    setAccountName(params?.accountName);
    setAccountPassword(params?.accountPassword);
    setItemIndex(params?.itemIndex);
  }, [params]);

  return (
    <Container isFirstItem={isFirstItem}>
      <Background
        style={{
          backgroundColor,
          transform: [{ scale: scale.__getValue() - 0.125 }],
        }}
      />

      <DeleteAccountContainer
        style={{ opacity, transform: [{ translateX: deleteAccountPosition }] }}
      >
        <DeleteAccountText>Delete</DeleteAccountText>
      </DeleteAccountContainer>

      <UpdateAccountContainer
        style={{ opacity, transform: [{ translateX: deleteAccountPosition }] }}
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
                onPress={() => handleDeleteClick(id)}
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
