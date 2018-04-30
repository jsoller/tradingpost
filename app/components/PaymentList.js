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
        nme: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        remain_cnt: PropTypes.number.isRequired,
        upc_code: PropTypes.string.isRequired,
        restricted_item_flag: PropTypes.number.isRequired
      })).isRequired,
      taxexempt: PropTypes.integer,
      tax: PropTypes.string,
      total: PropTypes.string,
      addToCart: PropTypes.func.isRequired,
      checkneeded: PropTypes.string
    }

export default PaymentList