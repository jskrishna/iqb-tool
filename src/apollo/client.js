import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://patidarparivar.com/graphql',
  cache: new InMemoryCache(),
  //   headers: {
  //   "Access-Control-Allow-Origin": "*",
  // },
});

export default client;
