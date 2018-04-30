import { combineReducers } from 'redux';
import * as types from '../constants/ActionTypes';
import { getUnitsByCouncilIPC } from '../actions/ipcHandler';

export function councils(state = [], action) {
    switch (action.type) {
        case types.RECEIVE_COUNCILS:
            return action.councils;
        default:
            return state;
    }
}

export function councilSelected(state = '', action) {
    switch (action.type) {
        case types.COUNCIL_SELECTED:
            return action.councilid;
        default:
            return state;
    }
}

export function unittypes(state = [], action) {
    switch (action.type) {
        case types.RECEIVE_UNITTYPES:
            return action.unittypes;
        default:
            return state;
    }
}

export function unittypeSelected(state = {}, action) {
    switch (action.type) {
        case types.UNITTYPE_SELECTED:
            return action.unittype;
        default:
            return state;
    }
}

export function units(state = [], action) {
    switch (action.type) {
        case types.RECEIVE_COUNCILS:
            console.log('councils ', action.councils)
            if (action.councils.length > 0) {
                getUnitsByCouncilIPC('unitByCouncil', action.councils[0].orgkey);
            }
            return state;
        case types.RECEIVE_UNITS:
            return action.units;
        default:
            return state;
    }
}

export function unitSelected(state = {}, action) {
    switch (action.type) {
        case types.UNIT_SELECTED:
            return action.unit;
        default:
            return state;
    }
}

export default combineReducers({
    councils,
    councilSelected,
    unittypes,
    unittypeSelected,
    units,
    unitSelected,
})
