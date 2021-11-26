import React from "react";
import styled from "styled-components/native";
import { FlatList } from "react-native";
import { ThemeText } from "../../utils/styles/styleUtils";
import { settingMenus } from "../../utils/settings/settingMenus";
import SettingItem from "../../components/settings/SettingItem";

const Container = styled.View``;

const SettingItemContainer = styled.View`
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

const ItemSeparator = styled.View`
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.2);
`;

const SettingScreen = ({ navigation }) => {
  const renderItem = ({ item }) => <SettingItem {...item} />;

  return (
    <Container>
      <FlatList
        data={settingMenus}
        renderItem={renderItem}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={ItemSeparator}
      />
    </Container>
  );
};

export default SettingScreen;
