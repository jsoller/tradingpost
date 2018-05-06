import React from 'react';
import PropTypes from 'prop-types';
import { getProductsByTypeIPC } from '../actions/ipcHandler';
import styles from './TradingPost.css';

const QuickProductSearch = ({ title }) => (
  <div className={styles.leftsidehdr}>
    {/* <h3 >{title}</h3> */}
    <div>
      <button onClick={() => getProductsByTypeIPC('CAMPING')}>CAMPING</button>
      <button onClick={() => getProductsByTypeIPC('PATCHES')}>PATCHES</button>
    </div>
  </div>
)

// QuickProductSearch.propTypes = {
//   title: PropTypes.string.isRequired
// }

export default QuickProductSearch
