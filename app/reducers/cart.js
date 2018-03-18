import {
  ADD_TO_CART,
  CHECKOUT_REQUEST,
  CHECKOUT_FAILURE
} from '../constants/ActionTypes';

const initialState = {
  addedIds: [],
  quantityById: {}
}

const addedIds = (state = initialState.addedIds, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      if (state.indexOf(action.productid) !== -1) {
        return state
      }
      return [...state, action.productid]
    default:
      return state
  }
}

const quantityById = (state = initialState.quantityById, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { productid } = action
      return {
        ...state,
        [productid]: (state[productid] || 0) + 1,
      }
    default:
      return state
  }
}

export const getQuantity = (state, productid) =>
  state.quantityById[productid] || 0

//  export const checkRestriction = (state, currentRestriction) => {
//   state.hasRestriction || currentRestriction;
//   return;
// }

export const getAddedIds = state => state.addedIds

const cart = (state = initialState, action) => {
  switch (action.type) {
    case CHECKOUT_REQUEST:
      return initialState
    case CHECKOUT_FAILURE:
      return action.cart
    default:
      return {
        addedIds: addedIds(state.addedIds, action),
        quantityById: quantityById(state.quantityById, action),
      }
  }
}

export default cart
