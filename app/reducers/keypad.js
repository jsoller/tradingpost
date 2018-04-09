import { combineReducers } from 'redux';
import * as types from '../constants/ActionTypes';

export function cashpayment(state = '', action) {
    switch (action.type) {
        case types.CASH_ENTRY:
            const { selectedValue } = action;
            if (selectedValue === 'ENTER') {
                return state;
            }
            else if (selectedValue === 'CLEAR') {
                return '';
            }
            else {
                return state + selectedValue;
            }
        default:
            return state;
    }
}


export default combineReducers({
    cashpayment,
})
