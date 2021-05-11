import React from 'react';
/* eslint-disable import/no-webpack-loader-syntax */
import Content from '!babel-loader!@mdx-js/loader!./content.mdx';


function About() {
  return (
  <div>
    <h2>À propos de ce document de synthèse</h2>
    <Content />
  </div>
  );
}

export default About;