import { CHECK_RESTRICTIONS } from '../constants/ActionTypes';
import { combineReducers } from 'redux';

export function restrictioncheck(state = [], action) {
    switch (action.type) {
        case CHECK_RESTRICTIONS:
            const restrictioncheck = action.restrictioncheck;
            if (restrictioncheck == undefined || restrictioncheck.length <= 0) {
                alert("Restricted item purchased - validation check needed before checking out");
            }
            return restrictioncheck;
        default:
            return state;
    }
}

export default combineReducers({
    restrictioncheck,
})
