import styled from "styled-components/native";

export const FlexView = styled.View`
  flex-direction: row;
`;

export const ThemeText = styled.Text`
  color: ${(props) => props.theme.colors.textColor};
`;
