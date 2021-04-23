
/* import external libraries */
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

/* import pages */
import Home from './pages/Home';
import About from './pages/About';
import Topics from './pages/Topics';

/* import components */
import Nav from './components/Nav';

/* import other assets */
import './App.css';


export default function App() {
  return (
    <div className="App">
        <Router>
          <div>
            <header>
              <Nav />
            </header>
            <main>
              <Switch>
                <Route path="/about">
                  <About />
                </Route>
                <Route path="/topics/:axe?">
                  <Topics />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </main>
            <footer></footer>
          </div>
        </Router>
    </div>
  );
}
