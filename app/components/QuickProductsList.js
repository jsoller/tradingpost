import React from 'react';
import PropTypes from 'prop-types';
import { getProductsIPC } from '../actions/ipcHandler';

const QuickProductsList = ({ title, children }) => (
  <div>
    <h3>{title}</h3>
    {/* <div className="w3-bar w3-black"> */}
    <div>
      {/* <a href="#" className="w3-bar-item w3-button"> FOOD </a>
      <a href="#" className="w3-bar-item w3-button"> MERCHANDISE</a> */}
      <button onClick={() => getProductsIPC('productByType', 'M')}>productsByType</button>
      <button onClick={() => getProductsIPC('product', null)}>product</button>
    </div>
    <div>{children}</div>
  </div>
)

QuickProductsList.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired
}

export default QuickProductsList
