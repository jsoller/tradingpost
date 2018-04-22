import shop from '../api/shop';
import * as types from '../constants/ActionTypes';

const receiveProducts = products => ({
  type: types.RECEIVE_PRODUCTS,
  products
})

const addToCartUnsafe = productId => ({
  type: types.ADD_TO_CART,
  productId
})

const removeFromCartUnsafe = (productId, quantity) => ({
  type: types.REMOVE_FROM_CART,
  productId,
  quantity,
})

//the else allows the sale of products even if inventory states zero
export const addToCart = productId => (dispatch, getState) => {
  if (getState().processproducts.byId[productId].inventory > 0) {
    dispatch(addToCartUnsafe(productId))
  }
  else {
    dispatch(addToCartUnsafe(productId))
  }
}

export const removeFromCart = productId => (dispatch, getState) => {
  dispatch(removeFromCartUnsafe(productId, (getState().cart.quantityById[productId] || 0) - 1))
}

export const checkRestriction = productId => (dispatch, getState) => {
}

export const checkout = products => (dispatch, getState) => {
  const { cart } = getState()

  dispatch({
    type: types.CHECKOUT_REQUEST
  })
  shop.buyProducts(products, () => {
    dispatch({
      type: types.CHECKOUT_SUCCESS,
      cart
    })
    // Replace the line above with line below to rollback on failure:
    // dispatch({ type: types.CHECKOUT_FAILURE, cart })
  })
}

// export const restrictioncheck = products => (dispatch, getState) => {
//      restrictioncheck = false;
// }


