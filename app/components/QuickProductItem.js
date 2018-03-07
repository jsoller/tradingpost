import React from 'react';
import PropTypes from 'prop-types';
import QuickProduct from './QuickProduct';

const QuickProductItem = ({ product, onAddToCartClicked }) => (
  <div style={{ marginBottom: 20 }}>
    {/* <QuickProduct
      // upc={product.upc}
      // product_name={product.product_name}
      // price={product.price / 100}
      // quantity={product.inventory} 
      // checkId={product.checkId}/> */}
    <button
      onClick={onAddToCartClicked}
      disabled={product.inventory > 0 ? '' : 'disabled'}>
      {product.inventory > 0 ? product.product_name + " $" + (product.price / 100) : 
       product.product_name + ' Sold Out'}
      {/* {product.inventory > 0 ? 'Add to cart' : 'Sold Out'} */}
    </button>
    <button>
    {product.checkId === true ? "check id" : ""}
      </button>
   </div>
)

QuickProductItem.propTypes = {
  product: PropTypes.shape({
    product_name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inventory: PropTypes.number.isRequired,
    upc: PropTypes.string.isRequired,
    checkId: PropTypes.bool.isRequired
  }).isRequired,
  onAddToCartClicked: PropTypes.func.isRequired
}

export default QuickProductItem