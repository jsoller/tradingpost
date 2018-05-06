import React from 'react';
import PropTypes from 'prop-types';
import { getProductsByNameIPC } from '../actions/ipcHandler';
import styles from './TradingPost.css';

const InventorySearch = ({ title }) => (
  <div className={styles.leftsidehdr}>
    <div>
      <input className="form-control"
        placeholder="search field"
        // value = ""  //if this is set to null it resets what is entered so do not see letters typed
        onChange={(searchentry) => getProductsByNameIPC(searchentry.target.value)}
      /*  instead of calling getProductsIPC call an action like searchchange & pass searchentry
      pass in a searchentry value to quickproductsearch and then reset it when addtocart*/
      />
    </div>
  </div>
)

// InventorySearch.propTypes = {
//   title: PropTypes.string.isRequired
// }

export default InventorySearch
