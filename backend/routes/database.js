const dbRouter = require('express').Router();

const dbService = require('../services/database');
const logger = require('../utils/logger');

// Get number of orders arrived until or on the given date
dbRouter.get('/arrived', async (req, res) => {
  const range = req.query.range;
  const date = req.query.date;
  const time = req.query.time;

  // Initialize variable for joining date and time
  let datetime = '';
  // Time is undefined/empty when quering for whole day only
  if (time === undefined || time === '') {
    datetime = date;
  } else {
    datetime = `${date} ${time}`;
  }

  try {
    const dbRes = dbService.getOrdersByDate(range, datetime);
    res.json(dbRes);
  } catch (err) {
    logger.logInfo('Database query failed:', err);
    res.status(500).json({ message: 'Database query failed' });
  }
});

// Get number of given vaccinations until or on the given date
dbRouter.get('/vaccinated', async (req, res) => {
  // Get query params
  const range = req.query.range;
  const date = req.query.date;
  const time = req.query.time;

  // Initialize variable for joining date and time
  let datetime = '';
  // Time is undefined/empty when quering for whole day only
  if (time === undefined || time === '') {
    datetime = date;
  } else {
    datetime = `${date} ${time}`;
  }

  try {
    const dbRes = await dbService.getVaccinatedByDate(range, datetime);
    res.json(dbRes);
  } catch (err) {
    logger.logInfo('Database query failed:', err);
    res.status(500).json({ message: 'Database query failed' });
  }
});

// Get number of orders and vaccines arrived per producer until or on the gived date
dbRouter.get('/perproducer', async (req, res) => {
  const range = req.query.range;
  const date = req.query.date;
  const time = req.query.time;

  let datetime = '';
  if (time === undefined || time === '') {
    datetime = date;
  } else {
    datetime = `${date} ${time}`;
  }

  try {
    const dbRes = await dbService.getOrdersPerProducer(range, datetime);
    res.json(dbRes);
  } catch (err) {
    logger.logInfo('Database query failed:', err);
    res.json({ message: 'Database query failed' });
  }
});

// Get number of expired orders (bottles) by the given date
dbRouter.get('/expired', async (req, res) => {
  const date = req.query.date;

  try {
    const dbRes = await dbService.getExpiredOrders(date);
    res.json(dbRes);
  } catch (err) {
    logger.logInfo('Database query failed:', err);
    res.json({ message: 'Database query failed' });
  }
});

module.exports = dbRouter;
