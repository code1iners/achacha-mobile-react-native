import { API_SERVER_URI } from "@env";
import { createUploadLink } from "apollo-upload-client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import states from "./states";

// Links.
const uploadLink = createUploadLink({
  uri: API_SERVER_URI,
});

const onErrorLink = onError((error) => {
  console.error(error);
});

const authLink = setContext((_, { headers }) => {
  return {
    ...headers,
    authorization: states.tokenVar,
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
