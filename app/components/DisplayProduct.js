import React from 'react';
import PropTypes from 'prop-types';

const DisplayProduct = ({ price, quantity, productname, upc, checkId }) => (
  <div >
    {upc} {productname} - &#36;{price}
  </div>
)

DisplayProduct.propTypes = {
  upc: PropTypes.number,
  productname: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number,
  checkId: PropTypes.number,
}

export default DisplayProduct
