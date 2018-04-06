/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import PointOfSaleApp from './containers/PointOfSaleApp';
import PaymentPage from './containers/PaymentPage';

export default () => (
  <App>
    <Switch>
      <Route path="/payment" component={PaymentPage} />
      <Route path="/counter" component={CounterPage} />
      <Route path="/p" component={PointOfSaleApp} />
      <Route path="/" component={HomePage} />
    </Switch>
  </App>
);
