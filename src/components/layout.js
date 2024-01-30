import React from "react"
import client from "../apollo/client";
import { GET_FOOTER_OPTIONS, GET_HEADER_OPTIONS, GET_MENUS } from "../query/query";
import { useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
import Header from "./Header";
import Footer from "./Footer";
import Loader from "./loader";

const Layout = ({ isHomePage, children }) => {
  const menuNames = {
    en: 'main-menu',   // Replace with your menu names
    nl: 'main-menu-ne',
    // Add more languages and menu names as needed
  };
  
  const { i18n } = useTranslation();

  const { loading, error, data } = useQuery(GET_MENUS, {
    client: client,
  });
console.log(data);
  const { loading:loadingHeader, error:errorHeader, data:dataHeader } = useQuery(GET_HEADER_OPTIONS, {
    client: client,
  });

  const { loading:loadingFooter, error:errorFooter, data:dataFooter } = useQuery(GET_FOOTER_OPTIONS, {
    client: client,
    variables: {
      languages: i18n.language?.toUpperCase(), // Adjust to match your GraphQL enum format
    },
  });
  
  const { loading:loadingMenu, error:errorMenu, data:dataMenu } = useQuery(GET_MENUS, {
    client: client,
    variables: {
      languages: i18n.language?.toUpperCase(), // Adjust to match your GraphQL enum format
    },
  });

  // if (loading) return <Loader/>;
  if (error) return <p>Error: {error.message}</p>;


  const currentMenuName = menuNames[i18n.language];

  const menus = data?.menus.nodes || [];


  // if (loadingHeader) return <Loader/>;;
  if (errorHeader) return <p>Error: {errorHeader.message}</p>;
const header = dataHeader?.allHeader.nodes[0].header;



const footerMenuNames = {
  en: 'footer-menu',   // Replace with your menu names
  nl: 'footer-menu-nl',
  // Add more languages and menu names as needed
};


// if (loadingFooter) return <Loader/>;;
if (errorFooter) return <p>Error: {errorFooter.message}</p>;

const footer = dataFooter?.allFooter.nodes[0].footer;

// if (loadingMenu) return <Loader/>;
if (errorMenu) return <p>Error: {errorMenu.message}</p>;
const currentMenuNameFooter = footerMenuNames[i18n.language];
const menusFooter = dataMenu?.menus.nodes || [];



  return (
    <div className="global-wrapper1" data-is-root-path={isHomePage}>
      {data && header && menus? <Header header={header} menus={menus} currentMenuName={currentMenuName} />:""}
     
      <main>{children}</main>
      {footer && currentMenuNameFooter && menusFooter?<Footer footer={footer} currentMenuNameFooter={currentMenuNameFooter}  menusFooter={menusFooter} />:""}
    </div>
  )
}

export default Layout
