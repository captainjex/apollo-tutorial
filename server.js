import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import schema from './data/schema';
import compression from 'compression';
import { ApolloEngine } from 'apollo-engine';

const GRAPHQL_PORT = 3000;
const ENGINE_API_KEY = 'service:tes-apollo-tutorial:GulTOCKbYQlJ5FPM1aYkQw'; // TODO

const graphQLServer = express();

const engine = new ApolloEngine({
  apiKey: ENGINE_API_KEY,
});

// graphQLServer.use(engine.expressMiddleware());
graphQLServer.use(compression());

graphQLServer.use('/graphql', bodyParser.json(), graphqlExpress({ schema, tracing: true }));
graphQLServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Instead of app.listen():
engine.listen({
  port: GRAPHQL_PORT,
  graphqlPaths: ['/graphql'],
  expressApp: graphQLServer,
  launcherOptions: {
    startupTimeout: 3000,
  },
}, () => {
  console.log(`GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`);
});
