require('date-utils');
require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var router = express.Router();
var responseUtil = require('../util/responseUtil');
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
      res.json(responseUtil.successFalse(500, '이미 등록한 작가가 존재합니다.'));
    }else{
      res.json(responseUtil.successTrue());
      console.log('Success to register author');
    }
  })
})


router.get('/authorList', function(req, res){
  var sql = 'SELECT author_name AS authorName FROM author';
  conn.query(sql, [], function(err, result, fields){
    if(err){
      console.log(err);
    }else{
      res.json(responseUtil.successTrueWithData(result));
      console.log('Success to get author list');
    }
  })
})

module.exports = router;
