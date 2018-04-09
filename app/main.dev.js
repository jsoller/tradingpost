/* eslint global-require: 0, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import { app, BrowserWindow, ipcMain } from 'electron';
import MenuBuilder from './menu';
import * as model from './model';
import * as ipcTypes from './constants/IpcTypes';
import * as types from './constants/ActionTypes';

let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  require('electron-debug')();
  const path = require('path');
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS'
  ];

  return Promise
    .all(extensions.map(name => installer.default(installer[name], forceDownload)))
    .catch(console.log);
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


app.on('ready', async () => {
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728
  });

  ipcMain.on(ipcTypes.IPC_TO_MAIN, (event, args) => {
    console.log('main.dev.js todo', args.todo, ' prodtype ', args.todotype)
    if (args !== undefined && args.todo === 'product') {
      const products = Object.values(model.getProducts(app.getPath('userData')));
      event.sender.send(ipcTypes.IPC_TO_RENDER, {
        type: types.RECEIVE_PRODUCTS,
        products
      });
    }
    else if (args !== undefined && args.todo === 'productByType') {
      let prodtype = 'F';
      if (args.todotype !== undefined) {
        prodtype = args.todotype;
      }
      console.log('call getProductsByType from main.dev.js', prodtype)
      const products = Object.values(model.getProductsByType(app.getPath('userData'), prodtype));
      event.sender.send(ipcTypes.IPC_TO_RENDER, {
        type: types.RECEIVE_PRODUCTS,
        products
      });
    }
    else if (args !== undefined && args.todo === 'productByName') {
      let prodname = ' ';
      console.log('productsByName code')
      if (args.todotype !== undefined) {
        prodname = args.todotype;
      }
      console.log('call getProductsByName from main.dev.js', prodname)
      const products = Object.values(model.getProductsByName(app.getPath('userData'), prodname));
      event.sender.send(ipcTypes.IPC_TO_RENDER, {
        type: types.RECEIVE_PRODUCTS,
        products
      });
    }
    else if (args !== undefined && args.todo === 'council') {
      console.log('call getCouncil from main.dev.js')
      const councils = Object.values(model.getCouncils(app.getPath('userData')));
      event.sender.send(ipcTypes.IPC_TO_RENDER, {
        type: types.RECEIVE_COUNCILS,
        councils
      });
    }
    else if (args !== undefined && args.todo === 'district') {
      console.log('call getDistrictsByCouncil from main.dev.js (args)', args.todotype)
      let councilnum = args.todotype
      if (!councilnum) {
        councilnum = 'BSA326'
      }
      console.log('call getDistrictsByCouncil from main.dev.js', councilnum)
      const districts = Object.values(model.getDistrictsByCouncil(app.getPath('userData'), councilnum));
      event.sender.send(ipcTypes.IPC_TO_RENDER, {
        type: types.RECEIVE_DISTRICTS,
        districts
      });
    }
  });
  

  model.initDb(app.getPath('userData'),
    mainWindow.loadURL(`file://${__dirname}/app.html`)
  )

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();
});
