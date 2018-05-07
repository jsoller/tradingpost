import { GET_LOCATIONUSERS, GET_LOCATION, RECEIVE_CATEGORIES } from '../constants/ActionTypes';
import { combineReducers } from 'redux';
import { getProductsIPC, getLocationIPC, getCouncilsIPC, getUnitTypesIPC, getCategoriesIPC } from '../actions/ipcHandler';

export function locationusers(state = [], action) {
    switch (action.type) {
        case GET_LOCATIONUSERS:
            const locationusers = action.locationusers;
            if (locationusers == undefined || locationusers.length <= 0) {
                alert("User Name or Password is not valid");
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
                getProductsIPC();
                getLocationIPC(locationusers[0].mdm_location_id)
                getCouncilsIPC();
                getUnitTypesIPC();
                getCategoriesIPC();
                return true;
            }
            else {
                return false;
            }
        default:
            return state;
    }
}

export function location(state = {}, action) {
    switch (action.type) {
        case GET_LOCATION:
            return action.location;
        default:
            return state;
    }
}
export function categories(state = [], action) {
    switch (action.type) {
        case RECEIVE_CATEGORIES:
            return [...action.categories];
        default:
            return state;
    }
}

export default combineReducers({
    locationusers,
    validsignon,
    location,
    categories,
})
