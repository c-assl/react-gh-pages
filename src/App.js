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
  return <h2>À propos de ce document de synthèse</h2>;
}

function Topics() {
  let match = useRouteMatch();

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

function Topic() {
  let { topicId } = useParams();
  return (
    <div>
      <h3>Requested topic ID: {topicId}</h3> 
      <Content />
    </div>
    );
}