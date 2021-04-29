import React from 'react';
/* eslint-disable import/no-webpack-loader-syntax */
import Content from '!babel-loader!@mdx-js/loader!./content.mdx';
import getToflitFlowsComponent from '../../helpers/misc';

function About() {
  return (
  <div>
    <h2>À propos de ce document de synthèse</h2>
    <Content />

    <h2> Test component pour fonctions misc -- getToflitFlowsByCsv</h2>
    <getToflitFlowsComponent />
  </div>
  );
}

export default About;