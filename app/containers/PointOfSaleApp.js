import React from 'react';
import QuickProductsContainer from './QuickProductsContainer';
import CartContainer from './CartContainer';
import SearchContainer from './SearchContainer';
import FunctionContainer from './FunctionContainer';

const PointOfSaleApp = () => (
  <div>
    <h2>Trading Post Sales</h2>
    <hr />
    <SearchContainer />
    <hr />
    <QuickProductsContainer />
    <hr />
    <CartContainer />
    <hr />
    <FunctionContainer />
  </div>
)

export default PointOfSaleApp
