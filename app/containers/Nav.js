import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProductsIPC } from '../actions/ipcHandler';
import { Navbar, Nav, NavItem } from 'reactstrap';
import * as pages from '../constants/Pages';
import { connect } from 'react-redux';

class TPNav extends Component {
  render() {
    return (
      <Navbar color="light" light expand="md">
        <img src="https://247scouting.com/web/BSA999/attachment/image_14327325560_2271.gif" alt="Black Pug" />
        <h2><Link to={pages.LOGIN}>
          {this.props.locationName}
        </Link></h2>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <Link to={pages.POINT_OF_SALE}>Point of Sale</Link>
          </NavItem>
          <NavItem>
            <Link to={pages.PAYMENT}>Payment</Link>
          </NavItem>
          <NavItem>
            <Link to={pages.INVENTORY}>Inventory</Link>
          </NavItem>
          <NavItem onClick={() => getProductsIPC('productByType', 'CAMPING')}>
            <span>Refresh</span>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => ({
  locationName: state.login.location.nme ? state.login.location.nme : 'Trading Post',
});

export default connect(
  mapStateToProps
)(TPNav);
