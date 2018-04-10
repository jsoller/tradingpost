import React from 'react';
import PropTypes from 'prop-types';
import styles from '../components/TradingPost.css';
import { connect } from 'react-redux';
import { checkout } from '../actions/pointOfSale';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

// const Checkout = ({ products, tax, total, onCheckoutClicked, onRestrictionClicked hasRestriction}) => {

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

  return (
    <ul className="checkout-list">
      {linkFor('Cash')}
      {linkFor('Credit Card')}
      {linkFor('Check')}
      {linkFor('Unit Account')}
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
