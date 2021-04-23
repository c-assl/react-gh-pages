import React from 'react';
import {NavLink as Link} from 'react-router-dom'; 

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Retour à bon port</Link>
        </li>
        <li>
          <Link to="/about">À propos de ce document de synthèse</Link>
        </li>
        <li>
          <Link to="/topics">Document de synthèse</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav;