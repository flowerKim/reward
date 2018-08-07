/* 

  프로젝트 전체에서 공통으로 사용될 [ 메 서 드 ] 모음
  exports.globalMethod = function() { }
  
*/

exports.dbConnErrProcess = function(err, res) {
  var obj = {}
  obj.result = 99
  obj.message = err.originalError.message
  console.log(obj)
  res.send(obj)
}
