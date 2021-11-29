import { gql } from "@apollo/client";

const UPDATE_ACCOUNT_MUTATION = gql`
  mutation updateAccount(
    $id: Int!
    $title: String
    $subtitle: String
    $accountName: String
    $accountPassword: String
    $thumbnail: Upload
  ) {
    updateAccount(
      id: $id
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
        accountName
        accountPassword
        thumbnail
      }
    }
  }
`;

export default UPDATE_ACCOUNT_MUTATION;
