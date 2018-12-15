require('date-utils');
require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var router = express.Router();

var conn = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : 'stockSaying'
});
conn.connect();


/*
* author 등록
*/
router.post('/author', function(req, res){
  var authorName = req.body.authorName;

  var sql = 'INSERT INTO author (author_name) VALUES(?)';
  conn.query(sql, [authorName], function(err, result, fields){
    if(err){
      console.log(err);
    }else{
      console.log('Success to register author');
    }
  })
})

module.exports = router;
