import React from "react";
import styled from "styled-components/native";
import { ThemeText } from "../utils/styles/styleUtils";

const Text = styled(ThemeText)`
  color: ${(props) => props.theme.colors.errorRed};
`;

const ErrorText = ({ text }) => {
  return <Text>{text}</Text>;
};

export default ErrorText;
