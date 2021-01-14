import { ApolloServer, gql } from "apollo-server-micro";
import { buildSchema } from "type-graphql";
import MovieResolver from "../src/resolvers/MovieResolver";
import UserListResolver from "../src/resolvers/UserListResolver";
import context from "../src/context";

let server: ApolloServer;

buildSchema({
  resolvers: [MovieResolver, UserListResolver],
}).then((schema) => {
  server = new ApolloServer({ schema, context, introspection: true });
  module.exports = server.createHandler();
});
