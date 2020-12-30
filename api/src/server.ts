import 'graphql-import-node';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from '@/schemas/api.graphql';
import resolvers from '~/resolvers';

const apolloServer = new ApolloServer({ typeDefs, resolvers });
const app = express();
apolloServer.applyMiddleware({app, path: '/graphql'});

export default app;
