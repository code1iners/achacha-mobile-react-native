import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { colors, getIsDark } from "../../utils/themes/colors";
import InputWithLabel from "../../components/InputWithLabel";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useForm } from "react-hook-form";
import HeaderRightTextButton from "../../components/headers/HeaderRightTextButton";
import { useMutation } from "@apollo/client";
import { createFile } from "../../utils/fileUtils";
import { Alert } from "react-native";
import LoadingView from "../../components/LoadingView";
import UPDATE_ACCOUNT_MUTATION from "../../apollo/fetching/accounts/updateAccount.mutation";

const Container = styled(KeyboardAwareScrollView)`
  flex: 1;
`;

const ThumbnailWrapper = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  padding: 20px 20px 0;
`;
const ThumbnailImage = styled.Image`
  border-radius: 1000px;
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};
`;

const Form = styled.View`
  padding: 20px;
  flex: 1;
`;

const AccountUpdateScreen = ({ route: { params }, navigation }) => {
  const isDark = getIsDark();

  const [titleError, setTitleError] = useState();
  const [accountNameError, setAccountNameError] = useState();
  const [accountPasswordError, setAccountPasswordError] = useState();

  const { register, setValue, watch, handleSubmit } = useForm();

  const [updateAccountMutation, { loading: updateAccountLoading }] =
    useMutation(UPDATE_ACCOUNT_MUTATION);

  const titleRef = useRef();
  const subtitleRef = useRef();
  const accountNameRef = useRef();
  const accountPasswordRef = useRef();

  /**
   * ### Header right component.
   */
  const headerRight = () =>
    updateAccountLoading ? (
      <LoadingView />
    ) : (
      <HeaderRightTextButton
        text="Update"
        onPress={handleSubmit(onValid, onInvalid)}
      />
    );

  // Methods.
  /**
   * ### Error clear method.
   */
  const errorClear = () => {
    setTitleError("");
    setAccountNameError("");
    setAccountPasswordError("");
  };

  const updateUpdatedAccount = (cache, result) => {
    try {
      const {
        data: { updateAccount },
      } = result;

      if (updateAccount?.ok) {
        const { title, subtitle, accountName, accountPassword, thumbnail } =
          updateAccount?.data;

        cache.modify({
          id: cache.identify(updateAccount?.data),
          fields: {
            title() {
              return title;
            },
            subtitle() {
              return subtitle;
            },
            accountName() {
              return accountName;
            },
            accountPassword() {
              return accountPassword;
            },
            thumbnail() {
              return thumbnail;
            },
          },
        });

        Alert.alert("Succeed", "Successfully updated the account item.", [
          {
            text: "OK",
            style: "destructive",
            onPress: () => navigation.pop(),
          },
        ]);
      } else {
        Alert.alert("Failed", updateAccount?.error);
      }
    } catch (error) {
      console.error("[updateUpdatedAccount]", error);
      Alert.alert("Warning", "Failed updated account cache.");
    }
  };

  /**
   * ### Update valid handling method.
   */
  const onValid = async ({ title, subtitle, accountName, accountPassword }) => {
    try {
      if (updateAccountLoading) return;

      errorClear();

      let thumbnail;
      if (params?.selectedPhoto) {
        thumbnail = createFile({
          uri: params?.selectedPhoto,
          name: "account",
        });
      }
      await updateAccountMutation({
        variables: {
          id: params?.account.id,
          title,
          subtitle,
          accountName,
          accountPassword,
          ...(thumbnail && { thumbnail }),
        },
        update: updateUpdatedAccount,
      });
    } catch (error) {
      console.error("[onValid]", error);
    }
  };

  /**
   * ### Update invalid handling method.
   */
  const onInvalid = ({ title, accountName, accountPassword }) => {
    errorClear();

    if (title) {
      setTitleError("Title is required.");
    }

    if (accountName) {
      setAccountNameError("Account name is required.");
    }

    if (accountPassword) {
      setAccountPasswordError("Account password is required.");
    }
  };

  // Handlers.
  const handleThumbnailClick = () => {
    navigation.navigate("StackNavigators", {
      screen: "SelectPhotoScreen",
      params: {
        from: "AccountUpdateScreen",
        ...(params?.account && { account: params?.account }),
      },
    });
  };

  // Watch.
  useEffect(() => {
    navigation.setOptions({
      headerRight,
    });
  }, []);

  useEffect(() => {
    console.log(params);
    navigation.setOptions({
      headerRight,
    });
  }, [params, updateAccountLoading]);

  useEffect(() => {
    register("title", {
      required: true,
    });
    register("subtitle");
    register("accountName", {
      required: true,
    });
    register("accountPassword", {
      required: true,
    });

    setValue("title", params?.account.title);
    setValue("subtitle", params?.account.subtitle);
    setValue("accountName", params?.account.accountName);
    setValue("accountPassword", params?.account.accountPassword);
  }, [register]);

  return (
    <Container>
      <ThumbnailWrapper onPress={handleThumbnailClick}>
        {params?.selectedPhoto ? (
          <ThumbnailImage
            source={{ uri: params?.selectedPhoto }}
            width={150}
            height={150}
          />
        ) : params?.account.thumbnail ? (
          <ThumbnailImage
            source={{ uri: params?.account.thumbnail }}
            width={150}
            height={150}
          />
        ) : (
          <Ionicons
            name="image-outline"
            size={150}
            color={isDark ? colors.darkTextColor : colors.lightTextColor}
          />
        )}
      </ThumbnailWrapper>

      <Form>
        <InputWithLabel
          reference={titleRef}
          label="title"
          placeholder="Enter title.."
          returnKeyType="next"
          hasMarginBottom={true}
          onChangeText={(text) => setValue("title", text)}
          value={watch("title")}
          onSubmitEditing={() => subtitleRef.current?.focus()}
          error={titleError}
          editable={!updateAccountLoading}
        />

        <InputWithLabel
          reference={subtitleRef}
          label="subtitle"
          placeholder="Enter subtitle.."
          returnKeyType="next"
          hasMarginBottom={true}
          onChangeText={(text) => setValue("subtitle", text)}
          value={watch("subtitle")}
          onSubmitEditing={() => accountNameRef.current?.focus()}
          editable={!updateAccountLoading}
        />

        <InputWithLabel
          reference={accountNameRef}
          label="account name"
          placeholder="Enter account name.."
          returnKeyType="next"
          hasMarginBottom={true}
          onChangeText={(text) => setValue("accountName", text)}
          value={watch("accountName")}
          onSubmitEditing={() => accountPasswordRef.current?.focus()}
          error={accountNameError}
          editable={!updateAccountLoading}
        />

        <InputWithLabel
          reference={accountPasswordRef}
          label="account password"
          placeholder="Enter account password.."
          returnKeyType="next"
          hasMarginBottom={true}
          onChangeText={(text) => setValue("accountPassword", text)}
          value={watch("accountPassword")}
          onSubmitEditing={handleSubmit(onValid, onInvalid)}
          error={accountPasswordError}
          editable={!updateAccountLoading}
        />
      </Form>
    </Container>
  );
};

export default AccountUpdateScreen;
