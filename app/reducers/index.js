// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import cart, * as fromCart from './cart';
import processproducts, * as fromQuickProducts from './processproducts';
import keypad from './keypad';
import payments from './payments';

const getAddedIds = state => fromCart.getAddedIds(state.cart)
const getQuantity = (state, id) => fromCart.getQuantity(state.cart, id)
// const checkRestriction = (hasRestriction, state) => fromCart.checkRestriction(hasRestriction, state.cart)
const getProduct = (state, id) => fromQuickProducts.getProduct(state.processproducts, id)

var taxRate = 675;
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
  let tax = (((getPreTaxTotal(state) * taxRate) * taxInd) / 1000000);
  return tax;
}

export const getTax = state => {
  return getNumTax(state).toFixed(2);
}

export const getTotal = state => {
  let grandTotal = ((getPreTaxTotal(state) * 100) + (getNumTax(state) * 10000));
  grandTotal = (grandTotal / 10000).toFixed(2);
  return grandTotal
}

export const getCartProducts = state => {
  return getAddedIds(state).map(id => ({
    ...getProduct(state, id),
    quantity: getQuantity(state, id)
  })
  )
}

// export const getRestriction = state => {
//   getAddedIds(state).map(id => {
//     // checkRestriction(getProduct(state, id).checkId), false;
//     let hasRestriction = getProduct(state, id).checkId
//     return hasRestriction;
//   }
//   )
// }

const rootReducer = combineReducers({
  counter,
  cart,
  keypad,
  payments,
  processproducts,
  router,
});

export default rootReducer;
