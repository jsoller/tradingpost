import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Checkout from '../components/Checkout';
// import { checkout } from '../actions/pointOfSale';
import { getCartProducts } from '../reducers';
// import RestrictionContainer from '../containers/RestrictionContainer';

//const CheckoutContainer = ({ products, tax, total, checkout, restrictioncheck }) => (
const CheckoutContainer = ({ products, checkout }) => (
  <Checkout
    products={products}
  />
)

CheckoutContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    nme: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    upc_code: PropTypes.string.isRequired,
    restricted_item_flag: PropTypes.number.isRequired,
  })).isRequired,
  // tax: PropTypes.string,
  // total: PropTypes.string,
  checkout: PropTypes.func,
}
//restrictioncheck: PropTypes.bool,
// hasRestriction: PropTypes.bool,


const mapStateToProps = (state) => ({
  products: getCartProducts(state),
  // tax: getTax(state),
  // total: getTotal(state),
  // hasRestriction: getRestriction(state),
})

export default connect(
  mapStateToProps,
  // { checkout }
)(CheckoutContainer)
