const { Pool } = require('pg');
const format = require('pg-format');
const config = require('../utils/config');
const logger = require('../utils/logger');

const conopts = {
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  host: config.DB_HOST,
  database: config.DB_DATABASE
};

const pool = new Pool(conopts);

// Get number of all orders and sum of vaccines
// from day one until given date or on a day
const getOrdersByDate = (range, date, callback) => {
  // Initialize the variable for sql query
  let sqlSelect = '';
  // Get orders of the set date only
  if (range === 'dateonly') {
    // Add the wildcard to the matching string
    date = date + '%';
    sqlSelect = format('SELECT COUNT(*), SUM(injections) FROM orders WHERE arrived::text LIKE %L', date);
  // Select all orders from day one until the set date
  } else {
    sqlSelect = format('SELECT COUNT(*), SUM(injections) FROM orders WHERE arrived <= %L', date);
  }
  pool.connect((err, client, done) => {
    if (err) {
      logger.logInfo('Pool connection failed:', err);
      throw err;
    }
    client.query(sqlSelect, (error, data) => {
      if (error) {
        logger.logInfo('Select failed:', error);
        throw error;
      }
      done();
      callback(data.rows);
    });
  });
};

// Get number of vaccinations given
// from day one until given date or on a day
const getVaccinatedByDate = (range, date, callback) => {
  // Initialize the variable for sql query
  let sqlSelect = '';
  // Get vaccinations of the set date only
  if (range === 'dateonly') {
    // Add the wildcard to the matching string
    date = date + '%';
    sqlSelect = format('SELECT COUNT(*) FROM vaccinations WHERE vaccination_date::text LIKE %L', date);
  // Select all orders from day one until the set date
  } else {
    sqlSelect = format('SELECT COUNT(*) FROM vaccinations WHERE vaccination_date <= %L', date);
  }
  pool.connect((err, client, done) => {
    if (err) {
      logger.logInfo('Pool connection failed:', err);
      throw err;
    }
    client.query(sqlSelect, (error, data) => {
      if (error) {
        logger.logInfo('Select failed:', error);
        throw error;
      }
      done();
      callback(data.rows);
    });
  });
};

// Get number of orders and vaccines per producer
// from day one until given date or on a day
//  select vaccine, count(*), sum(injections) from orders where arrived <= '2021-03-01' group by vaccine;

module.exports = {
  getOrdersByDate,
  getVaccinatedByDate,
};

