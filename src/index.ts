import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server'
import context from './context'
import MovieResolver from './resolvers/MovieResolver'
import UserListResolver from './resolvers/UserListResolver'
const PORT = process.env.PORT || 4000

const startServer = async () => {
  const schema = await buildSchema({
    resolvers: [MovieResolver, UserListResolver],
  })

  new ApolloServer({ schema, context, introspection: true }).listen({ port: PORT }).then(() => {
    console.log('server is running on ' + PORT)
  })
}

startServer()
