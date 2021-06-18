const dbRouter = require('express').Router();

const dbService = require('../services/database');

// Get number of orders arrived until given date
dbRouter.get('/arrived/:date/:time', (req, res) => {
  const date = req.params.date;
  const time = req.params.time;
  const datetime = `${date} ${time}`;
  dbService.getOrdersByDate(datetime, function (response) {
    if (response) {
      res.json(response);
    } else {
      res.status(500).json({ message: 'Database read failed' });
    }
  });
});

module.exports = dbRouter;