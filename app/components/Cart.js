import React from 'react';
import PropTypes from 'prop-types';
import DisplayProduct from './DisplayProduct';
import styles from '../components/TradingPost.css';

// const Cart = ({ products, tax, total, onCheckoutClicked, onRestrictionClicked hasRestriction}) => {

const displayProducts = (products) => {
  let nodes = [];
  products.forEach(product => {
    for (let i = 0; i < product.quantity; i++) {
      nodes.push(<DisplayProduct
        upc={product.upc}
        productname={product.productname}
        price={product.price / 100}
        quantity={product.quantity}
        checkId={product.checkId}
        key={"p" + product.id + "p" + i}
        productid={product.id}
      />);
    }
  });
  return nodes;
};

const Cart = ({ products }) => {
  const hasProducts = products.length > 0
  const nodes = hasProducts ? (
    displayProducts(products)
  ) : ""

  return (
    <div className={styles.rightside}>
      <div>{nodes}</div>
    </div>
  )
}

Cart.propTypes = {
  products: PropTypes.array,
}

export default Cart
