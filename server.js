var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();

var apiRouter = require('./routes/router');
var port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(morgan('combined'));
var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost:27017/pagination';

app.use('/api', apiRouter);
mongoose.connect(dbURI);
mongoose.connection.on('connected', function () {  
  app.listen(port, function() {
    console.log('app listens on',port);
  });
}); 

module.exports = app;
