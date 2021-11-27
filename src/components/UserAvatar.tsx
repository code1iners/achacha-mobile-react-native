import React from "react";
import styled from "styled-components/native";
import { FlexView } from "../utils/styles/styleUtils";
import { Ionicons } from "@expo/vector-icons";
import { colors, getIsDark } from "../utils/themes/colors";

const Container = styled(FlexView)`
  justify-content: center;
  align-items: center;
  padding: 20px 20px 0;
`;
const AvatarImage = styled.Image`
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};
  border-radius: 1000px;
`;

interface UserAvatar {
  avatar: string;
  width: number;
  height: number;
}

const UserAvatar: React.FC<UserAvatar> = ({
  avatar,
  width = 150,
  height = 150,
}) => {
  const isDark = getIsDark();
  return (
    <Container>
      {/* Avatar */}
      {avatar ? (
        <AvatarImage
          width={width}
          height={height}
          source={{
            uri: avatar,
          }}
        />
      ) : (
        <Ionicons
          name="person-circle-outline"
          color={isDark ? colors.darkTextColor : colors.lightTextColor}
          size={150}
        />
      )}
    </Container>
  );
};

export default UserAvatar;
