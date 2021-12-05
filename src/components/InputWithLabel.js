import React from "react";
import styled from "styled-components/native";
import { FlexView, ThemeText } from "../utils/styles/styleUtils";
import ErrorText from "./ErrorText";

const InputContainer = styled.View`
  margin-bottom: ${(props) => (props.hasMarginBottom ? "20px" : 0)};
`;
const LabelText = styled(ThemeText)`
  margin-bottom: 5px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

const InputWrapper = styled(FlexView)`
  align-items: center;
  border: 1px solid ${(props) => props.theme?.colors?.textColor};
  background-color: ${(props) => props.theme?.colors?.mainBackgroundColor};
  margin-bottom: 5px;
`;
const Input = styled.TextInput.attrs({
  placeholderTextColor: "grey",
})`
  width: 100%;
  border-radius: ${(props) => props.theme?.round?.s};
  padding: 15px 20px;
  letter-spacing: 1.5px;
  color: ${(props) => props.theme?.colors?.textColor};
`;

const InputWithLabel = ({
  reference,
  label = "Label",
  placeholder,
  error,
  returnKeyType,
  textContentType,
  hasMarginBottom,
  secureTextEntry,
  onChangeText,
  value,
  onSubmitEditing,
  editable = true,
  autoCapitalize = "none",
}) => {
  return (
    <InputContainer hasMarginBottom={hasMarginBottom}>
      <LabelText>{label}</LabelText>
      <InputWrapper>
        <Input
          ref={reference}
          placeholder={placeholder ? placeholder : `Enter ${label}`}
          returnKeyType={returnKeyType}
          textContentType={textContentType}
          onChangeText={onChangeText}
          value={value}
          onSubmitEditing={onSubmitEditing}
          secureTextEntry={secureTextEntry}
          editable={editable}
          autoCapitalize={autoCapitalize}
        />
      </InputWrapper>

      {error ? <ErrorText text={error} /> : null}
    </InputContainer>
  );
};

export default InputWithLabel;
