import { GraphQLClient } from "graphql-request";

const GRAPHQL_ENDPOINT = "https://api.ecomm.jusgoeaz.com/v1/graphql";

export const graphqlClient = new GraphQLClient(GRAPHQL_ENDPOINT);
