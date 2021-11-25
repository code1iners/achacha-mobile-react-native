import React from "react";
import styled from "styled-components/native";
import InputWithLabel from "../../components/InputWithLabel";
import HorizontalButton from "../../components/HorizontalButton";

const Container = styled.View``;

const SignInScreen = () => {
  return (
    <Container>
      <InputWithLabel
        hasMarginBottom={true}
        label="Email"
        placeholder="Enter email.."
      />
      <InputWithLabel
        hasMarginBottom={true}
        label="Password"
        placeholder="Enter password.."
      />

      <HorizontalButton />
    </Container>
  );
};

export default SignInScreen;
