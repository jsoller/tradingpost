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
  // tax: PropTypes.integer,
  // total: PropTypes.integer
  // hasRestriction: PropTypes.bool,
}

export default Cart

// const needIdChecked = products.checkId

// var needIdChecked;
// if (products.checkId === true) {
//   needIdChecked = true
//     }  


{/* <button onClick={onRestrictionClicked}
        disabled={hasRestriction ? '' : 'disabled'}>
        Check Id
      </button> */}
{/* <button>
    {/* {products.checkId === true ? "check id" : ""} */}
{/* </button> }}
      {/* <Control.button  model="needIdChecked" disabled={{ valid: false, touched: true }} 
      className="btn btn-warning" >
       Check Id </Control.button> */}
{/* <button disabled={!needIdChecked} className="btn btn-warning">
      {needIdChecked ? "Check Id" : "No Check"}</button> */}
{/* <button type="button" className="btn btn-warning">
      {disabled={needIdChecked ?  "check id" : ""}> no check</button> */}