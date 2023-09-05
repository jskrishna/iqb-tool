// src/pages/index.js
import React from 'react';
import { ApolloProvider } from '@apollo/client'; // Path to your Apollo Client instance
import client from '../apollo/client';
import Layout from '../components/layout';
import FormsPage from '../components/FormsPage';


const About = () => (
  <ApolloProvider client={client}>
     <Layout children={<FormsPage />}/>
  </ApolloProvider>
);

export default About;