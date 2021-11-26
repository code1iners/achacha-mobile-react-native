import React from "react";
import styled from "styled-components/native";
import { ThemeText } from "../utils/styles/styleUtils";

const Container = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.theme.spacing.m};
  border: 1px solid ${(props) => props.theme.colors.primary};
`;
const ButtonText = styled(ThemeText)`
  font-size: 18px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const HorizontalButton = ({ text = "button", onPress }) => {
  return (
    <Container onPress={onPress}>
      <ButtonText>{text}</ButtonText>
    </Container>
  );
};

export default HorizontalButton;
