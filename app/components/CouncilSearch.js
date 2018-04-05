import React from 'react';
import PropTypes from 'prop-types';
import { getCouncilsIPC, getUnitsIPC } from '../actions/ipcHandler';
import styles from './TradingPost.css';

const CouncilSearch = ({ title }) => (
  <div className={styles.leftsidehdr}>
    <h3 >{title}</h3>
    <div>
      <input className="form-control"
        placeholder="search field"
        value = ""  //could be the searchvalue passed in
        onChange={(searchentry) => getCouncilsIPC('productByName', searchentry.target.value)}
      /*  instead of calling getProductsIPC call an action like searchchange & pass searchentry
      pass in a searchentry value to Councilsearch and then reset it when addtocart*/
      />
    </div>
    <div>
      <input className="form-control"
        placeholder="search field"
        value = ""  //could be the searchvalue passed in
        onChange={(searchentry) => getUnitsIPC('productByName', searchentry.target.value)}
      />
    </div>
  </div>
)

CouncilSearch.propTypes = {
  title: PropTypes.string.isRequired
}

export default CouncilSearch
