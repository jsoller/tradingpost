import React from 'react';
import PropTypes from 'prop-types';
import styles from '../components/TradingPost.css';
import { connect } from 'react-redux';
import { checkout } from '../actions/pointOfSale';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import { remote } from 'electron';
import PromptBox from './PromptBox';
import { checkRestriction } from '../actions/payments';
import { Redirect } from 'react-router-dom';
import withRouter from 'react-router-dom/withRouter';

// const Checkout = ({ products, tax, total, onCheckoutClicked, onRestrictionClicked hasRestriction}) => {
// function getValue() {
//   <FormGroup check className="sm">
//                 <Label>Enter Credit Card Authorization</Label>
//                 <Input
//                     autoFocus
//                     type="text"
//                     value=''
//                     // onChange={(event) => this.handleChange(event, 'username')}
//                 />
//             </FormGroup>
// };
const checkProducts = (products) => {
  console.log("restrictioncontainer")
  let checkneeded = false;
  products.forEach(product => {
    if (product.checkId === 1) {
      checkneeded = true
    }
    console.log("checkid ", product.checkId, ' checkneeded ', checkneeded)
  });
  return checkneeded;
};

const Checkout = ({ products, history, checkout }) => {
  const hasProducts = products.length > 0;
  const checkneeded = hasProducts ? (checkProducts(products)) : false;
  // const linkFor = (label) => (
  //   <Link
  //     className="checkout-btn"
  //     to="/payment"
  //     onClick={() => checkout(products)}
  //     disabled={hasProducts ? '' : 'disabled'}>
  //     <li>{label}</li>
  //   </Link>
  //);

const promptbox = () => {
  if (checkneeded) {
    alert("Restricted item purchased - validation check needed before checking out")
  }
  return history.push("/payment");
};

const promptlink = (label) => (
  <button className="checkout-btn"
    onClick={() => promptbox()}>
    <li>{label}</li>
  </button>
);

return (
  <ul className="checkout-list">
    {hasProducts ? promptlink('Cash') : ''}
    {hasProducts ? promptlink('Credit Card') : ''}
    {hasProducts ? promptlink('Check') : ''}
    {hasProducts ? promptlink('Unit Account') : ''}
  </ul>
)
}


Checkout.propTypes = {
  products: PropTypes.array,
  checkout: PropTypes.func.isRequired,
}


const mapStateToProps = (state) => ({
})

export default withRouter(connect(
  mapStateToProps,
  { checkout }
)(Checkout))
