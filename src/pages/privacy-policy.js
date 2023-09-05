import { ApolloProvider } from '@apollo/client';
import React from 'react'
import client from '../apollo/client';
import Layout from '../components/layout';
import PrivacyPage from '../components/PrivacyPage';

const PrivacyPolicy = () => {
  return (
    <ApolloProvider client={client}>
    <Layout children={<PrivacyPage />} />
 </ApolloProvider>
  )
}

export default PrivacyPolicy;