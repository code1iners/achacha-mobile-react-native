import React from "react";
import styled from "styled-components/native";
import { ThemeText } from "../utils/styles/styleUtils";
import LoadingView from "./LoadingView";

const Container = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.theme.spacing.m};
  border: 1px solid ${(props) => props.theme.colors.primary};
  min-height: 50px;
`;
const ButtonText = styled(ThemeText)`
  font-size: 18px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const HorizontalButton = ({ text = "button", isLoading, onPress }) => {
  return (
    <Container onPress={onPress}>
      {isLoading ? <LoadingView /> : <ButtonText>{text}</ButtonText>}
    </Container>
  );
};

export default HorizontalButton;
