import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeFromCart } from '../actions/pointOfSale';

const DisplayProduct = ({ price, quantity, productname, upc, checkId, productid, removeFromCart }) => (
  <div >
    {upc} {productname} - &#36;{price}
    <button
      onClick={() => removeFromCart(productid)}>DEL
      </button>
  </div>
)

DisplayProduct.propTypes = {
  upc: PropTypes.number,
  productname: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number,
  checkId: PropTypes.number,
  productid: PropTypes.number,
  removeFromCart: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
})

export default connect(
  mapStateToProps,
  { removeFromCart }
)(DisplayProduct)
