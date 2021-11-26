import React, { useEffect, useRef } from "react";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import InputWithLabel from "../../components/InputWithLabel";
import HorizontalButton from "../../components/HorizontalButton";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";
import { gql, useMutation, useReactiveVar } from "@apollo/client";
import {
  ERROR_INCORRECT_PASSWORD,
  ERROR_USER_NOT_FOUND,
  TOKEN,
} from "../../utils/constants";
import states from "../../apollo/states";

const SIGN_IN_MUTATION = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      ok
      token
      error
    }
  }
`;

const Container = styled.View`
  padding: 20px 0;
`;

const SignInScreen = ({ params }) => {
  const { register, setValue, handleSubmit, watch } = useForm();
  const emailRef = useRef();
  const passwordRef = useRef();
  const tokenVar = useReactiveVar(states.tokenVar);
  const [signInMutation, { loading: signInLoading }] =
    useMutation(SIGN_IN_MUTATION);

  // Methods.

  /**
   * ### Handle submit valid event handler.
   * @param {string} email Valid email.
   * @param {string} password Valid password.
   */
  const onValid = async ({ email, password }) => {
    if (!signInLoading) {
      const {
        data: {
          signIn: { ok, error, token },
        },
      } = await signInMutation({
        variables: {
          email,
          password,
        },
      });

      if (ok) {
        // Token persist.
        await AsyncStorage.setItem(TOKEN, token);
        // Set token reactive var.
        states.tokenVar(token);
      } else {
        switch (error) {
          case ERROR_USER_NOT_FOUND:
            Alert.alert("Email", error);
            break;
          case ERROR_INCORRECT_PASSWORD:
            Alert.alert("Password", error);
            break;
        }
      }
    }
  };

  /**
   * ### Handle submit invalid event handler.
   * @param {string} email Invalid email.
   * @param {string} password Invalid password.
   */
  const onInvalid = ({ email, password }) => {
    if (email) {
      const { type } = email;
      Alert.alert(String(type).toUpperCase(), "Email is required.");
      emailRef.current?.focus();
      return;
    }

    if (password) {
      const { type } = password;
      Alert.alert(String(type).toUpperCase(), "Password is required.");
      passwordRef.current?.focus();
      return;
    }
  };

  // Watch.
  useEffect(() => {
    register("email", {
      required: true,
    });
    register("password", {
      required: true,
    });

    if (states.createdNewUser()) {
      const { email, password } = states.createdNewUser();
      setValue("email", email);
      setValue("password", password);

      states.createdNewUser(null);
    }
  }, [register]);

  return (
    <Container>
      <InputWithLabel
        reference={emailRef}
        hasMarginBottom={true}
        label="Email"
        placeholder="Enter email.."
        value={watch("email")}
        onChangeText={(text) => setValue("email", text)}
        returnKeyType="next"
        textContentType="emailAddress"
        onSubmitEditing={() => passwordRef.current?.focus()}
      />
      <InputWithLabel
        reference={passwordRef}
        hasMarginBottom={true}
        label="Password"
        placeholder="Enter password.."
        value={watch("password")}
        onChangeText={(text) => setValue("password", text)}
        returnKeyType="done"
        textContentType="password"
        secureTextEntry={true}
        onSubmitEditing={handleSubmit(onValid, onInvalid)}
      />

      <HorizontalButton onPress={handleSubmit(onValid, onInvalid)} />
    </Container>
  );
};

export default SignInScreen;
