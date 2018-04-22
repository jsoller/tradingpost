import { GET_LOCATIONUSERS } from '../constants/ActionTypes';
import { combineReducers } from 'redux';

export function locationusers(state = [], action) {
    switch (action.type) {
        case GET_LOCATIONUSERS:
            const locationusers = action.locationusers;
            if (locationusers !== undefined && locationusers.length > 0) {
                alert("FOUND");
            }
            else {
                alert("NOT FOUND");
            }
            return locationusers;
        default:
            return state;
    }
}

export function validsignon(state = false, action) {
    switch (action.type) {
        case GET_LOCATIONUSERS:
            const locationusers = action.locationusers;
            if (locationusers !== undefined && locationusers.length > 0) {
                return true;
            }
            else {
                return false;
            }
        default:
            return state;
    }
}

export default combineReducers({
    locationusers,
    validsignon,
})
