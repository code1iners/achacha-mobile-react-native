import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { Keyboard, Alert } from "react-native";
import InputWithLabel from "../../../components/InputWithLabel";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useForm } from "react-hook-form";
import HorizontalButton from "../../../components/HorizontalButton";
import HeaderRightTextButton from "../../../components/headers/HeaderRightTextButton";
import { gql, useMutation } from "@apollo/client";
import UserAvatar from "../../../components/UserAvatar";
import { ReactNativeFile } from "extract-files";
import LoadingView from "../../../components/LoadingView";
import useImage, { GRANTED, DENIED, NEVER_ASK_AGAIN } from "@ce1pers/use-image";

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

const ProfileEditScreen = ({ route: { params }, navigation }) => {
  const [selectedPhoto, setSelectedPhoto] = useState();

  const { register, setValue, watch, handleSubmit, getValues } = useForm();
  const [profileUpdateMutation, { loading: profileUpdateLoading }] =
    useMutation(PROFILE_UPDATE_MUTATION);

  const emailRef = useRef();
  const usernameRef = useRef();

  // const { checkPermission, selectImage, openSetting } = useImage();
  const { checkPermission, selectImage, openSetting } = useImage();

  const headerRight = () =>
    profileUpdateLoading ? (
      <LoadingView />
    ) : (
      <HeaderRightTextButton text="Save" onPress={handleSaveClick} />
    );

  // Methods.

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

  // Handlers.

  const handleSelectPhotoClick = async () => {
    const isGranted = await checkPermission();
    if (isGranted === GRANTED) {
      const asset = await selectImage();
      setSelectedPhoto(asset?.uri);
    } else {
      openSetting();
    }
  };

  const handleSaveClick = async () => {
    try {
      if (profileUpdateLoading) return;

      const email = getValues("email");
      const username = getValues("username");

      let avatar;
      if (selectedPhoto) {
        avatar = new ReactNativeFile({
          uri: selectedPhoto,
          type: "image/jpeg",
          name: "profile",
        });
      }

      profileUpdateMutation({
        variables: {
          ...(email && { email }),
          ...(username && { username }),
          ...(avatar && { avatar }),
        },
        update: profileUpdated,
      });
    } catch (error) {}
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
  }, [selectedPhoto, profileUpdateLoading]);

  useEffect(() => {
    register("email");
    register("username");

    if (params?.me) {
      const { email, username } = params?.me;
      setValue("email", email);
      setValue("username", username);
    }
  }, [register]);

  return (
    <Container onPress={Keyboard.dismiss}>
      <Form>
        <UserAvatar
          avatar={selectedPhoto ? selectedPhoto : params?.me.avatar}
        />
        <InputWithLabel
          reference={emailRef}
          label="email"
          placeholder="Enter email.."
          hasMarginBottom={true}
          onChangeText={(text) => setValue("email", text)}
          value={watch("email")}
          returnKeyType="next"
          textContentType="emailAddress"
          editable={!profileUpdateLoading}
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
          editable={!profileUpdateLoading}
        />

        <HorizontalButton
          text="Select photo"
          isLoading={profileUpdateLoading}
          onPress={handleSelectPhotoClick}
        />
      </Form>
    </Container>
  );
};

export default ProfileEditScreen;
