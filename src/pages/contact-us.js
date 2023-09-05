// src/pages/index.js
import React from 'react';
import { ApolloProvider } from '@apollo/client'; // Path to your Apollo Client instance
import client from '../apollo/client';
import Layout from '../components/layout';
import ContactPage from '../components/ContactPage';


const About = () => (
  <ApolloProvider client={client}>
     <Layout children={<ContactPage />}/>
  </ApolloProvider>
);

export default About;