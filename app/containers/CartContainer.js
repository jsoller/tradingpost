import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCartProducts } from '../reducers';
import Cart from '../components/Cart';

const CartContainer = ({ products }) => (
  <Cart
    products={products}
  />
)

CartContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    productname: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    upc: PropTypes.number.isRequired,
    checkId: PropTypes.number.isRequired,
  })).isRequired,
}

const mapStateToProps = (state) => ({
  products: getCartProducts(state),
})

export default connect(
  mapStateToProps,
  {}
)(CartContainer)
