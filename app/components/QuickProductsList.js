import React from 'react';
import PropTypes from 'prop-types';
import { getProductsIPC } from '../actions/ipcHandler';
import styles from './TradingPost.css';

const QuickProductsList = ({ children }) => (
  <div className={styles.leftside}>
    {/* <h3 >{title}</h3>
    <div>
      <button onClick={() => getProductsIPC('productByType', 'M')}>merchandise</button>
      <button onClick={() => getProductsIPC('productByType', 'F')}>food</button>
    </div> */}
    <div>{children}</div>
  </div>
)

QuickProductsList.propTypes = {
  children: PropTypes.node,
  // title: PropTypes.string.isRequired
}

export default QuickProductsList
