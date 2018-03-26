import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { addToCart } from '../actions/pointOfSale';
import { getVisibleProducts } from '../reducers/processproducts';
import QuickProductItem from '../components/QuickProductItem';
import QuickProductsList from '../components/QuickProductsList';

const QuickProductsContainer = ({ products, addToCart }) => (
  // <QuickProductsList title="Quick Products">
    <QuickProductsList>
    {products.map(product =>
      <QuickProductItem
        key={product.id}
        product={product}
        onAddToCartClicked={() => addToCart(product.id)} />
    )}
  </QuickProductsList>
)

QuickProductsContainer.propTypes = {
products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    productname: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inventory: PropTypes.number.isRequired,
    upc: PropTypes.number.isRequired,
    checkId: PropTypes.number.isRequired
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
)(QuickProductsContainer)
