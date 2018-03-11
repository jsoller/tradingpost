import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { addToCart } from '../actions/pointOfSale';
import { getVisibleProducts } from '../reducers/processproducts';
import SearchItem from '../components/SearchItem';
import SearchList from '../components/SearchList';

const SearchContainer = ({ products, addToCart }) => (
  <SearchList> {
    <form> <label> Search for Products <input type="text" name="searchname" />
  </label>
    <input type="submit" value="UPC" name="searchupc" />
    <input type="submit" value="Desc" name="searchdesc" />
  </form >
  } 
    {products.map(product =>
      <SearchItem
        key={product.id}
        product={product}
        onAddToCartClicked={() => addToCart(product.id)} />
    )}
  </SearchList>
      )

SearchContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    productname: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inventory: PropTypes.number.isRequired,
    upc: PropTypes.string.isRequired,
    checkId: PropTypes.bool.isRequired
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
