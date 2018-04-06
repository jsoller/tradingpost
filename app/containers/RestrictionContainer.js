import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { addToCart } from '../actions/pointOfSale';
import { getVisibleProducts } from '../reducers/processproducts';
import RestrictionList from '../components/RestrictionList';
import PaymentPage from '../containers/PaymentPage';

const checkProducts = (products) => {
  console.log("restrictioncontainer")
  let checkneeded = 0;
  products.forEach(product => {
    for (let i = 0; i < product.quantity; i++) {
      // if products.checkId = 1 {
      //   let checkneeded = 1
      // }
      console.log("checkid ", product.checkId)
    }
  });
  return checkneeded;
};

const RestrictionContainer = ({ products }) => {
  const hasProducts = products.length > 0
  const checkneeded = hasProducts ? (
     checkProducts(products)
   ) : 0

  //  < PaymentContainer 
  //      products = { products }
  //      taxexempt = { taxexempt }
  //      tax = { tax }
  //      total = { total }
  //     //  onCheckoutClicked={() => RestrictionList(products)}
  //      checkneeded = { checkneeded }
  //  />
}

RestrictionContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    productname: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inventory: PropTypes.number.isRequired,
    upc: PropTypes.number.isRequired,
    checkId: PropTypes.number.isRequired
  })).isRequired,
  taxexempt: PropTypes.integer,
  tax: PropTypes.string,
  total: PropTypes.string,
  addToCart: PropTypes.func.isRequired,
  checkneeded: PropTypes.string
}
