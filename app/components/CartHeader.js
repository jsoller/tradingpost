import React from 'react';
import PropTypes from 'prop-types';
import styles from './TradingPost.css';

const CartHeader = ({ title }) => (
  <div >
    <h3 >{title}</h3>
  </div>
)

CartHeader.propTypes = {
  title: PropTypes.string.isRequired
}

export default CartHeader
