import React from 'react';
import PropTypes from 'prop-types';
import styles from '../components/TradingPost.css';
import { connect } from 'react-redux';
import { checkout } from '../actions/pointOfSale';

// const Checkout = ({ products, tax, total, onCheckoutClicked, onRestrictionClicked hasRestriction}) => {

const Checkout = ({ products, checkout }) => {
  const hasProducts = products.length > 0

  return (
    <div >
      <button 
      onClick={() => checkout(products)}
        disabled={hasProducts ? '' : 'disabled'}>
        Checkout
      </button>
    </div>
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
