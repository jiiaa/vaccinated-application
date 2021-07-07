const dbRouter = require('express').Router();

const dbService = require('../services/database');

// Get number of orders arrived until given date
dbRouter.get('/arrived/:range/:date/:time', (req, res) => {
  const range = req.params.range;
  const date = req.params.date;
  const time = req.params.time;
  const datetime = `${date} ${time}`;
  dbService.getOrdersByDate(range, datetime, function (response) {
    if (response) {
      res.json(response);
    } else {
      res.status(500).json({ message: 'Database read failed' });
    }
  });
});

module.exports = dbRouter;