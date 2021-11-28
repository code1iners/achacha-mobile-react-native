import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { colors, getIsDark } from "../../utils/themes/colors";
import InputWithLabel from "../../components/InputWithLabel";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useForm } from "react-hook-form";
import HeaderRightTextButton from "../../components/headers/HeaderRightTextButton";
import { useMutation } from "@apollo/client";
import CREATE_ACCOUNT_MUTATION from "../../apollo/fetching/accounts/createAccount/createAccount.mutation";
import { createFile } from "../../utils/fileUtils";
import { Alert } from "react-native";
import { gql } from "@apollo/client";

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

const AccountCreateScreen = ({ route: { params }, navigation, from }) => {
  const isDark = getIsDark();

  const [titleError, setTitleError] = useState();
  const [accountNameError, setAccountNameError] = useState();
  const [accountPasswordError, setAccountPasswordError] = useState();

  const { register, setValue, watch, handleSubmit } = useForm();

  const titleRef = useRef();
  const subtitleRef = useRef();
  const accountNameRef = useRef();
  const accountPasswordRef = useRef();

  const [createAccountMutation, { loading: createAccountLoading }] =
    useMutation(CREATE_ACCOUNT_MUTATION);

  const headerRight = () => (
    <HeaderRightTextButton
      text="Create"
      onPress={handleSubmit(onValid, onInvalid)}
    />
  );

  // Methods.
  /**
   * ### Create account.
   */
  const updateCreateAccount = (cache, { data }) => {
    try {
      const { createAccount } = data;

      if (createAccount?.ok) {
        const accountFragment = cache.writeFragment({
          fragment: gql`
            fragment NewAccount on Account {
              title
              subtitle
              accountName
              accountPassword
              thumbnail
            }
          `,
          data: createAccount?.data,
        });

        cache.modify({
          fields: {
            accounts(previous) {
              return [...previous, accountFragment];
            },
          },
        });

        Alert.alert(
          "Succeed",
          "Successfully created a new account information.",
          [
            {
              text: "OK",
              style: "destructive",
              onPress: () => navigation.pop(),
            },
          ]
        );
      } else {
        Alert.alert(
          "Warning",
          createAccount?.error || "Failed create account."
        );
      }
    } catch (error) {
      console.error("[updateCreateAccount]", error);
    }
  };

  /**
   * ### Error clear method.
   */
  const errorClear = () => {
    setTitleError("");
    setAccountNameError("");
    setAccountPasswordError("");
  };

  /**
   * ### Create valid handling method.
   */
  const onValid = async ({ title, subtitle, accountName, accountPassword }) => {
    errorClear();

    let thumbnail;
    if (params?.selectedPhoto) {
      thumbnail = createFile({
        uri: params?.selectedPhoto,
        name: "account",
      });
    }

    if (!createAccountLoading) {
      await createAccountMutation({
        variables: {
          title,
          subtitle,
          accountName,
          accountPassword,
          ...(thumbnail && { thumbnail }),
        },
        update: updateCreateAccount,
      });
    }
  };

  /**
   * ### Create invalid handling method.
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
        from: "AccountCreateScreen",
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
    navigation.setOptions({
      headerRight,
    });
  }, [params]);

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
        />
      </Form>
    </Container>
  );
};

export default AccountCreateScreen;
