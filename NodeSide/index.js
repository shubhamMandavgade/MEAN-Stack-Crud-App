const express = require('express');
var app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const { mongoose } = require('./db.js');
var employeeController = require('./controllers/employeeController.js');
var userRoutesController = require('./controllers/userRoutesController');

const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');

/*Middlewares*/
app.use(bodyParser.json());

app.use(cors({ origin: 'http://localhost:4200' }));

app.use('/employees', employeeController);
app.use('/users',userRoutesController);

app.use('*', (req, res, next) => {
    res.status(404);
    return res.json({
      statusCode :404,
      statusMessage: 'URL not found'
    })
  });
  
  app.use(function (err, req, res, next) {
    res.status(500).json({
      sm:err.message,
      sc:500
    });
  })
  
  
const port = process.env.PORT || 3000  
app.listen(port, () => console.log('Server started at port : 3000'));