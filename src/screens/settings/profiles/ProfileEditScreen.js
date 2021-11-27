import React, { useEffect, useRef } from "react";
import styled from "styled-components/native";
import { View, Text, Keyboard, Alert } from "react-native";
import InputWithLabel from "../../../components/InputWithLabel";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useForm } from "react-hook-form";
import HorizontalButton from "../../../components/HorizontalButton";
import HeaderRightTextButton from "../../../components/headers/HeaderRightTextButton";
import { gql, useMutation } from "@apollo/client";

const PROFILE_UPDATE_MUTATION = gql`
  mutation updateProfile(
    $firstName: String
    $lastName: String
    $email: String
    $username: String
    $password: String
    $avatar: Upload
  ) {
    updateProfile(
      firstName: $firstName
      lastName: $lastName
      email: $email
      username: $username
      password: $password
      avatar: $avatar
    ) {
      ok
      error
      data {
        id
        email
        username
        avatar
      }
    }
  }
`;

const Container = styled.TouchableWithoutFeedback``;

const Form = styled(KeyboardAwareScrollView)`
  padding: 20px;
`;

const ProfileEditScreen = ({ route, navigation }) => {
  const { register, setValue, watch, handleSubmit, getValues } = useForm();
  const [profileUpdateMutation, { loading: profileUpdateLoading }] =
    useMutation(PROFILE_UPDATE_MUTATION);

  const emailRef = useRef();
  const usernameRef = useRef();

  // Methods.
  const handleSelectPhotoClick = () => {
    console.log("Go select photo screen.");
  };

  const handleSaveClick = async () => {
    try {
      if (profileUpdateLoading) return;

      const email = getValues("email");
      const username = getValues("username");

      profileUpdateMutation({
        variables: {
          ...(email && { email }),
          ...(username && { username }),
        },
        update: profileUpdated,
      });
    } catch (error) {}
  };

  const profileUpdated = (cache, result) => {
    try {
      const {
        data: { updateProfile },
      } = result;

      if (updateProfile?.ok) {
        const { email, username, avatar } = updateProfile?.data;

        setValue("email", email);
        setValue("username", username);

        cache.modify({
          id: cache.identify(updateProfile?.data),
          fields: {
            email() {
              return email;
            },
            username() {
              return username;
            },
            avatar() {
              return avatar;
            },
          },
        });

        Alert.alert("Succeed.", "Successfully updated your profile.", [
          {
            text: "OK",
            style: "destructive",
            onPress: () => navigation.pop(),
          },
        ]);
      } else {
        Alert.alert("Failed update profile", updateProfile?.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Watch.
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <HeaderRightTextButton text="Save" onPress={handleSaveClick} />;
      },
    });
  }, []);

  useEffect(() => {
    register("email");
    register("username");

    if (route?.params) {
      const { email, username } = route?.params?.me;
      setValue("email", email);
      setValue("username", username);
    }
  }, [register]);

  return (
    <Container onPress={() => Keyboard.dismiss()}>
      <Form>
        <InputWithLabel
          reference={emailRef}
          label="email"
          placeholder="Enter email.."
          hasMarginBottom={true}
          onChangeText={(text) => setValue("email", text)}
          value={watch("email")}
          returnKeyType="next"
          textContentType="emailAddress"
          onSubmitEditing={() => usernameRef.current?.focus()}
        />

        <InputWithLabel
          reference={usernameRef}
          label="Username"
          placeholder="Enter username.."
          hasMarginBottom={true}
          onChangeText={(text) => setValue("username", text)}
          value={watch("username")}
          returnKeyType="done"
          textContentType="username"
        />

        <HorizontalButton
          text="Select photo"
          onPress={handleSelectPhotoClick}
        />
      </Form>
    </Container>
  );
};

export default ProfileEditScreen;
