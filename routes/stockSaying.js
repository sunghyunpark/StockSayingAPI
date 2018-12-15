require('date-utils');
require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var router = express.Router();

var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'qkr103838!@',
  database : 'stockSaying'
});
conn.connect();


/*
* author 등록
*/
router.post('/author', function(req, res){
  var authorName = req.body.authorName;

  console.log('author called');

  var sql = 'INSERT INTO author (author_name) VALUES(?)';
  conn.query(sql, [authorName], function(err, result, fields){
    if(err){
      console.log(err);
    }else{
      console.log('Success to register author');
    }
  })
})


router.get('/authorList/:id', function(req, res){
  var id = req.params.id;
  console.log(id);
})

module.exports = router;
