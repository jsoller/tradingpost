import React from 'react';
import PropTypes from 'prop-types';
import styles from '../components/TradingPost.css';
import { connect } from 'react-redux';
import { checkout } from '../actions/pointOfSale';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import { remote } from 'electron';
import PromptBox from './PromptBox';

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

const Checkout = ({ products, checkout }) => {
  const hasProducts = products.length > 0;
  const linkFor = (label) => (
    <Link
      className="checkout-btn"
      to="/payment"
      onClick={() => checkout(products)}
      disabled={hasProducts ? '' : 'disabled'}>
      <li>{label}</li>
    </Link>
  );
  const promptbox = () => (
    <PromptBox/>
  );
  
  const promptlink = (label) => (
    <button className="checkout-btn"
      onClick={() => promptbox()}>
      <li>{label}</li>
      </button>
  );

  return (
    <ul className="checkout-list">
      {hasProducts ? linkFor('Cash') : ''}
      {hasProducts ? promptlink('Credit Card') : ''}
      {hasProducts ? linkFor('Check') : ''}
      {hasProducts ? linkFor('Unit Account') : ''}
    </ul>
  )
}


Checkout.propTypes = {
  products: PropTypes.array,
  checkout: PropTypes.func.isRequired,
  // onRestrictionClicked: PropTypes.func,
  // hasRestriction: PropTypes.bool,
}


const mapStateToProps = (state) => ({
})

export default connect(
  mapStateToProps,
  { checkout }
)(Checkout)
