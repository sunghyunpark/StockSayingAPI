var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended:false
}));
app.use(bodyParser.json());

app.use('/api/stockSaying', require('./routes/stockSaying'));

app.use('/', function(req, res){
  res.send("hello");
})

app.use(function(req, res, next){
  res.status(404);
  res.json({
    error : 'Not Found'
  });
  return;
});

app.listen(3000, function(){
  console.log('Connected, StockSaying 3000 port!');
})
