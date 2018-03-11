import React from 'react';
import PropTypes from 'prop-types';

const SearchProduct = ({ price, quantity, productname, upc, checkId }) => (
  <div>
    {upc} {productname} - &#36;{price}{quantity ? ` x ${quantity}` : null}
  </div>
)

SearchProduct.propTypes = {
  upc: PropTypes.string,
  productname: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number,
  checkId: PropTypes.bool,
}

export default SearchProduct
