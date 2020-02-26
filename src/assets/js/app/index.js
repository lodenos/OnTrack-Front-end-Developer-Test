import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home.js';
import NotFound from '../pages/NotFound.js';
import '../../stylesheets/scss/styles.scss';

const Root = (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/:index" component={Home} />
      <Route exact path="/:index/:filters" component={Home} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

ReactDOM.render(Root, document.getElementById("root"));
