import { ipcRenderer } from 'electron';
import * as ipcTypes from '../constants/IpcTypes';

export let startListener = (store) => {
    ipcRenderer.on(ipcTypes.IPC_TO_RENDER, (event, args) => { 
        store.dispatch(args); 
    });
  getProductsIPC('product', null);
  getCouncilsIPC('council');
  getUnitTypesIPC('unittype');
  getUnitsByCouncilIPC('unitByCouncil', ' ');
}

export let getProductsIPC = (productsquery, producttype) => {
    ipcRenderer.send(
        ipcTypes.IPC_TO_MAIN,
        { todo: productsquery,
            todotype: producttype }
    );
}

export let getCouncilsIPC = (councilsquery) => {
    ipcRenderer.send(
        ipcTypes.IPC_TO_MAIN,
        { todo: councilsquery }
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
        { todo: unitsquery,
        todotype: councilnum }
    );
}