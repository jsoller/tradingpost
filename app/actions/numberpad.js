import * as types from '../constants/ActionTypes';

export const amountEntered = selectedValue => (dispatch, getState) => {
    console.log("cash payment", selectedValue);
    dispatch({
        type: types.CASH_ENTRY,
        selectedValue,
    });
}
