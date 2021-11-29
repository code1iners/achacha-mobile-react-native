import { gql } from "@apollo/client";

const DELETE_ACCOUNT_MUTATION = gql`
  mutation deleteAccount($id: Int!) {
    deleteAccount(id: $id) {
      ok
      error
    }
  }
`;

export default DELETE_ACCOUNT_MUTATION;
