import * as model from '../model';
import * as ipcTypes from '../constants/IpcTypes';
import * as types from '../constants/ActionTypes';
import * as serverTypes from '../constants/ServerTypes';
import * as fs from 'fs';
import * as csv from 'fast-csv';

const debug = (...args) => {
    // Is debug?
    if (true) {
        console.log('[server.js] ::', ...args);
    }
}

export default class Server {
    constructor(databaseLocation) {
        this._databaseLocation = databaseLocation;

        // this._handlers is a Map<String, Function> of
        // Key (event type) to Value (handling function)
        this._handlers = {
            [serverTypes.PRODUCT]: Server.getProducts,
            [serverTypes.PRODUCT_BY_TYPE]: Server.getProductsByType,
            [serverTypes.PRODUCT_BY_NAME]: Server.getProductsByName,
            [serverTypes.COUNCIL]: Server.getCouncil,
            [serverTypes.UNIT_TYPE]: Server.getUnitType,
            [serverTypes.UNIT_BY_COUNCIL]: Server.getUnitByCouncil,
            [serverTypes.LOCATION_USER]: Server.getLocationUser,
            [serverTypes.LOCATION]: Server.getLocation,
            [serverTypes.INSERT_TRANSACTION]: Server.insertTransaction,
            [serverTypes.LOAD_CSV_FILENAME]: Server.loadCsvFileName,
            [serverTypes.SAVE_CSV_FILENAME]: Server.saveCSVFileName,
        };
    }

    /**
     * Handle an IPC event with some args
     * 
     * Examples:
     * args = {
     *  type: "some type",
     *  ...other_data
     * }
     * 
     * @param {Object} event from IPC that triggered this request
     * @param {Object} args data for that IPC event
     */
    handleIPC(event, args) {
        if (!args && !args.type) {
            debug("Nothing from IPC to handle");
            return;
        }
        debug('args is', args);

        const handler = this._handlers[args.type];
        if (handler) {
            handler(event, args, this._databaseLocation);
        } else {
            debug('the args.type', args.type, 'hasn\'t been configured yet');
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
        const prodType = (args.productType !== undefined)
            ? args.productType
            : 'F';
        debug('call getProductsByType from main', prodType);
        const products = Object.values(model.getProductsByType(databaseLocation, prodType));
        event.sender.send(ipcTypes.IPC_TO_RENDER, {
            type: types.RECEIVE_PRODUCTS,
            products
        });
    }

    static getProductsByName(event, args, databaseLocation) {
        const prodname = (args.productName !== undefined)
            ? args.productName
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
        const councilnum = (args.councilNumber !== undefined)
            ? args.councilNumber
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
        const username = (args.username !== undefined)
            ? args.username
            : ' ';
        const password = (args.password !== undefined)
            ? args.password
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
        const locationid = (args.locationId !== undefined)
            ? args.locationId
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
