import { ipcRenderer } from 'electron';
import * as ipcTypes from '../constants/IpcTypes';

export let startListener = (store) => {
    ipcRenderer.on(ipcTypes.IPC_TO_RENDER, (event, args) => { 
        store.dispatch(args); 
    });
  getProductsIPC('product', null);
}

export let getProductsIPC = (productsquery, producttype) => {
    ipcRenderer.send(
        ipcTypes.IPC_TO_MAIN,
        { todo: productsquery,
            todotype: producttype }
    );
}