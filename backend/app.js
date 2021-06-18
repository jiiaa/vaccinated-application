const express = require('express');
const cors = require('cors');

const dbRouter = require('./routes/database');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/ping', (req, res) => {
  res.send('<h3>Someone pinged Vaccinated Application</h3>');
});

app.use('/api', dbRouter);



module.exports = app;