import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { addToCart } from '../actions/pointOfSale';
import { getVisibleProducts } from '../reducers/processproducts';
import InventoryItem from '../components/InventoryItem';
import InventoryList from '../components/InventoryList';

const InventoryContainer = ({ products, addToCart }) => (
  // <InventoryList title="Quick Products">
    <InventoryList>
    {products.map(product =>
      <InventoryItem
        key={product.id}
        product={product}
        onAddToCartClicked={() => addToCart(product.id)} />
    )}
  </InventoryList>
)

InventoryContainer.propTypes = {
products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    nme: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    remain_cnt: PropTypes.number.isRequired,
    upc_code: PropTypes.string.isRequired,
    restricted_item_flag: PropTypes.number.isRequired
  })).isRequired,
  addToCart: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
  products: getVisibleProducts(state.processproducts)
  };
}

// const mapStateToProps = state => ({
//   products: getVisibleProducts(state.products)
// })

export default connect(
  mapStateToProps,
  { addToCart }
)(InventoryContainer)
