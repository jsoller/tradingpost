import React from 'react';
import PropTypes from 'prop-types';
import SearchProduct from './SearchProduct';

const SearchItem = ({ product, onAddToCartClicked }) => (
  <div style={{ marginBottom: 10 }}>
    <button
      onClick={onAddToCartClicked}
      disabled={product.inventory > 0 ? '' : 'disabled'}>
      {product.inventory > 0 ? product.upc + "  " + product.product_name + " $" + (product.price / 100) : 
       product.product_name + ' Sold Out'}
     </button>
   </div>
)

SearchItem.propTypes = {
  product: PropTypes.shape({
    product_name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inventory: PropTypes.number.isRequired,
    upc: PropTypes.string.isRequired,
    checkId: PropTypes.bool.isRequired
  }).isRequired,
  onAddToCartClicked: PropTypes.func.isRequired
}

export default SearchItem
