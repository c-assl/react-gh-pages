
import React from 'react';
/* eslint-disable import/no-webpack-loader-syntax */
import Content from '!babel-loader!@mdx-js/loader!./content.mdx';

function Home() {
  return (
    <div>
      <h2>Retour à bon port</h2>
      <Content />
    </div>
  )
}

// <img src={'../../../public/svg/Ports de la région Poitou, Aunis, Saintonge en 1789.svg'} />
export default Home;