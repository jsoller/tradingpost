import React from 'react';
import PropTypes from 'prop-types';

const DisplayProduct = ({ price, quantity, product_name, upc, checkId }) => (
  <div>
    {upc} {product_name} - &#36;{price}{quantity ? ` x ${quantity}` : null}
  </div>
)

DisplayProduct.propTypes = {
  upc: PropTypes.string,
  product_name: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number,
  checkId: PropTypes.bool,
}

export default DisplayProduct
