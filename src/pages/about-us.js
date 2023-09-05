// src/pages/index.js
import React from 'react';
import { ApolloProvider } from '@apollo/client'; // Path to your Apollo Client instance
import AboutPage from '../components/AboutPage';
import client from '../apollo/client';
import Layout from '../components/layout';


const About = () => (
  <ApolloProvider client={client}>
     <Layout children={<AboutPage />}/>
  </ApolloProvider>
);

export default About;