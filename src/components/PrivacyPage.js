import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import {  GET_PRIVACY_PAGE } from '../query/query';


const PrivacyPage = () => {
  const { i18n } = useTranslation();
  console.log(i18n.language);
  const { loading, error, data } = useQuery(GET_PRIVACY_PAGE, {
    variables: {
      language: i18n.language?.toUpperCase(), // Adjust to match your GraphQL enum format
    },
  });



  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data: {error.message}</div>;
  const privacyPage = data.pages.nodes[0]; // Assuming only one page with the given slug

  return (
    <>
      <section>
        <h2>{privacyPage.title}</h2>
        <p dangerouslySetInnerHTML={{ __html: privacyPage.content }}></p>
      </section>
    
    </>
  );
};

export default PrivacyPage;
