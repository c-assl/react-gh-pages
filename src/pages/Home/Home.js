
import React from 'react';
/* eslint-disable import/no-webpack-loader-syntax */
import Content from '!babel-loader!@mdx-js/loader!./content.mdx';

function Home() {
  return <h2>Retour à bon port</h2>;
  <Content/>
}

export default Home;