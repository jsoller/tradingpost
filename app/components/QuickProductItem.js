import React from 'react';
import PropTypes from 'prop-types';
import DisplayProduct from './DisplayProduct';

//currently allowing products to be sold even if inventory states none left
const QuickProductItem = ({ product, onAddToCartClicked }) => (
  <div style={{ marginBottom: 10 }}>
    <button
      onClick={onAddToCartClicked}
      // disabled={product.inventory > 0 ? '' : 'disabled'}
      >
      {/* {product.inventory > 0 ? product.productname + " $" + (product.price / 100) : 
       product.productname + ' Sold Out'} */}
      {product.productname + " $" + (product.price / 100) +  '   ' + product.inventory} 
    </button>
    <button>
    {product.checkId === 1 ? "check id" : ""}
      </button>
   </div>
)

QuickProductItem.propTypes = {
  product: PropTypes.shape({
    productname: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inventory: PropTypes.number.isRequired,
    upc: PropTypes.number.isRequired,
    checkId: PropTypes.number.isRequired
  }).isRequired,
  onAddToCartClicked: PropTypes.func.isRequired
}

export default QuickProductItem
