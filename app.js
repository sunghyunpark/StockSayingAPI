var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended:false
}));
app.use(bodyParser.json());

app.use('/api/author', require('./routes/author'));
app.use('/api/saying', require('./routes/saying'));

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
