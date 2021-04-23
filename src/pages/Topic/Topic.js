import React from 'react';
import {Link} from 'react-router-dom';

const Topic = ({axe}) => {
  const otherAxe = axe === 'axe_1' ? 'axe_2' : 'axe_1';
  // ternaire, équivalent à :
  // let otherAxe;
  // if (axe === 'axe_1') {
  //   otherAxe = 'axe_2'
  // } else {
  //   otherAxe = 'axe_2'
  // }

  // string literals
  // ça : `/topics/${otherAxe}`
  // équivaut à ça : "/topics/" + otherAxe

  return (
    <div>
      <h3>Axe choisi : {axe}</h3> 
      
      <ul>
        <li>
          <Link to="/">Retour à bon port</Link>
        </li>
        <li>
          <Link to={`/topics/${otherAxe}`}>
            {otherAxe === 'axe_1' ? 'Axe 1' : 'Axe 2'}
          </Link>
        </li>
      </ul>
    </div>
    );
}

export default Topic;