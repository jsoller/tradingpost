import React from 'react';
import PropTypes from 'prop-types';

const SearchProduct = ({ price, quantity, product_name, upc, checkId }) => (
  <div>
    {upc} {product_name} - &#36;{price}{quantity ? ` x ${quantity}` : null}
  </div>
)

SearchProduct.propTypes = {
  upc: PropTypes.string,
  product_name: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number,
  checkId: PropTypes.bool,
}

export default SearchProduct
