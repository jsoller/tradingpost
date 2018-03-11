import React from 'react';
import PropTypes from 'prop-types';

const DisplayProduct = ({ price, quantity, productname, upc, checkId }) => (
  <div>
    {upc} {productname} - &#36;{price}{quantity ? ` x ${quantity}` : null}
  </div>
)

DisplayProduct.propTypes = {
  upc: PropTypes.string,
  productname: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number,
  checkId: PropTypes.bool,
}

export default DisplayProduct
