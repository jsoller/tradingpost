import React from 'react';
import PropTypes from 'prop-types';
import DisplayProduct from './DisplayProduct';

//currently allowing products to be sold even if remain_cnt states none left
const QuickProductItem = ({ product, onAddToCartClicked }) => (
  <div style={{ marginBottom: 10 }}>
    <button
      onClick={onAddToCartClicked}
      // disabled={product.remain_cnt > 0 ? '' : 'disabled'}
      >
      {/* {product.remain_cnt > 0 ? product.nme + " $" + (product.price / 100) : 
       product.nme + ' Sold Out'} */}
      {product.nme + " $" + (product.price) +  '   ' + product.remain_cnt} 
    </button>
    <button>
    {product.restricted_item_flag === 1 ? "check id" : ""}
      </button>
   </div>
)

QuickProductItem.propTypes = {
  product: PropTypes.shape({
    nme: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    remain_cnt: PropTypes.number.isRequired,
    upc_code: PropTypes.string.isRequired,
    restricted_item_flag: PropTypes.number.isRequired
  }).isRequired,
  onAddToCartClicked: PropTypes.func.isRequired
}

export default QuickProductItem
