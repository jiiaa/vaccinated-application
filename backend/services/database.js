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

// Get all orders and number of vaccines
// from the beginning until the given date
const getOrdersByDate = (date, callback) => {
  const sqlSelect = format('SELECT COUNT(*), SUM(injections) FROM orders where arrived <= %L', date);
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

module.exports = {
  getOrdersByDate,
};

