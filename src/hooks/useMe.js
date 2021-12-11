import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import states from "../apollo/states";
import { userSignOut } from "./useAuth";
export const ME_QUERY = gql`
  query me {
    me {
      id
      email
      username
      firstName
      lastName
      password
      avatar
      createdAt
      updatedAt
    }
  }
`;

/**
 * ### Get my information.
 * @returns User.
 */
const useMe = () => {
  // Get token.
  const token = states.tokenVar();

  // Fetching.
  const { data } = useQuery(ME_QUERY, {
    skip: !Boolean(token),
  });

  // Watch.
  useEffect(() => {
    if (data?.me === null) {
      userSignOut(false);
    }
  }, [data]);

  return data?.me;
};

export default useMe;
