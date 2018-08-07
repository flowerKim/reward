/* 

  프로젝트 전체에서 공통으로 사용될 [ 객 체 ] 모음
  exports.globalObject = {}

*/

//  개발DB 접속 정보
exports.testDBInfo = {
  user: 'mgpay',
  password: 'aaa',
  server: 'db.mgpay.co.kr', 
  port: 1433,
  database: 'mgpay',
  socket_port: 3000,
}

//  실DB 접속 정보
exports.realDBInfo = {
  user: 'mgpay',
  password: 'mgpay123!@#',
  server: 'mgpay.co.kr', 
  port: 1433,
  database: 'mgpay',
  socket_port: 3000,
}