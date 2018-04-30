// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import cart, * as fromCart from './cart';
import processproducts, * as fromQuickProducts from './processproducts';
import keypad from './keypad';
import payments from './payments';
import login from './login';
import { RECEIVE_UNITTYPES, GET_LOCATION } from '../constants/ActionTypes';

const getAddedIds = state => fromCart.getAddedIds(state.cart)
const getQuantity = (state, id) => fromCart.getQuantity(state.cart, id)
// const checkRestriction = (hasRestriction, state) => fromCart.checkRestriction(hasRestriction, state.cart)
const getProduct = (state, id) => fromQuickProducts.getProduct(state.processproducts, id)

// var taxRate = .0675;
var taxInd = 1;
var tax = 0;
var total = 0;

export const getPreTaxTotal = state => {
  return getAddedIds(state)
    .reduce((total, id) =>
      total + getProduct(state, id).price * getQuantity(state, id),
      0
    )
}

export const getNumTax = state => {
  let tax = (((getPreTaxTotal(state) * state.taxRate) * taxInd));
  return tax;
}

export const getTax = state => {
  return getNumTax(state).toFixed(2);
}

export const getTotal = state => {
  let grandTotal = ((getPreTaxTotal(state)) + (getNumTax(state)));
  grandTotal = (grandTotal).toFixed(2);
  return grandTotal
}

export const getCartProducts = state => {
  return getAddedIds(state).map(id => ({
    ...getProduct(state, id),
    quantity: getQuantity(state, id)
  })
  )
}

export const taxRate = (state = 0.0, action) => {
  switch (action.type) {
    case GET_LOCATION:
      return action.location.tax_percent;
    default:
      return state;
  }
}

// export const getRestriction = state => {
//   getAddedIds(state).map(id => {
//     // checkRestriction(getProduct(state, id).restricted_item_flag), false;
//     let hasRestriction = getProduct(state, id).restricted_item_flag
//     return hasRestriction;
//   }
//   )
// }

const rootReducer = combineReducers({
  cart,
  keypad,
  payments,
  processproducts,
  router,
  login,
  taxRate,
});

export default rootReducer;
