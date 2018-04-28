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
import * as fs from 'fs';
import * as csv from 'fast-csv';

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

  const databaseLocation = app.getPath('userData');
  console.log('main.dev.js', 'database location is "' + databaseLocation + '"')
  ipcMain.on(ipcTypes.IPC_TO_MAIN, (event, args) => {
    console.log('main.dev.js todo', args.todo, ' todotype ', args.todotype)
    if (!args) {
      console.log('main.dev.js', 'nothing from IPC to process');
    }
    else if (args.todo === 'product') {
      const products = Object.values(model.getProducts(databaseLocation));
      event.sender.send(ipcTypes.IPC_TO_RENDER, {
        type: types.RECEIVE_PRODUCTS,
        products
      });
    }
    else if (args.todo === 'productByType') {
      let prodtype = 'F';
      if (args.todotype !== undefined) {
        prodtype = args.todotype;
      }
      console.log('call getProductsByType from main', prodtype)
      const products = Object.values(model.getProductsByType(databaseLocation, prodtype));
      event.sender.send(ipcTypes.IPC_TO_RENDER, {
        type: types.RECEIVE_PRODUCTS,
        products
      });
    }
    else if (args.todo === 'productByName') {
      let prodname = ' ';
      console.log('productsByName code')
      if (args.todotype !== undefined) {
        prodname = args.todotype;
      }
      console.log('call getProductsByName from main', prodname)
      const products = Object.values(model.getProductsByName(databaseLocation, prodname));
      event.sender.send(ipcTypes.IPC_TO_RENDER, {
        type: types.RECEIVE_PRODUCTS,
        products
      });
    }
    else if (args.todo === 'council') {
      console.log('call getCouncil from main')
      const councils = Object.values(model.getCouncils(databaseLocation));
      event.sender.send(ipcTypes.IPC_TO_RENDER, {
        type: types.RECEIVE_COUNCILS,
        councils
      });
    }
    else if (args.todo === 'unittype') {
      console.log('call getUnitTypes from main')
      const unittypes = Object.values(model.getUnitTypes(databaseLocation));
      event.sender.send(ipcTypes.IPC_TO_RENDER, {
        type: types.RECEIVE_UNITTYPES,
        unittypes
      });
    }
    else if (args.todo === 'unitByCouncil') {
      let councilnum = ' ';
      console.log('call getUnitsByCouncil from main')
      if (args.todotype !== undefined) {
        councilnum = args.todotype;
      }
      console.log('councilnum', councilnum)
      const units = Object.values(model.getUnitsByCouncil(databaseLocation, councilnum));
      event.sender.send(ipcTypes.IPC_TO_RENDER, {
        type: types.RECEIVE_UNITS,
        units
      });
    }
    else if (args.todo === 'locationUser') {
      let username = ' ';
      console.log('call getLocationUsers from main ', args)
      if (args.todotype !== undefined) {
        username = args.todotype;
      }
      let password = ' ';
      if (args.todotype2 !== undefined) {
        password = args.todotype2;
      }
      console.log('call getLocatiionUsers from main')
      const locationusers = Object.values(model.getLocationUsers(databaseLocation, username, password));
      event.sender.send(ipcTypes.IPC_TO_RENDER, {
        type: types.GET_LOCATIONUSERS,
        locationusers
      });
    }
    else if (args.todo === 'loadcsvFileName') {
      let csvFileName = args.csvFileName;
      //var stream = fs.createReadStream(csvFileName);
      console.log("main.dev csvfilename", csvFileName);
      fs.readFile(csvFileName, function (err, data) { console.log(new String(data)); });
      //add the fs csv logic
      var tableName = '';
      var tableColumns = [];
      var conversions = {
        UNIT: {
          LDS_FLAG: (data) => {
            return data === '1' ? 1 : 0;
          },
          FREEZE_UDA_FLAG: (data) => {
            return data === '1';
          }
        },
        UNIT_TYPE: {
          ID: (data) => {
            return parseInt(data);
          }
        }
      };

      var stream = fs.createReadStream(csvFileName);
      csv
        .fromStream(stream)
        .on("data", function (data) {
          // Are there new headers?
          if (tableName !== data[0]) {
            tableName = data[0];
            tableColumns = data.map(column => column.toLowerCase());
          } else {
            // Nope, this is new data!
            var newData = {};
            var conversion = conversions[tableName];
            for (var i = 1; i < tableColumns.length; i++) {
              let columnName = tableColumns[i];
              if (columnName === '') {
                // Nothing
              } else if (conversion && conversion[columnName]) {
                newData[columnName] = conversion[columnName](data[i]);
              } else {
                newData[columnName] = data[i];
              }
            }
            var insertObj = {
              type: tableName.toLowerCase(),
              data: newData,
            };
            console.log(insertObj);
            // call an insert function to load the table
            model.insertData(databaseLocation, insertObj);
          }
        })
        .on("end", function () {
          console.log("done");
        });
    }
    else if (args.todo === 'savecsvFileName') {
      let csvFileName = args.csvFileName;
      console.log("csvfilename", csvFileName);
      fs.writeFile(csvFileName, function (err, data) { console.log(new String(data)); });
      //add the fs csv logic
      var stream = fs.createReadStream(csvFileName);
      var csvStream = csv()
        .on("data", function (data) {
          console.log("data", data);
        })
        .on("end", function () {
          console.log("done");
        });

      stream.pipe(csvStream);
    }
  });


  model.initDb(databaseLocation,
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
