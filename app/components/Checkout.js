import React from 'react';
import PropTypes from 'prop-types';
import styles from '../components/TradingPost.css';

// const Checkout = ({ products, tax, total, onCheckoutClicked, onRestrictionClicked hasRestriction}) => {

const Checkout = ({ products, tax, total, onCheckoutClicked }) => {
  const hasProducts = products.length > 0

  return (
    <div >
      <button onClick={onCheckoutClicked}
        disabled={hasProducts ? '' : 'disabled'}>
        Checkout
      </button>
    </div>
  )
}

  
Checkout.propTypes = {
  products: PropTypes.array,
  tax: PropTypes.integer,
  total: PropTypes.integer,
  onCheckoutClicked: PropTypes.func
  // onRestrictionClicked: PropTypes.func,
  // hasRestriction: PropTypes.bool,
}

export default Checkout

