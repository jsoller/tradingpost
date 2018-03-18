import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { setRestriction } from '../actions/pointOfSale';
import { getVisibleProducts } from '../reducers/processproducts';
import FunctionItem from '../components/FunctionItem';
import FunctionList from '../components/FunctionList';

const FunctionContainer = ({ products, addToCart }) => (
  <FunctionList title="Functions">
    {products.map(product =>
      <FunctionItem
        key={product.productid}
        product={product}
        onCheckRestrictionClicked={() => setRestriction(product.productid)} />
    )}
  </FunctionList>
)

FunctionContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    productid: PropTypes.number.isRequired,
    checkId: PropTypes.bool.isRequired
  })).isRequired,
  setRestriction: PropTypes.func
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
  { setRestriction }
)(FunctionContainer)
