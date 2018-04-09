//model.js

'use strict'

const path = require('path');
const fs = require('fs');
const SQL = require('sql.js');

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
    console.log("Can't open database file.", error.message)
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
    console.log("Can't close database file.", error)
    return null
  }
}

/*
  A function to create a new SQLite3 database from productSchema.sql.

  This function is called from main.js during initialization and that's why
  it's passed appPath. The rest of the model operates from renderer and uses
  window.model.db.
*/
module.exports.initDb = function (appPath, callback) {
  let dbPath = path.join(appPath, 'tradingpost.db')
  let createDb = function (dbPath) {
    // Create a database.
    let db = new SQL.Database()
    let councilquery = fs.readFileSync(
      path.join(__dirname, 'db', 'councilSchema.sql'), 'utf8');
    let councilresult = db.exec(councilquery)
    let districtquery = fs.readFileSync(
       path.join(__dirname, 'db', 'districtSchema.sql'), 'utf8');
    let districtresult = db.exec(districtquery)
    let unitquery = fs.readFileSync(
       path.join(__dirname, 'db', 'unitSchema.sql'), 'utf8');
    let unitresult = db.exec(unitquery)
    let query = fs.readFileSync(
      path.join(__dirname, 'db', 'productSchema.sql'), 'utf8');
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
    let query = 'SELECT count(*) as `count` FROM `sqlite_master`'
    let row = db.exec(query)
    let tableCount = parseInt(row[0].values)
    if (tableCount === 0) {
      console.log('The file is an empty SQLite3 database.')
      createDb(dbPath)
    } else {
      console.log('The database has', tableCount, 'tables.')

      //     console.log('read council')
      //  let dbPath = path.join(appPath, 'tradingpost.db')
      //  console.log('dbPath ', dbPath)
      //  let db = SQL.dbOpen(dbPath)
      //  console.log('db ', db)
      //   let councilquery = 'SELECT * FROM `council`'
      //   console.log('councilquery ', councilquery)
      //   let councils = db.exec(councilquery)
      //     console.log('council ', councils)


    }
    if (typeof callback === 'function') {
      callback()
    }
  }
}

/*
  Populates the Product List.
*/
module.exports.getProducts = function (appPath) {
  let dbPath = path.join(appPath, 'tradingpost.db');
  let db = SQL.dbOpen(dbPath);
  if (db !== null) {
    let query = 'SELECT * FROM `products`'
    try {
      let products = db.exec(query)
      if (products !== undefined && products.length > 0) {
        products = _rowsFromSqlDataObject(products[0])
        return products;
      }
    } catch (error) {
      //  print the error
      console.log('Cannot read getProducts database file.', error.message)
    } finally {
      SQL.dbClose(db, dbPath)
    }
  }
  return {};
}

/*
  Populates the Product List by category.
*/
module.exports.getProductsByType = function (appPath, categorytype = 'M') {
  let dbPath = path.join(appPath, 'tradingpost.db');
  let db = SQL.dbOpen(dbPath);
  console.log('start of getProductsByType in model', categorytype)
  if (db !== null) {
    try {
      let products = [];

      // Get products by type
      let statement = db.prepare('SELECT * FROM `products` WHERE category = ?', [categorytype])
      while (statement.step()) {
        products.push(statement.getAsObject());
      }

      console.log('getProductsByType products ', products)
      if (products !== undefined && products.length > 0) {
        return products;
      }
    } catch (error) {
      //  print the error
      console.log('Cannot read getProductsByType database file.', error.message)
    } finally {
      SQL.dbClose(db, dbPath)
    }
  }
  return [];
}

/*
  Populates the Product List by name.
*/
module.exports.getProductsByName = function (appPath, searchname = ' ') {
  let searchnameformat = '%' + searchname + '%';
  let dbPath = path.join(appPath, 'tradingpost.db');
  let db = SQL.dbOpen(dbPath);
  console.log('start of getProductsByName in model', searchname)
  if (db !== null) {
    try {
      let products = [];

      // Get products by type
      let statement = db.prepare('SELECT * FROM `products` WHERE productname like ?', [searchnameformat])
      while (statement.step()) {
        products.push(statement.getAsObject());
      }

      console.log('getProductsByName products ', products)
      if (products !== undefined && products.length > 0) {
        return products;
      }
    } catch (error) {
      //  print the error
      console.log('Cannot read getProductsByName database file.', error.message)
    } finally {
      SQL.dbClose(db, dbPath)
    }
  }
  return [];
}


/*
  Populates the Council List 
*/
module.exports.getCouncils = function (appPath) {
  let dbPath = path.join(appPath, 'tradingpost.db');
  let db = SQL.dbOpen(dbPath);
  console.log('start of getCouncils in model')
  if (db !== null) {
    try {
      let councils = [];

      // Get councils
      let statement = db.prepare('SELECT * FROM `council`')
      while (statement.step()) {
        councils.push(statement.getAsObject());
      }

      console.log('getCouncils ', councils)
      if (councils !== undefined && councils.length > 0) {
        return councils;
      }
    } catch (error) {
      //  print the error
      console.log('Cannot read getCouncils database file.', error.message)
    } finally {
      SQL.dbClose(db, dbPath)
    }
  }
  return [];
}
              
module.exports.getDistrictsByCouncil = function (appPath, councilnum = '') {
  let dbPath = path.join(appPath, 'tradingpost.db');
  let db = SQL.dbOpen(dbPath);
  if (councilnum === null) {
    let councilnum = 'BSA123'
  }
  console.log('start of getDistrictsByCouncil in model', councilnum, db)
  if (db !== null) {
    try {
      let districts = [];

      // Get districts by council
      let statement = db.prepare('SELECT * FROM `district` WHERE mdm_council_id = ?', [councilnum])
      while (statement.step()) {
        districts.push(statement.getAsObject());
      }

      console.log('getDistrictsByCouncil districts ', districts)
      if (districts !== undefined && districts.length > 0) {
        return districts;
      }
    } catch (error) {
      //  print the error
      console.log('Cannot read getDistrictsByCouncil database file.', error.message)
    } finally {
      SQL.dbClose(db, dbPath)
    }
  }
  return [];
}
