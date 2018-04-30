import React from 'react';
import { Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeFromCart } from '../actions/pointOfSale';
import styles from '../components/TradingPost.css';

const DisplayProduct = ({ price, quantity, nme, upc, restricted_item_flag, productid, removeFromCart }) => (
  <div className={styles.cartdisplay}>
    {nme} - &#36;{price}
    <button
      className={styles.cartdisplaydel}
      onClick={() => removeFromCart(productid)}>DEL
      </button>
  </div>
)

DisplayProduct.propTypes = {
  upc: PropTypes.number,
  nme: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number,
  restricted_item_flag: PropTypes.number,
  productid: PropTypes.number,
  removeFromCart: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
})

export default connect(
  mapStateToProps,
  { removeFromCart }
)(DisplayProduct)
