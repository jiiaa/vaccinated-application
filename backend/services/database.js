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
const getOrdersByDate = async (range, date) => {

  // Initialize the variable for sql query
  let sqlSelect = '';
  // Get orders of the set date only
  if (range === 'dateonly') {
    // Add the wildcard to the matching string
    date = date + '%';
    sqlSelect = format('SELECT COUNT(*) as orders, SUM(injections) as injections FROM orders WHERE arrived::text LIKE %L', date);
  // Select all orders from day one until the set date
  } else {
    sqlSelect = format('SELECT COUNT(*) as orders, SUM(injections) as injections FROM orders WHERE arrived <= %L', date);
  }

  const client = await pool.connect();
  try {
    const res = await client.query(sqlSelect, '');
    client.release();
    return res.rows;
  } catch (err) {
    logger.logInfo('Select failed:', err);
    client.release();
    throw err;
  }
};

// Get number of vaccinations given
// from day one until given date or on a day
const getVaccinatedByDate = async (range, date) => {

  // Initialize the variable for sql query
  let sqlSelect = '';
  // Get vaccinations of the set date only
  if (range === 'dateonly') {
    // Add the wildcard to the matching string
    date = date + '%';
    sqlSelect = format('SELECT COUNT(*) as vaccinated FROM vaccinations WHERE vaccination_date::text LIKE %L', date);
  // Select all orders from day one until the set date
  } else {
    sqlSelect = format('SELECT COUNT(*) as vaccinated FROM vaccinations WHERE vaccination_date <= %L', date);
  }

  const client = await pool.connect();
  try {
    const res = await client.query(sqlSelect, '');
    client.release();
    return res.rows;
  } catch (err) {
    logger.logInfo('Select failed:', err);
    client.release();
    throw err;
  }
};

// Get number orders and injections per producer
// from day one until given date or on a day
const getOrdersPerProducer = async (range, date) => {
  let sqlSelect = '';

  if (range === 'dateonly') {
    date = date + '%';
    sqlSelect = format('SELECT vaccine, COUNT(*) as orders, SUM(injections) as injections FROM orders WHERE arrived::text LIKE %L GROUP BY vaccine', date);
  } else {
    sqlSelect = format('SELECT vaccine, COUNT(*) as orders, SUM(injections) as injections FROM orders WHERE arrived <= %L GROUP BY vaccine', date);
  }

  const client = await pool.connect();
  try {
    const res = await client.query(sqlSelect, '');
    client.release();
    return res.rows;
  } catch (err) {
    logger.logInfo('Select failed:', err);
    client.release();
    throw err;
  }
};

// Get number of expired bottles (orders) and injections on a given date
const getExpiredOrders = async (date) => {

  const sqlSelect = format('SELECT COUNT(*) as expired_bottles, SUM(injections) as expired_injections FROM orders WHERE arrived < (%L::date - \'30 day\'::interval)', date);

  const client = await pool.connect();
  try {
    const res = await client.query(sqlSelect, '');
    client.release();
    return res.rows;
  } catch (err) {
    logger.logInfo('Select failed:', err);
    client.release();
    throw err;
  }
};

// Get number of valid bottles and injections on a given date
const getValidOrders = async (date) => {

  const sqlSelect = format('SELECT COUNT(*) as valid_bottles, SUM(injections)  as valid_injections FROM orders WHERE arrived > (%L::date - \'30 day\'::interval) AND arrived <= %L', date, date);

  const client = await pool.connect();
  try {
    const res = await client.query(sqlSelect, '');
    client.release();
    return res.rows;
  } catch (err) {
    logger.logInfo('Select failed:', err);
    client.release();
    throw err;
  }
};

// Get number of injections to be expired in next 10 days
const getWillExpire = async (date) => {

  const sqlSelect = format('SELECT COUNT(*) as valid_bottles, SUM(injections) as valid_injections FROM orders WHERE arrived > (%L::date - \'30 day\'::interval) AND arrived <= (%L::date - \'20 day\'::interval)', date, date);

  const client = await pool.connect();
  try {
    const res = await client.query(sqlSelect, '');
    client.release();
    return res.rows;
  } catch (err) {
    logger.logInfo('Select failed:', err);
    client.release();
    throw err;
  }
};

// select sum(injections), count(vaccination_id) from orders, vaccinations where order_id = source_bottle and source_bottle in (select order_id from orders where arrived > ('2021-02-03'::date - '30 day'::interval));

// SELECT COUNT(*) FROM vaccinations WHERE source_bottle IN (SELECT order_id FROM orders WHERE arrived < ('2021-02-05'::date - '30 day'::INTERVAL));

module.exports = {
  getOrdersByDate,
  getVaccinatedByDate,
  getOrdersPerProducer,
  getExpiredOrders,
  getValidOrders,
  getWillExpire
};
