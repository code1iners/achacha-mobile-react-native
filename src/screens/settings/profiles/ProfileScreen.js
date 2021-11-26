import React, { useEffect } from "react";
import styled from "styled-components/native";
import { View, Text } from "react-native";
import { gql, useQuery } from "@apollo/client";
import useMe from "../../../hooks/useMe";
import states from "../../../apollo/states";

const ME_QUERY = gql`
  query me {
    me {
      id
      email
      username
      firstName
      lastName
      avatar
      createdAt
      updatedAt
    }
  }
`;

const Container = styled.View``;

const ProfileScreen = () => {
  const me = useMe();
  console.log(me);
  return (
    <Container>
      <View>
        <Text>ProfileScreen</Text>
      </View>
    </Container>
  );
};

export default ProfileScreen;
