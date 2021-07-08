const dbRouter = require('express').Router();

const dbService = require('../services/database');

// Get number of orders arrived until or on the given date
dbRouter.get('/arrived', (req, res) => {
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
  dbService.getOrdersByDate(range, datetime, function (response) {
    if (response) {
      res.json(response);
    } else {
      res.status(500).json({ message: 'Database is not responding' });
    }
  });
});

// Get number of given vaccinations until or on the given date
dbRouter.get('/vaccinated', (req, res) => {
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
  dbService.getVaccinatedByDate(range, datetime, function ( response) {
    if (response) {
      res.json(response);
    } else {
      res.status(500).json({ message: 'Database is not responding'})
    }
  });
});

module.exports = dbRouter;