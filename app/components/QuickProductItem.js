import React from 'react';
import PropTypes from 'prop-types';
import DisplayProduct from './DisplayProduct';

const QuickProductItem = ({ product, onAddToCartClicked }) => (
  <div style={{ marginBottom: 20 }}>
    {/* <DisplayProduct
      // upc={product.upc}
      // productname={product.productname}
      // price={product.price / 100}
      // quantity={product.inventory} 
      // checkId={product.checkId}/> */}
    <button
      onClick={onAddToCartClicked}
      disabled={product.inventory > 0 ? '' : 'disabled'}>
      {product.inventory > 0 ? product.productname + " $" + (product.price / 100) : 
       product.productname + ' Sold Out'}
      {/* {product.inventory > 0 ? 'Add to cart' : 'Sold Out'} */}
    </button>
    <button>
    {product.checkId === true ? "check id" : ""}
      </button>
   </div>
)

QuickProductItem.propTypes = {
  product: PropTypes.shape({
    productname: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inventory: PropTypes.number.isRequired,
    upc: PropTypes.string.isRequired,
    checkId: PropTypes.bool.isRequired
  }).isRequired,
  onAddToCartClicked: PropTypes.func.isRequired
}

export default QuickProductItem
