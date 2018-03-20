import { ipcRenderer } from 'electron';
import * as ipcTypes from '../constants/IpcTypes';

export let startListener = (store) => {
    ipcRenderer.on(ipcTypes.IPC_TO_RENDER, (event, args) => { 
        store.dispatch(args); 
    });
  getProducts();
}

export let getProducts = () => {
    ipcRenderer.send(
        ipcTypes.IPC_TO_MAIN,
        { todo: 'product'}
    );
}