import { API_SERVER_URI, TEST_API_SERVER_URI } from "@env";
import { createUploadLink } from "apollo-upload-client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import states from "./states";

// Links.
const uploadLink = createUploadLink({
  uri: TEST_API_SERVER_URI,
});

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.error(graphQLErrors);
  }

  if (networkError) {
    console.error(networkError);
  }
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: states.tokenVar(),
    },
  };
});

const link = authLink.concat(onErrorLink).concat(uploadLink);

// Cache.
export const cache = new InMemoryCache({});

// Client.
const client = new ApolloClient({
  cache,
  link,
});

export default client;
