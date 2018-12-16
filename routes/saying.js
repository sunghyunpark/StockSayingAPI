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

router.get('/list/saying/:no/:sort', function(req, res){
  var no = req.params.no;
  var sort = req.params.sort;

  var offset = '';
  if(sort == 'all'){
    offset = (no == 0) ? '' : 'WHERE created_at < (SELECT created_at FROM article WHERE no='+no+')';
  }else{
    offset = (no == 0) ? 'WHERE author_name = ?' : 'WHERE created_at < (SELECT created_at FROM article WHERE no='+no+') AND author_name = ?';
  }

  var sql = 'SELECT no, '+
  'contents, '+
  'author_name AS authorName, '+
  'text_size AS textSize, '+
  'gravity_horizontal AS gravityHorizontal, '+
  'gravity_vertical AS gravityVertical, '+
  'created_at AS createdAt '+
  'FROM article '+ offset + ' ORDER BY created_at DESC LIMIT 10';

  conn.query(sql, [sort], function(err, result, fields){
    if(err){
      console.log(err);
    }else{
      res.json(responseUtil.successTrueWithData(result));
    }
  })
})

module.exports = router;
