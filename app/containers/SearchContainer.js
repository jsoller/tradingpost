import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { addToCart } from '../actions/pointOfSale';
import { getVisibleProducts } from '../reducers/processproducts';
import SearchItem from '../components/SearchItem';
import SearchList from '../components/SearchList';
import { getProductsIPC } from '../actions/ipcHandler';

const SearchContainer = ({ products, addToCart }) => (
  // var searchentry = this.props
  <SearchList> {
    <input className ="form-control"
           placeholder = "search field"
           onChange={(searchentry) => getProductsIPC('getProductsByName', searchentry.target.value)}
           />
  }
  </SearchList>
)

SearchContainer.propTypes = {
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
)(SearchContainer)
