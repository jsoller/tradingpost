import React from 'react';
import PropTypes from 'prop-types';
import styles from '../components/TradingPost.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { remote } from 'electron';
import PromptBox from './PromptBox';
import { Redirect } from 'react-router-dom';
import withRouter from 'react-router-dom/withRouter';

// const Checkout = ({ products, tax, total, onCheckoutClicked, onRestrictionClicked hasRestriction}) => {

const checkProducts = (products) => {
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


  const promptbox = (linkpath) => {
    if (checkneeded) {
      alert("Restricted item purchased - validation check needed before checking out")
    }
    return history.push(linkpath);
  };

  const promptlink = (label, linkpath) => (
    <button className="checkout-btn"
      onClick={() => promptbox(linkpath)}>
      <li>{label}</li>
    </button>
  );

  return (
    <ul className="checkout-list">
      {hasProducts ? promptlink('Cash', '/payment') : ''}
      {hasProducts ? promptlink('Credit Card', '/payment') : ''}
      {hasProducts ? promptlink('Check', '/payment') : ''}
      {hasProducts ? promptlink('Unit Account', '/payment') : ''}
    </ul>
  )
}


Checkout.propTypes = {
  products: PropTypes.array,
}


const mapStateToProps = (state) => ({
})

export default withRouter(connect(
  mapStateToProps
)(Checkout))
