import React from 'react';
import PropTypes from 'prop-types';
import DisplayProduct from './DisplayProduct';


// const Cart = ({ products, tax, total, onCheckoutClicked, onRestrictionClicked hasRestriction}) => {
 
const Cart = ({ products, tax, total, onCheckoutClicked}) => {
  const hasProducts = products.length > 0
  const nodes = hasProducts ? (
    products.map(product =>
      <DisplayProduct
        upc={product.upc}
        product_name={product.product_name}
        price={product.price / 100}
        quantity={product.quantity}
        checkId={product.checkId}
        key={product.id}
      />
    )
  ) : (
      <em>Please add some products to cart.</em>
    )

  return (
    <div>
      <h3>Total Purchases</h3>
      <div>{nodes}</div>
      <div>Tax: &#36;{tax}</div>
      <p>Total: &#36;{total}</p>
      <button onClick={onCheckoutClicked}
        disabled={hasProducts ? '' : 'disabled'}>
        Checkout
      </button>
     </div>
  )
}

Cart.propTypes = {
  products: PropTypes.array,
  tax: PropTypes.string,
  total: PropTypes.string,
  onCheckoutClicked: PropTypes.func
 // onRestrictionClicked: PropTypes.func,
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