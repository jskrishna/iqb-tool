import React from 'react';
import { ApolloProvider } from '@apollo/client'; // Path to your Apollo Client instance
import client from '../apollo/client';
import Layout from '../components/layout';
import PricingPlansPage from '../components/PricingPlansPage';


const PricingPlans = () => (
  <ApolloProvider client={client}>
     <Layout children={<PricingPlansPage />}/>
  </ApolloProvider>
);

export default PricingPlans;