import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const Container = styled.TouchableOpacity`
  width: 15px;
  height: 15px;
  background-color: ${(props) => props.color};
  border-radius: 1000px;
`;

const ColoredCircle = ({ color, onPress }) => (
  <Container color={color} onPress={onPress} />
);

export default ColoredCircle;
