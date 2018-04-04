import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { addToCart } from '../actions/pointOfSale';
import { getVisibleProducts } from '../reducers/processproducts';
import PaymentList from '../components/PaymentList';


const PaymentContainer = ({ products, taxexempt, tax, total, addToCart, checkneeded }) => (
    <PaymentList>
    {products.map(product =>
      <PaymentItem
        key={product.id}
        product={product}
        onAddToCartClicked={() => addToCart(product.id)} />
    )}
  </PaymentList>
);

PaymentContainer.propTypes = {
products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    productname: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inventory: PropTypes.number.isRequired,
    upc: PropTypes.number.isRequired,
    checkId: PropTypes.number.isRequired
  })).isRequired,
  taxexempt: PropTypes.integer,
  tax: PropTypes.integer,
  total: PropTypes.integer,
  addToCart: PropTypes.func.isRequired,
  checkneeded: PropTypes.string
}

