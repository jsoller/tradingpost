import React from 'react';
import PropTypes from 'prop-types';
import SearchProduct from './SearchProduct';

const SearchItem = ({ product, onAddToCartClicked }) => (
  <div style={{ marginBottom: 10 }}>
    <button
      onClick={onAddToCartClicked}
      disabled={product.inventory > 0 ? '' : 'disabled'}>
      {product.inventory > 0 ? product.upc + "  " + product.productname + " $" + (product.price / 100) : 
       product.productname + ' Sold Out'}
     </button>
   </div>
)

SearchItem.propTypes = {
  product: PropTypes.shape({
    productname: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inventory: PropTypes.number.isRequired,
    upc: PropTypes.number.isRequired,
    checkId: PropTypes.number.isRequired
  }).isRequired,
  onAddToCartClicked: PropTypes.func.isRequired
}

export default SearchItem
