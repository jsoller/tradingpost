import { ipcRenderer } from 'electron';
import * as ipcTypes from '../constants/IpcTypes';

export let startListener = (store) => {
    ipcRenderer.on(ipcTypes.IPC_TO_RENDER, (event, args) => {
        store.dispatch(args);
    });
}

export let getProductsIPC = (productsquery, producttype) => {
    ipcRenderer.send(
        ipcTypes.IPC_TO_MAIN,
        {
            todo: productsquery,
            todotype: producttype
        }
    );
}

export let getCouncilsIPC = (councilsquery) => {
    ipcRenderer.send(
        ipcTypes.IPC_TO_MAIN,
        { todo: councilsquery }
    );
}
export let loadCSVFileNameIPC = (csvFileName) => {
    console.log("loadCSVFileNameIPC", csvFileName)
    ipcRenderer.send(
        ipcTypes.IPC_TO_MAIN,
        {
            todo: 'loadcsvFileName',
            csvFileName: csvFileName
        }
    );
}
export let saveCSVFileNameIPC = (csvFileName) => {
    console.log("saveCSVFileNameIPC", csvFileName)
    ipcRenderer.send(
        ipcTypes.IPC_TO_MAIN,
        {
            todo: 'savecsvFileName',
            csvFileName: csvFileName
        }
    );
}

export let getUnitTypesIPC = (unittypesquery) => {
    ipcRenderer.send(
        ipcTypes.IPC_TO_MAIN,
        { todo: unittypesquery }
    );
}
export let getUnitsByCouncilIPC = (unitsquery, councilnum) => {
    ipcRenderer.send(
        ipcTypes.IPC_TO_MAIN,
        {
            todo: unitsquery,
            todotype: councilnum
        }
    );
}
export let getLocationUserIPC = (loginquery, username, password) => {
    ipcRenderer.send(
        ipcTypes.IPC_TO_MAIN,
        {
            todo: loginquery,
            todotype: username,
            todotype2: password
        }
    );
}
export let getLocationIPC = (locationquery, locationid) => {
    ipcRenderer.send(
        ipcTypes.IPC_TO_MAIN,
        {
            todo: locationquery,
            todotype: locationid
        }
    );
}