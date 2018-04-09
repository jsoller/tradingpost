import * as types from '../constants/ActionTypes';

export const amountEntered = selectedValue => (dispatch, getState) => {
    dispatch({
        type: types.CASH_ENTRY,
        selectedValue,
    });
}
