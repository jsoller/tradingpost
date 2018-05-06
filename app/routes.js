/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import PointOfSaleApp from './containers/PointOfSaleApp';
import PaymentPage from './containers/PaymentPage';
import InventoryPage from './containers/InventoryPage';
import { connect } from 'react-redux';
import * as pages from './constants/Pages';

const AuthedRoute = ({ validSignOn, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={
      props => (
        validSignOn
          ? <Component {...props} />
          : <Redirect to={{
            pathname: "/",
            state: { from: props.location },
          }} />
      )
    }
  />
);


const Routes = ({ validSignOn }) => (
  <App>
    <Switch>
      <Route exact path={pages.LOGIN} component={HomePage} />
      <AuthedRoute validSignOn={validSignOn} path={pages.INVENTORY} component={InventoryPage} />
      <AuthedRoute validSignOn={validSignOn} path={pages.PAYMENT} component={PaymentPage} />
      <AuthedRoute validSignOn={validSignOn} path={pages.POINT_OF_SALE} component={PointOfSaleApp} />
    </Switch>
  </App>
);

const mapStateToProps = (state) => ({
  validSignOn: state.login.validsignon,
})

export default withRouter(connect(
  mapStateToProps,
  {}
)(Routes))
