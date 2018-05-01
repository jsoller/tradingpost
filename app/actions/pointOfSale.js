import * as types from '../constants/ActionTypes';
import { councils, unittypeSelected } from '../reducers/payments';
import { councilSelected, unitSelected } from './payments';
import { insertTransactionIPC } from '../actions/ipcHandler';

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

//the else allows the sale of products even if remaining count states zero
export const addToCart = productId => (dispatch, getState) => {
  if (getState().processproducts.byId[productId].remain_cnt > 0) {
    dispatch(addToCartUnsafe(productId))
  }
  else {
    dispatch(addToCartUnsafe(productId))
  }
}

export const removeFromCart = productId => (dispatch, getState) => {
  dispatch(removeFromCartUnsafe(productId, (getState().cart.quantityById[productId] || 0) - 1))
}

export const checkout = (transtype, paymenttype, products) => (dispatch, getState) => {
  const { cart } = getState()
  let d = new Date();
  let n = d.toISOString();
  let transactionSummary = {
    tran_date: n,
    tran_user: "user",
    location_id: 123,
    trans_type: transtype,
    payment_type: paymenttype,
    total_sale: 5.25,
    tran_council: "councilSelected",
    tran_unit_type: "unittypeSelected",
    tran_unit: "unitSelected",
    tran_credit_card: "credit card",
    tran_check_name: "check",
    tran_check_num: "checknum",
    tran_tax_exempt: 0,
  };
  let transactionDetail = [

    {
      trans_summary_id: "1",
      item_id: 123,
      quantity: 1,
      refund_ind: 0,
    }
  ];

  // for (products) {
  //   transactionDetail.add(product)
  // }
  insertTransactionIPC(transactionSummary, transactionDetail);
}



