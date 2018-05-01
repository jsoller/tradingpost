import React from 'react';
import PropTypes from 'prop-types';
import { getProductsIPC } from '../actions/ipcHandler';
import styles from './TradingPost.css';

const QuickProductSearch = ({ title }) => (
  <div className={styles.leftsidehdr}>
    {/* <h3 >{title}</h3> */}
    <div>
      <button onClick={() => getProductsIPC('productByType', 'CAMPING')}>CAMPING</button>
      <button onClick={() => getProductsIPC('productByType', 'PATCHES')}>PATCHES</button>
    </div>
  </div>
)

// QuickProductSearch.propTypes = {
//   title: PropTypes.string.isRequired
// }

export default QuickProductSearch
