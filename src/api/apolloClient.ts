import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
// import { PersistedQueryLink } from "@apollo/client/link/persisted-queries";
// import { sha256 } from "crypto-hash";

const GRAPHQL_ENDPOINT = "https://api.ecomm.jusgoeaz.com/v1/graphql";

//const persistedQueryLink = new PersistedQueryLink({ sha256 }).concat(httpLink);

// const removeExtensionsLink = new ApolloLink((operation, forward) => {
//   delete operation.extensions;
//   return forward(operation);
// });

const httpLink = new HttpLink({
  uri: GRAPHQL_ENDPOINT,
  fetch: (uri, options) => {
    if (options && options.body) {
      const body = JSON.parse(options.body as string);
      delete body.extensions;
      options.body = JSON.stringify(body);
    }
    return fetch(uri, options);
  },
});

//const link = ApolloLink.from([removeExtensionsLink, httpLink]);

export const client = new ApolloClient({
 link: httpLink,
  cache: new InMemoryCache(),
});

