import * as types from '../constants/ActionTypes';
import { getUnitTypesIPC, getUnitsByCouncilIPC } from './ipcHandler';

export const councilSelected = councilid => (dispatch, getState) => {
    dispatch({
        type: types.COUNCIL_SELECTED,
        councilid,
    });
    getUnitTypesIPC();
    let council = getState().payments.councils.find(council => councilid == council.id);
    getUnitsByCouncilIPC(council.orgkey);
}

export const unittypeSelected = unittype => (dispatch, getState) => {
    dispatch({
        type: types.UNITTYPE_SELECTED,
        unittype,
    });
}

export const unitSelected = unit => (dispatch, getState) => {
    dispatch({
        type: types.UNIT_SELECTED,
        unit,
    });
}
