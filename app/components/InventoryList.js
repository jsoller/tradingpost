import React from 'react';
import PropTypes from 'prop-types';
import styles from './TradingPost.css';

const Inventoryist = ({ children }) => (
  <div className={styles.leftside}>
    <div>{children}</div>
  </div>
)

Inventoryist.propTypes = {
  children: PropTypes.node,
  // title: PropTypes.string.isRequired
}

export default Inventoryist
