import React from "react";
import styled from "styled-components/native";
import { ThemeText } from "../utils/styles/styleUtils";

const Container = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  padding: 5px;
  border: 1px solid ${(props) => props.theme.colors.primary};
`;
const ButtonText = styled(ThemeText)`
  font-size: 20px;
  font-weight: 600;
`;

const HorizontalButton = ({ text = "button" }) => {
  return (
    <Container>
      <ButtonText>{text}</ButtonText>
    </Container>
  );
};

export default HorizontalButton;
