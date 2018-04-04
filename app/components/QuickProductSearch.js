import React from 'react';
import PropTypes from 'prop-types';
import { getProductsIPC } from '../actions/ipcHandler';
import styles from './TradingPost.css';

const QuickProductSearch = ({ title }) => (
  <div className={styles.leftsidehdr}>
    <h3 >{title}</h3>
    <div>
      <input className="form-control"
        placeholder="search field"
        value = ""  //could be the searchvalue passed in
        onChange={(searchentry) => getProductsIPC('productByName', searchentry.target.value)}
      /*  instead of calling getProductsIPC call an action like searchchange & pass searchentry
      pass in a searchentry value to quickproductsearch and then reset it when addtocart*/
      />
    </div>
    <div>
      <button onClick={() => getProductsIPC('productByType', 'M')}>merchandise</button>
      <button onClick={() => getProductsIPC('productByType', 'F')}>food</button>
    </div>
  </div>
)

QuickProductSearch.propTypes = {
  title: PropTypes.string.isRequired
}

export default QuickProductSearch
