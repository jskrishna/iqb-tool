import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://iqb-tool.com/wp/graphql',
  cache: new InMemoryCache(),
});

export default client;
