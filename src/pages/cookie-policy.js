import { ApolloProvider } from '@apollo/client';
import React from 'react'
import client from '../apollo/client';
import CookiePage from '../components/CookiePage';
import Layout from '../components/layout';

const CookiePolicy = () => {
  return (
    <ApolloProvider client={client}>
    <Layout children={<CookiePage />} />
 </ApolloProvider>
  )
}

export default CookiePolicy;