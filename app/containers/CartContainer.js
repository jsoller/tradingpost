import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { checkout } from '../actions/pointOfSale';
// import { checkout, restrictioncheck } from '../actions/pointOfSale';
// import { getTotal, getTax, getCartProducts, getRestriction} from '../reducers';
import { getTotal, getTax, getCartProducts} from '../reducers';
import Cart from '../components/Cart';

//const CartContainer = ({ products, tax, total, checkout, restrictioncheck }) => (
const CartContainer = ({ products, tax, total, checkout }) => (
  <Cart
    products={products}
    tax={tax}
    total={total}
    onCheckoutClicked={() => checkout(products)}
    //onRestrictionClicked={() => restrictioncheck(products)}
    // hasRestriction={hasRestriction}
    />
)

CartContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    productid: PropTypes.number.isRequired,
    productname: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    upc: PropTypes.string.isRequired,
    checkId: PropTypes.bool.isRequired,
  })).isRequired,
  tax: PropTypes.string,
  total: PropTypes.string,
  checkout: PropTypes.func.isRequired,
}
  //restrictioncheck: PropTypes.bool,
  // hasRestriction: PropTypes.bool,


const mapStateToProps = (state) => ({
  products: getCartProducts(state),
  tax: getTax(state),
  total: getTotal(state),
  // hasRestriction: getRestriction(state),
})

export default connect(
  mapStateToProps,
  { checkout }
)(CartContainer)
