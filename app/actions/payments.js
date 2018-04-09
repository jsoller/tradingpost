import * as types from '../constants/ActionTypes';
import { getDistrictsIPC } from './ipcHandler';

export const councilSelected = council => (dispatch, getState) => {
    dispatch({
        type: types.COUNCIL_SELECTED,
        council,
    });
    getDistrictsIPC('district', council.orgkey);
}

export const districtSelected = district => (dispatch, getState) => {
    dispatch({
        type: types.DISTRICT_SELECTED,
        district,
    });
}

