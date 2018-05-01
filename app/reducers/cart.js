import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
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
      if (state.indexOf(action.productId) !== -1) {
        return state
      }
      return [...state, action.productId]
    case REMOVE_FROM_CART:
      if (action.quantity > 0) {
        return state;
      } else {
        return state.filter(productId => productId !== action.productId);
      }
    default:
      return state
  }
}

const quantityById = (state = initialState.quantityById, action) => {
  const { productId } = action;
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        [productId]: (state[productId] || 0) + 1,
      }
    case REMOVE_FROM_CART:
      let currentQuantity = (state[productId] || 0) - 1;
      if (currentQuantity <= 0) {
        delete state[productId];
        return {
          ...state
        };
      } else {
        return {
          ...state,
          [productId]: currentQuantity,
        };
      }
    default:
      return state
  }
}

export const getQuantity = (state, productId) =>
  state.quantityById[productId] || 0

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
