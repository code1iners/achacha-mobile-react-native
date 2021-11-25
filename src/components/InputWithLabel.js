import React from "react";
import styled from "styled-components/native";
import { FlexView, ThemeText } from "../utils/styles/styleUtils";

const InputContainer = styled.View`
  margin-bottom: ${(props) => (props.hasBelowMargin ? "20px" : 0)};
`;
const LabelText = styled(ThemeText)`
  margin-bottom: 5px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

const InputWrapper = styled(FlexView)`
  align-items: center;
`;
const Input = styled.TextInput`
  width: 100%;
  background-color: white;
  border-radius: 5px;
  padding: 5px 10px;
  letter-spacing: 1.5px;
`;

const InputWithLabel = ({ label = "Label", placeholder, hasBelowMargin }) => {
  return (
    <InputContainer hasBelowMargin={hasBelowMargin}>
      <LabelText>{label}</LabelText>
      <InputWrapper>
        <Input placeholder={placeholder} />
      </InputWrapper>
    </InputContainer>
  );
};

export default InputWithLabel;
