import React, { useState } from "react";
import styled from "styled-components/native";
import { FlexView, ThemeText } from "../../utils/styles/styleUtils";
import { SIGN_IN, SIGN_UP } from "../../utils/constants";
import InputWithLabel from "../../components/InputWithLabel";
import HorizontalButton from "../../components/HorizontalButton";

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.mainBackgroundColor};
`;

// Header start.

const Header = styled.View``;
const NavContainer = styled(FlexView)`
  margin-bottom: 10px;
  padding: 20px 0;
`;
const NavButton = styled.TouchableOpacity`
  margin-right: 10px;
`;
const NavText = styled(ThemeText)`
  font-size: ${(props) => (props.isClicked ? "20px" : "18px")};
`;
const WelcomeTitle = styled(ThemeText)`
  font-size: 50px;
  font-weight: 600;
  letter-spacing: 2px;
`;

// Header end.

// Body start.

const Body = styled.View`
  margin-top: 20px;
`;

// Body end.

const WelcomeScreen = () => {
  const [nav, setNav] = useState(SIGN_IN);
  return (
    <Container>
      <Header>
        <NavContainer>
          <NavButton>
            <NavText isClicked={nav === SIGN_IN}>Sign in</NavText>
          </NavButton>
          <NavButton>
            <NavText isClicked={nav === SIGN_UP}>Sign up</NavText>
          </NavButton>
        </NavContainer>

        <WelcomeTitle>Welcome!</WelcomeTitle>
      </Header>

      <Body>
        <InputWithLabel
          hasBelowMargin={true}
          label="Email"
          placeholder="Enter email.."
        />
        <InputWithLabel
          hasBelowMargin={true}
          label="Password"
          placeholder="Enter password.."
        />

        <HorizontalButton />
      </Body>
    </Container>
  );
};

export default WelcomeScreen;
