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
    else if (args.todo === 'location') {
      let locationid = ' ';
      console.log('call getLocation from main ', args)
      if (args.todotype !== undefined) {
        locationid = args.todotype;
      }

      console.log('call getLocatiion from main')
      const location = Object.values(model.getLocation(databaseLocation, locationid))[0];
      event.sender.send(ipcTypes.IPC_TO_RENDER, {
        type: types.GET_LOCATION,
        location
      });
    }
    else if (args.todo === 'insertTransaction') {
      let transSummary = {};
      let transDetails = [];
      console.log('call insertTransaction from main ', args)
      if (args.transSummary) {
        transSummary = args.transSummary;
      }
      if (args.transDetails) {
        transDetails = args.transDetails;
      };
      console.log('call insertTransaction from main 2 ', databaseLocation, transSummary, transDetails)
      model.insertTransactionData(databaseLocation, transSummary, transDetails);
      event.sender.send(ipcTypes.IPC_TO_RENDER, {
        type: types.CHECKOUT_REQUEST,
      });
    }
    else if (args.todo === 'loadcsvFileName') {
      let csvFileName = args.csvFileName;
      //var stream = fs.createReadStream(csvFileName);
      fs.readFile(csvFileName, function (err, data) { console.log(new String(data)); });
      //add the fs csv logic
      var tableName = '';
      var tableColumns = [];
      var conversions = {
        BSA_INVENTORY: {
          ITEM_ID: (DATA) => {
            return parseInt(data);
          },
          PRICE: (DATA) => {
            return parseFloat(data);
          }
        },
        COUNCIL: {
          ACCEPT_EFT: (DATA) => {
            return parseInt(data);
          },
          ACCEPT_SWIPE: (DATA) => {
            return parseInt(data);
          }
        },
        CATEGORY: {
          FOLDER_ID: (DATA) => {
            return parseInt(data);
          }
        },
        DISTRICT: {
          DISTRICT_ID: (DATA) => {
            return parseInt(data);
          },
          CNCL_FLAG: (DATA) => {
            return parseInt(data);
          }
        },
        INVENTORY: {
          LOCATION_INVENTORY_ID: (DATA) => {
            return parseInt(data);
          },
          MDM_LOCATION_ID: (DATA) => {
            return parseInt(data);
          },
          MDM_LKP_FOLDER_ID: (DATA) => {
            return parseInt(data);
          },
          MDM_LKP_BSA_INVENTORY_ID: (DATA) => {
            return data === null ? null : parseInt(data);
          },
          TRP_INVENTORY_ID: (DATA) => {
            return data === null ? null : parseInt(data);
          },
          REMAIN_CNT: (DATA) => {
            return parseInt(data);
          },
          QUICK_ITEM_FLAG: (DATA) => {
            return parseInt(data);
          },
          QUICK_ITEM_SORT_ORDER: (DATA) => {
            return parseInt(data);
          },
          RESTRICTED_ITEM_FLAG: (DATA) => {
            return parseInt(data);
          }
        },
        LOCATION: {
          LOCATION_ID: (DATA) => {
            return parseInt(data);
          },
          TAX_PERCENT: (DATA) => {
            return Number.parseFloat(data);
          },
          PICKUP_FLAG: (DATA) => {
            return parseInt(data);
          }
        },
        LOCATION_USER: {
          ID: (DATA) => {
            return parseInt(data);
          },
          MDM_LOCATION_ID: (DATA) => {
            return parseInt(data);
          }
        },
        TRP_INVENTORY: {
          TRP_INVENTORY_ID: (DATA) => {
            return Number.parseInt(data);
          },
          PRICE: (DATA) => {
            return parseFloat(data);
          }
        },
        UNIT: {
          UNIT_ID: (data) => {
            return parseInt(data);
          },
          MDM_DISTRICT_ID: (data) => {
            return parseInt(data);
          },
          MDM_LKP_UNIT_TYPE_ID: (data) => {
            return parseInt(data);
          },
          NBR: (data) => {
            return parseInt(data);
          },
          LDS_FLAG: (data) => {
            return data === '1' ? 1 : 0;
          },
          FREEEZE_UNIT_FLAG: (data) => {
            return data === '1' ? 1 : 0;
          },
          FREEZE_UDA_FLAG: (data) => {
            return data === '1' ? 1 : 0;
          }
        },
        UNIT_TYPE: {
          ID: (data) => {
            return parseInt(data);
          },
          PRIORITY_SORT_ORDER: (data) => {
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
            // Data filtering
            let index = tableColumns.findIndex((column) => column === 'id');
            if (index !== -1) {
              tableColumns[index] = tableName.toLowerCase() + '_id';
            }
            index = tableColumns.findIndex((column) => column === 'name');
            if (index !== -1) {
              tableColumns[index] = 'nme';
            }
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
