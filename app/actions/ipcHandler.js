import { ipcRenderer } from 'electron';
import * as ipcTypes from '../constants/IpcTypes';
import * as serverTypes from '../constants/ServerTypes';

/**
 * Sends the given data to the server/main process.
 * Data needs to include a String data.type value at least. 
 * 
 * @param {Object} data 
 */
const toServer = (data) => {
    ipcRenderer.send(ipcTypes.IPC_TO_SERVER, data);
}

/**
 * Starts the listener for IPC events to the render
 * 
 * @param {Redux Store} store 
 */
export let startListener = (store) => {
    ipcRenderer.on(ipcTypes.IPC_TO_RENDER, (event, args) => {
        // Dispatch the recieved event to Redux reducers
        store.dispatch(args);
    });
}

//
// The functions below send commands and/or data to the server
//

export let insertTransactionIPC = (transactionSummary, transactionDetail) => {
    toServer({
        type: serverTypes.INSERT_TRANSACTION,
        transSummary: transactionSummary,
        transDetails: transactionDetail,
    });
}

export let getProductsIPC = () => {
    toServer({
        type: serverTypes.PRODUCT,
    });
}

export const getProductsByNameIPC = (productName) => {
    toServer({
        type: serverTypes.PRODUCT_BY_NAME,
        productName,
    });
}

export const getCategoriesIPC = () => {
    toServer({
        type: serverTypes.CATEGORIES,
    });
}

export let getCouncilsIPC = () => {
    toServer({
        type: serverTypes.COUNCIL,
    });
}
export let loadCSVFileNameIPC = (csvFileName) => {
    toServer({
        type: serverTypes.LOAD_CSV_FILENAME,
        csvFileName,
    });
}
export let saveCSVFileNameIPC = (csvFileName) => {
    toServer({
        type: serverTypes.SAVE_CSV_FILENAME,
        csvFileName,
    });
}

export let getUnitTypesIPC = () => {
    toServer({
        type: serverTypes.UNIT_TYPE,
    });
}
export let getUnitsByCouncilIPC = (councilNumber) => {
    toServer({
        type: serverTypes.UNIT_BY_COUNCIL,
        councilNumber,
    });
}
export let getLocationUserIPC = (username, password) => {
    toServer({
        type: serverTypes.LOCATION_USER,
        username,
        password,
    });
}
export let getLocationIPC = (locationId) => {
    toServer({
        type: serverTypes.LOCATION,
        locationId,
    });
}
