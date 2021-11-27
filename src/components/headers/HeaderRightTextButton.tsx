import React from "react";
import styled from "styled-components/native";
import { GestureResponderEvent, TouchableOpacity } from "react-native";

const Container = styled.View``;
const ButtonText = styled.Text`
  color: ${(props) => props.theme.colors.textColor};
  letter-spacing: 1.5px;
  padding: 10px;
`;

interface HeaderRightTextButton {
  text: string;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
}

const HeaderRightTextButton: React.FC<HeaderRightTextButton> = ({
  text,
  onPress,
}) => {
  return (
    <Container>
      <TouchableOpacity onPress={onPress}>
        <ButtonText>{text}</ButtonText>
      </TouchableOpacity>
    </Container>
  );
};

export default HeaderRightTextButton;
