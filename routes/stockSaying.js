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


/*
* author List 받기
*/
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

/*
* 명언 등록
*/
router.post('/upload/saying', function(req, res){
  var contents = req.body.contents;
  var date = req.body.date;
  var authorName = req.body.authorName;
  var gravityHorizontal = req.body.gravityHorizontal;
  var gravityVertical = req.body.gravityVertical;
  var textSize = req.body.textSize;

  var sql = 'INSERT INTO article (contents, author_name, text_size, gravity_horizontal, gravity_vertical, created_at) '+
  'VALUES(?,?,?,?,?,?)';
  conn.query(sql, [contents, authorName, textSize, gravityHorizontal, gravityVertical, date], function(err, result, fields){
    if(err){
      console.log(err);
    }else{
      res.json(responseUtil.successTrue());
    }
  })
})

module.exports = router;
