/**
 * This file creates the SQL tables and
 * inserts the order/vaccination data to the tables
 */
const fs = require('fs').promises;
const { Pool } = require('pg');
const format = require('pg-format');

const config = require('./utils/config');
// Source files of data
const fileNameArray = [
  './data/Antiqua.source',
  './data/SolarBuddhica.source',
  './data/Zerpfy.source'
];
const fileVacci = './data/vaccinations.source';


const conopts = {
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  host: config.DB_HOST,
  database: config.DB_DATABASE
};

const createTableOrders = 'CREATE TABLE IF NOT EXISTS orders (id serial not null, order_id varchar(255) not null primary key, order_number varchar(100) not null, responsible_person varchar(100), healthcare_district varchar(4), vaccine varchar(15), injections int, arrived timestamp)';
const createTableVaccinations = 'CREATE TABLE IF NOT EXISTS vaccinations (id serial not null, vaccination_id varchar(255) not null primary key, source_bottle varchar(255), gender varchar(10), vaccination_date timestamp, CONSTRAINT fk_orders  FOREIGN KEY(source_bottle) REFERENCES orders(order_id))';
const insertOrders = 'INSERT INTO orders (order_id, order_number, responsible_person, healthcare_district, vaccine, injections, arrived) VALUES %L';
const insertVaccinations = 'INSERT INTO vaccinations (vaccination_id, source_bottle, gender, vaccination_date) VALUES %L';

// Read the content of a text file
const getData = async (fileName) => {
  try {
    const orderData = await fs.readFile(fileName, 'utf-8');
    // Convert the data to full JSON format
    let splitted = orderData.toString().split('\n');
    splitted.pop();
    let jsonLike = '[' + splitted + ']';
    let parsed = JSON.parse(jsonLike);
    // Get the value of each key-value pair
    const insertToDatabase = parsed.map(element => {
      return Object.values(element);
    });
    console.log('## readFile success');
    return insertToDatabase;
  } catch (error) {
    console.error('File read failed:', error);
  }
};

// Create the database table and insert the data to the table
const runDatabaseQuery = async (fileData, client, createTable, insertData) => {
  try {
    const res = await client.query(createTable, '');
    console.log('## CREATE success:', res.command);
  } catch (error) {
    console.error(error);
  }
  try {
    const queryFormat = format(insertData, fileData);
    const res = await client.query(queryFormat, '');
    console.log('## INSERT success:', res.command);
    return res.command;
  } catch (error) {
    console.error(error);
  }
};

// Run the functions for each file
const runProcess = async () => {

  const pool = new Pool(conopts);
  const client = await pool.connect();

  for (let i = 0; i < fileNameArray.length; i++) {
    console.log('i:', i);
    const fileOrderData = await getData(fileNameArray[i]);
    const res = await runDatabaseQuery(fileOrderData, client, createTableOrders, insertOrders);
    console.log('res:', res);
  }

  const fileVacciData = await getData(fileVacci);
  const res = await runDatabaseQuery(fileVacciData, client, createTableVaccinations, insertVaccinations);
  console.log('res:', res);
  client.release();
};

runProcess();
