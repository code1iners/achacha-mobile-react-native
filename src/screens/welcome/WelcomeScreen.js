import React, { useEffect } from "react";
import styled from "styled-components/native";
import { FlexView, ThemeText } from "../../utils/styles/styleUtils";
import { SIGN_IN, SIGN_UP } from "../../utils/constants";
import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useReactiveVar } from "@apollo/client";
import states from "../../apollo/states";

const Container = styled.View`
  flex: 1;
  padding: 20px 20px 0;
  background-color: ${(props) => props.theme?.colors?.mainBackgroundColor};
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
  font-size: 18px;
  color: ${(props) =>
    props.isClicked
      ? props.theme?.colors?.accentColor
      : props.theme?.colors?.textColor};
`;
const WelcomeTitle = styled(ThemeText)`
  font-size: 50px;
  font-weight: 600;
  letter-spacing: 2px;
`;

// Header end.

// Body start.

const Body = styled(KeyboardAwareScrollView)``;

// Body end.

const WelcomeScreen = () => {
  const nav = useReactiveVar(states.welcomeScreenVar);

  const clickSignIn = () => states.welcomeScreenVar(SIGN_IN);
  const clickSignUp = () => states.welcomeScreenVar(SIGN_UP);

  useEffect(() => {
    clickSignIn();
  }, []);

  return (
    <Container>
      <Header>
        <NavContainer>
          <NavButton onPress={clickSignIn}>
            <NavText isClicked={nav === SIGN_IN}>Sign in</NavText>
          </NavButton>
          <NavButton onPress={clickSignUp}>
            <NavText isClicked={nav === SIGN_UP}>Sign up</NavText>
          </NavButton>
        </NavContainer>

        <WelcomeTitle>Welcome!</WelcomeTitle>
      </Header>

      <Body showsVerticalScrollIndicator={false}>
        {nav === SIGN_IN ? <SignInScreen /> : <SignUpScreen />}
      </Body>
    </Container>
  );
};

export default WelcomeScreen;
