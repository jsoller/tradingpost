import React from 'react';
import PropTypes from 'prop-types';
import styles from './TradingPost.css';

const PaymentList = ({ products, taxexempt, tax, total, addToCart, checkneeded }) => (
  <div className={styles.bottom}>
    <h3>{checkneeded}</h3>
    <div>{total}</div>
  </div>
)

PaymentList.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        productname: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        inventory: PropTypes.number.isRequired,
        upc: PropTypes.number.isRequired,
        checkId: PropTypes.number.isRequired
      })).isRequired,
      taxexempt: PropTypes.integer,
      tax: PropTypes.string,
      total: PropTypes.string,
      addToCart: PropTypes.func.isRequired,
      checkneeded: PropTypes.string
    }

export default PaymentList