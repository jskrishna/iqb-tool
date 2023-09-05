import { ApolloProvider } from '@apollo/client';
import React from 'react'
import client from '../apollo/client';
import Layout from '../components/layout';
import TermsPage from '../components/TermsPage';

const TermsCondition = () => {
  return (
    <ApolloProvider client={client}>
    <Layout children={<TermsPage />} />
 </ApolloProvider>
  )
}

export default TermsCondition;