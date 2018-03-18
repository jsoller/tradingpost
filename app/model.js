'use strict'

import { app, remote } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import * as SQL from 'sql.js';
var dbPathName = 'C:/Users/joesoller/AppData/Roaming/Electron';
var webRoot = path.dirname(__dirname);
// var modelpath = require(path.join(webRoot, 'model.js'));
var modeldb = path.join(dbPathName, '/example.db');

console.log('start of model of app', modeldb)
// var filebuffer = fs.readFileSync(path.resolve('userData'));
// var db = new SQL.Database(filebuffer);

// var remote = require('electron').remote;
// const path = require('path');
// const fs = require('fs');
// const SQL = require('sql.js');

/*
  SQL.js returns a compact object listing the columns separately from the
  values or rows of data. This function joins the column names and
  values into a single objects and collects these together by row id.
  {
    0: {first_name: "Jango", last_name: "Reinhardt", person_id: 1},
    1: {first_name: "Svend", last_name: "Asmussen", person_id: 2},
  }
  This format makes updating the markup easy when the DOM input id attribute
  is the same as the column name. See view.showPeople() for an example.
*/
let _rowsFromSqlDataObject = function (object) {
  let data = {}
  let i = 0
  let j = 0
  for (let valueArray of object.values) {
    data[i] = {}
    j = 0
    for (let column of object.columns) {
      Object.assign(data[i], { [column]: valueArray[j] })
      j++
    }
    i++
  }
  return data
}

/*
  Return a string of placeholders for use in a prepared statement.
*/
let _placeHoldersString = function (length) {
  let places = ''
  for (let i = 1; i <= length; i++) {
    places += '?, '
  }
  return /(.*),/.exec(places)[1]
}

SQL.dbOpen = function (databaseFileName) {
  try {
    return new SQL.Database(fs.readFileSync(databaseFileName))
  } catch (error) {
    console.log("Cannot open database file.", error.message)
    return null
  }
}

SQL.dbClose = function (databaseHandle, databaseFileName) {
  try {
    let data = databaseHandle.export()
    let buffer = Buffer.alloc(data.length, data)
    fs.writeFileSync(databaseFileName, buffer)
    databaseHandle.close()
    return true
  } catch (error) {
    console.log("Cannot close database file.", error.message)
    return null
  }
}

// let dbPath = global.dbFile;
//var remote = require('electron').remote;
//const { getglobal } = require('electron').remote;
//remote.getglobal('dbFile');

//let dbPath = require('electron').remote.getGlobal('dbFile');
// let dbPath = function () {
//   return path.join(remote.app.getPath('userData'), 'example.db');
// }

// let dbPath = "";

/*
  A function to create a new SQLite3 database from productSchema.sql.

  This function is called from main.js during initialization and that's why
  it's passed appPath. The rest of the model operates from renderer and uses
  dbPathName.
*/
module.exports.initDb = function (appPath, callback) {
  let dbPath = path.join(appPath, 'example.db')
  let createDb = function (dbPath) {
    // Create a database.
    let db = new SQL.Database()
    let query = fs.readFileSync(
      path.join(__dirname, 'db', 'productSchema.sql'), 'utf8')
    let result = db.exec(query)
    if (Object.keys(result).length === 0 &&
      typeof result.constructor === 'function' &&
      SQL.dbClose(db, dbPath)) {
      // SQL.dbClose(db, dbPath);
      console.log('Created a new database.');
    } else {
      console.log('model.initDb.createDb failed.')
    }
  }
  let db = SQL.dbOpen(dbPath)
  if (db === null) {
    /* The file doesn't exist so create a new database. */
    createDb(dbPath)
  } else {
    /*
      The file is a valid sqlite3 database. This simple query will demonstrate
      whether it's in good health or not.
    */
    let query1 = 'SELECT * FROM product '
    let row1 = db.exec(query1)
    let productname1 = row1[0]
    console.log('model.getProducts', query1, 'row1', row1, 'productname', productname1)
    let query = 'Select count(*) as `count` FROM `sqlite_master`'
    let row = db.exec(query)
    let tableCount = parseInt(row[0].values)
    if (tableCount === 0) {
      console.log('The file is an empty SQLite3 database.')
      createDb(dbPath)
    } else {
      console.log('The database has', tableCount, 'tables.')
    }
    if (typeof callback === 'function') {
      callback()
    }
  }
}

/*
  Populates the Product List.
*/
module.exports.getProducts = function (callback) {
  let db = SQL.dbOpen(modeldb)
  console.log('start of getProducts in model', db)
  if (db !== null) {
    let query = 'SELECT * FROM `product` ORDER BY `productname` ASC'
    try {
      let products = db.exec(query)
      if (products !== undefined && products.length > 0) {
        products = _rowsFromSqlDataObject(products[0])
        callback(products);
      }
    } catch (error) {
      //  print the error
      console.log('Cannot read getProducts database file.', error.message)
    } finally {
      SQL.dbClose(db, modeldb)
    }
  }
  else {
    console.log('getProducts db null')
  }
}
