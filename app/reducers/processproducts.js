import { combineReducers } from 'redux';
import { RECEIVE_PRODUCTS, ADD_TO_CART } from '../constants/ActionTypes';
console.log('start of processproducts of reducers')
const products = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        inventory: state.inventory - 1
      }
    default:
      return state
  }
}
//have objects now instead of array 3/15
const byId = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      let products;
      if (typeof action.products === 'object') {
        products = action.products.values();
      }
      else {
        products = action.products;
      }
      return {
        ...state,
        ...products.reduce((obj, product) => {
          obj[product.productid] = product
          return obj
        }, {})
      }
    default:
      const { productid } = action
      if (productid) {
        return {
          ...state,
          [productid]: products(state[productid], action)
        }
      }
      return state
  }
}

const visibleIds = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return action.products.map(product => product.productid)
    default:
      return state
  }
}

export default combineReducers({
  byId,
  visibleIds
})

export const getProduct = (state, productid) =>
  state.byId[productid]

export const getVisibleProducts = state =>
  state.visibleIds.map(productid => getProduct(state, productid))
