// src/pages/index.js
import React from 'react';
import { ApolloProvider } from '@apollo/client'; // Path to your Apollo Client instance
import client from '../apollo/client';
import Layout from '../components/layout';
import CustomPage from '../components/CustomPage';


const Custom = () => (
  <ApolloProvider client={client}>
     <Layout children={<CustomPage />}/>
  </ApolloProvider>
);

export default Custom;