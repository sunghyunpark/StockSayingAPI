var responseUtil = {};

responseUtil.successTrue = function(){
  return {
    code : 200,
    message : 'Success'
  };
};

responseUtil.successTrueWithData = function(result){
  return {
    code : 200,
    message : 'Success',
    result : result
  };
};

responseUtil.successFalse = function(errCode, message){
  return {
    code : errCode,
    message : message
  };
};

module.exports = responseUtil;
