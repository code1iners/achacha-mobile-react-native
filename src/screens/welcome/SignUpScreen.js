import React, { useEffect, useRef } from "react";
import styled from "styled-components/native";
import InputWithLabel from "../../components/InputWithLabel";
import HorizontalButton from "../../components/HorizontalButton";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";
import { gql, useMutation } from "@apollo/client";
import {
  ERROR_EMAIL_ALREADY_EXISTS,
  ERROR_USERNAME_ALREADY_EXISTS,
  SIGN_IN,
} from "../../utils/constants";
import states from "../../apollo/states";

const SIGN_UP_MUTATION = gql`
  mutation signUp(
    $email: String!
    $username: String!
    $firstName: String!
    $lastName: String
    $password: String!
  ) {
    signUp(
      email: $email
      username: $username
      firstName: $firstName
      lastName: $lastName
      password: $password
    ) {
      ok
      error
    }
  }
`;

const Container = styled.View`
  padding: 20px 0;
`;

const SignUpScreen = () => {
  const emailRef = useRef();
  const usernameRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { register, setValue, handleSubmit, watch } = useForm();
  const [signUpMutation, { loading: signUpLoading }] =
    useMutation(SIGN_UP_MUTATION);

  // Methods.

  /**
   * ### Handle submit valid event handler.
   */
  const onValid = async ({
    email,
    username,
    firstName,
    lastName,
    password,
    passwordConfirm,
  }) => {
    if (password !== passwordConfirm) {
      Alert.alert("Password Invalid", "Check your password is same.");
      passwordRef.current?.focus();
      return;
    }

    if (signUpLoading) return;

    const {
      data: {
        signUp: { ok, error },
      },
    } = await signUpMutation({
      variables: {
        email,
        username,
        firstName,
        lastName,
        password,
      },
    });

    if (ok) {
      Alert.alert("Create user", "Successfully created a new account.");
      states.welcomeScreenVar(SIGN_IN);
      states.createdNewUser({ email, password });
    } else {
      switch (error) {
        case ERROR_EMAIL_ALREADY_EXISTS:
          Alert.alert("Email", error);
          emailRef.current?.focus();
          break;

        case ERROR_USERNAME_ALREADY_EXISTS:
          Alert.alert("Username", error);
          usernameRef.current?.focus();
          break;
      }
    }
  };

  /**
   * ### Handle submit invalid event handler.
   */
  const onInvalid = ({
    email,
    username,
    firstName,
    password,
    passwordConfirm,
  }) => {
    if (email) {
      const { type } = email;
      Alert.alert(String(type).toUpperCase(), "Email is required.");
      emailRef.current?.focus();
      return;
    }
    if (username) {
      const { type } = username;
      Alert.alert(String(type).toUpperCase(), "Username is required.");
      usernameRef.current?.focus();
      return;
    }
    if (firstName) {
      const { type } = firstName;
      Alert.alert(String(type).toUpperCase(), "First name is required.");
      firstNameRef.current?.focus();
      return;
    }
    if (password) {
      const { type } = password;
      Alert.alert(String(type).toUpperCase(), "Password is required.");
      lastNameRef.current?.focus();
      return;
    }
    if (passwordConfirm) {
      const { type } = passwordConfirm;
      Alert.alert(String(type).toUpperCase(), "Password confirm is required.");
      passwordConfirmRef.current?.focus();
      return;
    }
  };
  // Watch.
  useEffect(() => {
    register("email", {
      required: true,
    });
    register("email", {
      required: true,
    });
    register("username", {
      required: true,
    });
    register("firstName", {
      required: true,
    });
    register("lastName");
    register("password", {
      required: true,
    });
    register("passwordConfirm", {
      required: true,
    });
  }, [register]);

  return (
    <Container>
      {/* Email */}
      <InputWithLabel
        reference={emailRef}
        hasMarginBottom={true}
        label="email"
        placeholder="Enter email.."
        value={watch("email")}
        onChangeText={(text) => setValue("email", text)}
        returnKeyType="next"
        textContentType="emailAddress"
        onSubmitEditing={() => usernameRef.current?.focus()}
      />

      {/* Username */}
      <InputWithLabel
        reference={usernameRef}
        hasMarginBottom={true}
        label="username"
        placeholder="Enter username.."
        value={watch("username")}
        onChangeText={(text) => setValue("username", text)}
        returnKeyType="next"
        textContentType="username"
        onSubmitEditing={() => firstNameRef.current?.focus()}
      />

      {/* First name */}
      <InputWithLabel
        reference={firstNameRef}
        hasMarginBottom={true}
        label="first name"
        placeholder="Enter first name.."
        value={watch("firstName")}
        onChangeText={(text) => setValue("firstName", text)}
        returnKeyType="next"
        textContentType="username"
        onSubmitEditing={() => lastNameRef.current?.focus()}
      />

      {/* Last name */}
      <InputWithLabel
        reference={lastNameRef}
        hasMarginBottom={true}
        label="last name (optional)"
        placeholder="Enter last name.."
        value={watch("lastName")}
        onChangeText={(text) => setValue("lastName", text)}
        returnKeyType="next"
        textContentType="username"
        onSubmitEditing={() => passwordRef.current?.focus()}
      />

      {/* Password */}
      <InputWithLabel
        reference={passwordRef}
        hasMarginBottom={true}
        label="Password"
        placeholder="Enter password.."
        value={watch("password")}
        onChangeText={(text) => setValue("password", text)}
        returnKeyType="next"
        textContentType="password"
        secureTextEntry={true}
        onSubmitEditing={() => passwordConfirmRef.current?.focus()}
      />

      {/* Password confirm */}
      <InputWithLabel
        reference={passwordConfirmRef}
        hasMarginBottom={true}
        label="Password confirm"
        placeholder="Enter password confirm.."
        value={watch("passwordConfirm")}
        onChangeText={(text) => setValue("passwordConfirm", text)}
        returnKeyType="done"
        textContentType="password"
        secureTextEntry={true}
        onSubmitEditing={handleSubmit(onValid, onInvalid)}
      />

      <HorizontalButton onPress={handleSubmit(onValid, onInvalid)} />
    </Container>
  );
};

export default SignUpScreen;
