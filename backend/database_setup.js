/**
 * This file creates the tables and
 * inserts the data to the database
 */

const fs = require('fs');
const { Pool } = require('pg');
const format = require('pg-format');

const config = require('./utils/config');
const file1 = './data/Antiqua.source';
const file2 = './data/SolarBuddhica.source';
const file3 = './data/Zerpfy.source';
const file21 = './data/vaccinations.source';

const conopts = {
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  host: config.DB_HOST,
  database: config.DB_DATABASE
};

// const dropTable = 'DROP TABLE IF EXISTS orders';
const createTableOrders = 'CREATE TABLE IF NOT EXISTS orders (id serial not null primary key, order_id varchar(255), order_number varchar(100) not null, responsible_person varchar(100), healthcare_district varchar(4), vaccine varchar(15), injections int, arrived timestamp)';
// const createTableVaccinations = 'CREATE TABLE IF NOT EXISTS vaccinations (id serial not null primary key, vaccination_id varchar(255), source_bottle varchar(255), gender varchar(10), vaccination_date timestamp)';
const insertOrders = 'INSERT INTO orders (order_id, order_number, responsible_person, healthcare_district, vaccine, injections, arrived) VALUES %L';
// const insertVaccinations = 'INSERT INTO vaccinations (vaccination_id, source_bottle, gender, vaccination_date) VALUES %L';


const getData = (fileName, databaseCallback) => {
  fs.readFile(fileName, 'utf-8', function(err, data) {
    if (err) console.error('Virhe:', err);
    let splitted = data.toString().split('\n');
    splitted.pop();
    let jsonLike = '[' + splitted + ']';
    let parsed = JSON.parse(jsonLike);
    const insertToDatabase = parsed.map(element => {
      return Object.values(element);
    });
    console.log('First element:', insertToDatabase[0]);
    databaseCallback(insertToDatabase);
  });
};

const runDatabaseQuery = (fileData) => {

  const pool = new Pool(conopts);

  pool.connect((err, client, done) => {
    if (err) throw err;
    // client.query(dropTable, '', (err, res) => {
    //   if (err) console.error('## DROP failed:', err);
    //   if (!err) {
    //     console.log('## DROP success:', res.command);
    //   }
    // });
    client.query(createTableOrders, '', (err, res) => {
      if (err) console.error('## CREATE failed:', err);
      if (!err) {
        console.log('## CREATE Success:', res.command);
      }
    });
    const queryFormat = format(insertOrders, fileData);
    client.query(queryFormat, '', (err, res) => {
      done();
      if (err) console.error('## INSERT failed:', err);
      if (!err) {
        console.log('INSERT success:', res.rowCount);
      }
    });
  });
};

const runActions = async () => {
  getData(file3, runDatabaseQuery);
};

runActions();
