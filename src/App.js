import logo from './logo.svg';
import './App.css';

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

/* eslint-disable import/no-webpack-loader-syntax */
import Content from '!babel-loader!@mdx-js/loader!./content.mdx'

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <Router>
          <div>
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

            <Switch>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/topics">
                <Topics />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

function Home() {
  return <h2>Retour à bon port</h2>;
}

function About() {
  return (
  <div>
    <h2>À propos de ce document de synthèse</h2>
    <Content />
  </div>
  );
}

function Topics() {
  let match = useRouteMatch();

  // je pense que je vais devoir faire une fonction "Topic" pour chaque axe qui me permettra mettre liens / routes en plus vers autre axe et / ou homepage
  // elle est déjà faite (à voir si je l'adapte en 2 fonctions en fonction du topic id)
  return (
    <div>
      <h2>Document de synthèse</h2>

      <ul>
        <li>
          <Link to={`${match.url}/axe_1`}>
            Axe 1 : Le déclin / marginalisation de la région d’Aunis-Poitou-Saintonge au sein de l’ensemble français</Link>
        </li>
        <li>
          <Link to={`${match.url}/axe_2`}>
            Axe 2 : La Rochelle : un port dominant mais pas structurant ?
          </Link>
        </li>
      </ul>

      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */
          
        /* J'ai changé la page Topics par une page 'Document de synthèse' 
           qui contient plusieurs axes de recherche (et pas plusieurs Topic)*/
      }
      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Veuillez choisir un axe de recherche</h3>
        </Route>
      </Switch>
    </div>
  );
}


// pour l'instant j'affiche un titre non null au lien que si on est sur la page axe 1, le principe n'est pas fou

// peut être que le plus simple c'est que la fonction topic fasse le test de si axe 1 ou axe 2 choisi
// => ensuite on va chercher le bon component (celui de axe 1 ou axe 2 dans un fichier externe)

function Topic() {
  let match = useRouteMatch(); 

  let { topicId } = useParams();
  let optionnal_link = "";
  if (topicId === 'axe_1') { optionnal_link = "Passer à l'axe 2"}; 

  return (
    <div>
      <h3>Axe choisi : {topicId}</h3> 
      
      <ul>
        <li>
          <Link to="/">Retour à bon port</Link>
        </li>
        <li>
          <Link to={`${match.path}/axe_2`}> {optionnal_link} </Link>
        </li>
      </ul>

      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
    );
}