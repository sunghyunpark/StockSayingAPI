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
router.post('/upload/author', function(req, res){
  var authorName = req.body.authorName;
  var currentTime = new Date().toFormat('YYYY-MM-DD HH24:MI:SS');

  var sql = 'SELECT author_name FROM author WHERE author_name = ?';
  conn.query(sql, [authorName], function(err, result, fields){
    if(err){
      console.log(err);
    }else{
      if(result.length > 0){
        // 동일한 작가가 있는 경우
        res.json(responseUtil.successFalse(500, '이미 등록한 작가가 존재합니다.'));
      }else{
        // 동일한 작가가 없는 경우
        var sql = 'INSERT INTO author (author_name, created_at) VALUES(?, ?)';
        conn.query(sql, [authorName, currentTime], function(err, result, fields){
          if(err){
            console.log(err);
          }else{
            res.json(responseUtil.successTrue());
            console.log('Success to register author');
          }
        })
      }
    }
  })

})

/*
* author List 받기
*/
router.get('/authorList/:no', function(req, res){
  var no = req.params.no;
  var offsetSql = (no == 0) ? '' : ' WHERE created_at < (SELECT created_at FROM author WHERE no='+no+')';

  var sql = 'SELECT author_name AS authorName, '+
  'no, '+
  'created_at AS createdAt'+
  ' FROM author' + offsetSql + ' ORDER BY created_at DESC LIMIT 10';

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
