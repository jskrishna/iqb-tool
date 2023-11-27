// custom typefaces
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './src/i18n';
import "typeface-montserrat"
import "typeface-merriweather"

// normalize CSS across browsers
import "./src/css/normalize.css";

// custom CSS styles
import "./src/css/style.css"
export const wrapRootElement = ({ element }) => (
    <I18nextProvider i18n={i18n}>{element}</I18nextProvider>
  );