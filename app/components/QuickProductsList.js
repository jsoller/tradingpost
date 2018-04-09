import React from 'react';
import PropTypes from 'prop-types';
import { getProductsIPC } from '../actions/ipcHandler';
import styles from './TradingPost.css';

const QuickProductsList = ({ children }) => (
  <div className={styles.leftside}>
    <div>{children}</div>
  </div>
)

QuickProductsList.propTypes = {
  children: PropTypes.node,
  // title: PropTypes.string.isRequired
}

export default QuickProductsList
