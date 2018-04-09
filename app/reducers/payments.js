import { combineReducers } from 'redux';
import * as types from '../constants/ActionTypes';

export function councils (state = [], action) {
    switch (action.type) {
        case types.RECEIVE_COUNCILS:
            return action.councils;
        default:
            return state;
    }
}

export function councilSelected (state = {}, action) {
    switch (action.type) {
        case types.COUNCIL_SELECTED:
        return action.council;
        default:
        return state;
    }
}

export function districts (state = [], action) {
    switch (action.type) {
        case types.RECEIVE_DISTRICTS:
            return action.districts;
        default:
            return state;
    }
}

export function districtSelected (state = {}, action) {
    switch (action.type) {
        case types.DISTRICT_SELECTED:
           return action.district;
        default:
           return state;
    }
}

export default combineReducers({
    councils,
    councilSelected,
    districts,
    districtSelected,
})
