import { gql } from "@apollo/client";

const GET_ACCOUNTS_QUERY = gql`
  query accounts($offset: Int, $take: Int) {
    accounts(offset: $offset, take: $take) {
      id
      title
      subtitle
      thumbnail
      accountName
      accountPassword
    }
  }
`;

export default GET_ACCOUNTS_QUERY;
