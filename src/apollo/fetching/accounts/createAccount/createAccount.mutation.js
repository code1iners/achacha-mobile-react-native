import { gql } from "@apollo/client";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $title: String!
    $subtitle: String
    $accountName: String!
    $accountPassword: String!
    $thumbnail: Upload
  ) {
    createAccount(
      title: $title
      subtitle: $subtitle
      accountName: $accountName
      accountPassword: $accountPassword
      thumbnail: $thumbnail
    ) {
      ok
      error
      data {
        id
        title
        subtitle
        thumbnail
        accountName
        accountPassword
      }
    }
  }
`;

export default CREATE_ACCOUNT_MUTATION;
