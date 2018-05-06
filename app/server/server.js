import * as model from '../model';
import * as ipcTypes from '../constants/IpcTypes';
import * as types from '../constants/ActionTypes';
import * as fs from 'fs';
import * as csv from 'fast-csv';

const debug = (...args) => {
    // Is debug?
    if (true) {
        console.log('processer.js', ...args);
    }
}

export default class Server {
    constructor(databaseLocation) {
        this._databaseLocation = databaseLocation;
        this._handlers = {
            product: Server.getProducts,
            productByType: Server.getProductsByType,
            productByName: Server.getProductsByName,
            council: Server.getCouncil,
            unittype: Server.getUnitType,
            unitByCouncil: Server.getUnitByCouncil,
            locationUser: Server.getLocationUser,
            location: Server.getLocation,
            insertTransaction: Server.insertTransaction,
            loadcsvFileName: Server.loadCsvFileName,
            savecsvFileName: Server.saveCSVFileName,
        };
    }

    /**
     * Handle an IPC event with some args
     * 
     * @param {Object} event from IPC that triggered this request
     * @param {Object} args data for that IPC event
     */
    handleIPC(event, args) {
        if (!args && !args.todo) {
            debug("Nothing from IPC to handle");
            return;
        }
        debug('args is', args);

        const handler = this._handlers[args.todo];
        if (handler) {
            handler(event, args, this._databaseLocation);
        } else {
            debug('the args.todo', args.todo, 'hasn\'t been configured yet');
        }
    }

    static getProducts(event, args, databaseLocation) {
        const products = Object.values(model.getProducts(databaseLocation));
        event.sender.send(ipcTypes.IPC_TO_RENDER, {
            type: types.RECEIVE_PRODUCTS,
            products
        });
    }

    static getProductsByType(event, args, databaseLocation) {
        const prodType = (args.todotype !== undefined)
            ? args.todotype
            : 'F';
        debug('call getProductsByType from main', prodtype);
        const products = Object.values(model.getProductsByType(databaseLocation, prodtype));
        event.sender.send(ipcTypes.IPC_TO_RENDER, {
            type: types.RECEIVE_PRODUCTS,
            products
        });
    }

    static getProductsByName(event, args, databaseLocation) {
        const prodname = (args.todotype !== undefined)
            ? args.todotype
            : ' ';
        debug('call getProductsByName from main', prodname)
        const products = Object.values(model.getProductsByName(databaseLocation, prodname));
        event.sender.send(ipcTypes.IPC_TO_RENDER, {
            type: types.RECEIVE_PRODUCTS,
            products
        });
    }

    static getCouncil(event, args, databaseLocation) {
        debug('call getCouncil from main')
        const councils = Object.values(model.getCouncils(databaseLocation));
        event.sender.send(ipcTypes.IPC_TO_RENDER, {
            type: types.RECEIVE_COUNCILS,
            councils
        });
    }

    static getUnitType(event, args, databaseLocation) {
        debug('call getUnitTypes from main')
        const unittypes = Object.values(model.getUnitTypes(databaseLocation));
        event.sender.send(ipcTypes.IPC_TO_RENDER, {
            type: types.RECEIVE_UNITTYPES,
            unittypes
        });
    }

    static getUnitByCouncil(event, args, databaseLocation) {
        debug('call getUnitsByCouncil from main')
        const councilnum = (args.todotype !== undefined)
            ? args.todotype
            : ' ';
        debug('councilnum', councilnum)
        const units = Object.values(model.getUnitsByCouncil(databaseLocation, councilnum));
        event.sender.send(ipcTypes.IPC_TO_RENDER, {
            type: types.RECEIVE_UNITS,
            units
        });
    }

    static getLocationUser(event, args, databaseLocation) {
        debug('call getLocationUsers from main ', args)
        const username = (args.todotype !== undefined)
            ? args.todotype
            : ' ';
        const password = (args.todotype2 !== undefined)
            ? args.todotype2
            : ' ';
        debug('call getLocatiionUsers from main')
        const locationusers = Object.values(model.getLocationUsers(databaseLocation, username, password));
        event.sender.send(ipcTypes.IPC_TO_RENDER, {
            type: types.GET_LOCATIONUSERS,
            locationusers
        });
    }

    static getLocation(event, args, databaseLocation) {
        debug('call getLocation from main ', args)
        const locationid = (args.todotype !== undefined)
            ? args.todotype
            : ' ';
        debug('call getLocatiion from main')
        const location = Object.values(model.getLocation(databaseLocation, locationid))[0];
        event.sender.send(ipcTypes.IPC_TO_RENDER, {
            type: types.GET_LOCATION,
            location
        });
    }

    static insertTransaction(event, args, databaseLocation) {
        debug('call insertTransaction from main ', args);
        const transSummary = (args.transSummary)
            ? args.transSummary
            : {};
        const transDetails = (args.transDetails)
            ? args.transDetails
            : [];
        debug('call insertTransaction from main 2 ', databaseLocation, transSummary, transDetails);
        model.insertTransactionData(databaseLocation, transSummary, transDetails);
        event.sender.send(ipcTypes.IPC_TO_RENDER, {
            type: types.CHECKOUT_REQUEST,
        });
    }

    static loadCSVFileName(event, args, databaseLocation) {
        const csvFileName = args.csvFileName;
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

    static saveCSVFileName(event, args, databaseLocation) {
        let csvFileName = args.csvFileName;
        debug("csvfilename", csvFileName);
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
}
