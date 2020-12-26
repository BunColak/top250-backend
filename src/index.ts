import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server'
import context from './context'
import MovieResolver from './resolvers/MovieResolver'
const PORT = process.env.PORT || 4000

const startServer = async () => {
  const schema = await buildSchema({
    resolvers: [MovieResolver],
  })

  new ApolloServer({ schema, context, introspection: true }).listen({ port: PORT }).then(() => {
    console.log('server is running on ' + PORT)
  })
}

startServer()
