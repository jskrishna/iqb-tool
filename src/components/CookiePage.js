import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import {  GET_COOKIEPOLICY_PAGE } from '../query/query';
import Loader from './loader';


const CookiePage = () => {
  const { i18n } = useTranslation();
  console.log(i18n.language);
  const { loading, error, data } = useQuery(GET_COOKIEPOLICY_PAGE, {
    variables: {
      language: i18n.language?.toUpperCase(), // Adjust to match your GraphQL enum format
    },
  });



  if (loading) return <Loader/>;
  if (error) return <div>Error fetching data: {error.message}</div>;
  const cookiePage = data.pages.nodes[0]; // Assuming only one page with the given slug

  return (
    <>
      <section>
        <h2>{cookiePage.title}</h2>
        <p dangerouslySetInnerHTML={{ __html: cookiePage.content }}></p>
      </section>
    
    </>
  );
};

export default CookiePage;
