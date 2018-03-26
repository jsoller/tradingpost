import React from 'react';
import PropTypes from 'prop-types';
import { getProductsIPC } from '../actions/ipcHandler';
import styles from './TradingPost.css';

const CartTotal = ({ tax, total }) => (
  <div >
     <div>Tax: &#36;{tax}</div>
      <p>Total: &#36;{total}</p>
  </div>
)

CartTotal.propTypes = {
    tax: PropTypes.string,
    total: PropTypes.string
}

export default CartTotal
