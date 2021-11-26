import React from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { ThemeText } from "../../utils/styles/styleUtils";
import { FlatList } from "react-native";

const Container = styled.View`
  padding: 20px 20px 0;
`;

const SettingLabel = styled(ThemeText)`
  margin-bottom: 10px;
  font-size: 12px;
  letter-spacing: 1.5px;
  opacity: 0.6;
`;
const SettingItemWrapper = styled.TouchableOpacity`
  padding: 15px 0;
`;
const SettingItemText = styled(ThemeText)`
  letter-spacing: 1.25px;
`;

const SettingItem = ({ label, contents }) => {
  const navigation = useNavigation();

  return (
    <Container>
      <SettingLabel>{label}</SettingLabel>
      <FlatList
        data={contents}
        renderItem={({ item }) => {
          return (
            <SettingItemWrapper
              onPress={() =>
                item.type === "component"
                  ? navigation.navigate("StackNavigators", item.componentName)
                  : item.function()
              }
            >
              <SettingItemText>{item.title}</SettingItemText>
            </SettingItemWrapper>
          );
        }}
        keyExtractor={(_, index) => index}
      />
    </Container>
  );
};

export default SettingItem;
