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
  A function to create a new SQLite3 database 

  This function is called from main.js during initialization and that's why
  it's passed appPath. The rest of the model operates from renderer and uses
  window.model.db.
*/
module.exports.initDb = function (appPath, callback) {
  let dbPath = path.join(appPath, 'tradingpost.db')
  let createDb = function (dbPath) {
    // Create a database.
    let db = new SQL.Database()
    let bsainventoryquery = fs.readFileSync(    
      path.join(__dirname, 'db', 'bsainventorySchema.sql'), 'utf8');
    let bsainventoryresult = db.exec(bsainventoryquery)
    let categoryquery = fs.readFileSync(
      path.join(__dirname, 'db', 'categorySchema.sql'), 'utf8');
    let categoryresult = db.exec(categoryquery);
    let locationuserquery = fs.readFileSync(
      path.join(__dirname, 'db', 'locationuserSchema.sql'), 'utf8');
    let locationuserresult = db.exec(locationuserquery)
    let councilquery = fs.readFileSync(
      path.join(__dirname, 'db', 'councilSchema.sql'), 'utf8');
    let councilresult = db.exec(councilquery);
    let locationquery = fs.readFileSync(
      path.join(__dirname, 'db', 'locationSchema.sql'), 'utf8');
    let locationresult = db.exec(locationquery);
    let districtquery = fs.readFileSync(
      path.join(__dirname, 'db', 'districtSchema.sql'), 'utf8');
    let districtresult = db.exec(districtquery);
    let inventoryquery = fs.readFileSync(
      path.join(__dirname, 'db', 'inventorySchema.sql'), 'utf8');
    let inventoryresult = db.exec(inventoryquery);
    let trpinventoryquery = fs.readFileSync(
      path.join(__dirname, 'db', 'trpinventorySchema.sql'), 'utf8');
    let trpinventoryresult = db.exec(trpinventoryquery)
    let unittypequery = fs.readFileSync(
      path.join(__dirname, 'db', 'unittypeSchema.sql'), 'utf8');
    let unittyperesult = db.exec(unittypequery)
    let unitquery = fs.readFileSync(
      path.join(__dirname, 'db', 'unitSchema.sql'), 'utf8');
    let result = db.exec(unitquery)
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
    let query = 'SELECT * FROM `bsa_inventory` ORDER BY nme'
    try {
      let products = db.exec(query)
      if (products !== undefined && products.length > 0) {
        products = _rowsFromSqlDataObject(products[0])
        // console.log('model getProducts ', products)
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
module.exports.getProductsByType = function (appPath, categorytype = ' ') {
  let dbPath = path.join(appPath, 'tradingpost.db');
  let db = SQL.dbOpen(dbPath);
  console.log('start of getProductsByType in model', categorytype)
  if (db !== null) {
    try {
      let products = [];

      // Get products by type
      let statement = db.prepare('SELECT * FROM `bsa_inventory` WHERE category = ?', [categorytype])
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
      let statement = db.prepare('SELECT * FROM `bsa_inventory` WHERE nme like ? ORDER BY nme', [searchnameformat])
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

module.exports.getUnitTypes = function (appPath) {
  let dbPath = path.join(appPath, 'tradingpost.db');
  let db = SQL.dbOpen(dbPath);
  console.log('start of getUnitTypes in model', db)
  if (db !== null) {
    try {
      let unittypes = [];

      // Get unit types
      let statement = db.prepare('SELECT * FROM `unit_type`')
      while (statement.step()) {
        unittypes.push(statement.getAsObject());
      }

      if (unittypes !== undefined && unittypes.length > 0) {
        return unittypes;
      }
    } catch (error) {
      //  print the error
      console.log('Cannot read getUnitTypes database file.', error.message)
    } finally {
      SQL.dbClose(db, dbPath)
    }
  }
  return [];
}
/*
  Populates the Unit List by council
*/
module.exports.getUnitsByCouncil = function (appPath, councilnum = '') {

  let dbPath = path.join(appPath, 'tradingpost.db');
  let db = SQL.dbOpen(dbPath);

  if (db !== null) {
    try {
      let units = [];

      // Get units by council
      let statement = db.prepare('SELECT u.* FROM `unit` u, `district` d WHERE d.district_id = u.mdm_district_id and d.mdm_council_id = ?', [councilnum])
      while (statement.step()) {
        units.push(statement.getAsObject());
      }

      if (units !== undefined && units.length > 0) {
        return units;
      }
    } catch (error) {
      //  print the error
      console.log('Cannot read getUnitsByCouncil database file.', error.message)
    } finally {
      SQL.dbClose(db, dbPath)
    }
  }
  return [];
}
/*
  populates login information
*/
module.exports.getLocationUsers = function (appPath, username = '', password = '') {
  let dbPath = path.join(appPath, 'tradingpost.db');
  let db = SQL.dbOpen(dbPath);
  if (db !== null) {
    try {
      let locationusers = [];

      // validate username and password
      let statement = db.prepare('SELECT * FROM `location_user` WHERE username = ? and password = ?', [username, password])
      while (statement.step()) {
        locationusers.push(statement.getAsObject());
      }

      if (locationusers !== undefined && locationusers.length > 0) {
        return locationusers;
      }
    } catch (error) {
      //  print the error
      console.log('Cannot read getLocationUsers database file.', error.message)
    } finally {
      SQL.dbClose(db, dbPath)
    }
  }
  return [];
}
/*
  populates location information
*/
module.exports.getLocation = function (appPath, locationid = '') {
  let dbPath = path.join(appPath, 'tradingpost.db');
  let db = SQL.dbOpen(dbPath);
  if (db !== null) {
    try {
      let locations = [];
console.log('getLocation ', locationid)
      // validate username and password
      let statement = db.prepare('SELECT * FROM `location` WHERE location_id = ?', [locationid])
      while (statement.step()) {
        locations.push(statement.getAsObject());
      }
console.log('after call ', locations)
      if (locations !== undefined && locations.length > 0) {
        return locations;
      }
    } catch (error) {
      //  print the error
      console.log('Cannot read getLocation database file.', error.message)
    } finally {
      SQL.dbClose(db, dbPath)
    }
  }
  return [];
}
/*
  Insert data into tables
*/
module.exports.insertData = function (appPath, insertObj) {
  console.log('insertData', insertObj)
  let dbPath = path.join(appPath, 'tradingpost.db');
  let db = SQL.dbOpen(dbPath);

  if (db !== null) {
    try {
      let type = insertObj.type;
      let data = insertObj.data;
      let sql = 'INSERT INTO `' + type + '` (' + Object.keys(data).join(",") + ') VALUES (' + Object.values(data).map(function (value) { return "?" }).join(",") + ')';
      let statement = db.prepare(sql);
      statement.run(Object.values(data));
    } catch (error) {
      //  print the error
      console.log('Cannot insert data into database file.', type, error.message)
    } finally {
      SQL.dbClose(db, dbPath)
    }
  }
}

