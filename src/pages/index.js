// src/pages/index.js
import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from '../apollo/client'; // Path to your Apollo Client instance
import HomePage from '../components/HomePage';
import Layout from '../components/layout';

const App = () => (
  <ApolloProvider client={client}>
    <Layout children={<HomePage />}/>
  </ApolloProvider>
);

export default App;