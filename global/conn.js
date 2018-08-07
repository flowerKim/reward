let mssql = require('mssql');
let go = require('./object')

let for_query_connection

let dbcon = go.testDBInfo
// let dbcon = go.realDBInfo

function ConnectMsSQL(callback) {
  let connection = new mssql.ConnectionPool(dbcon, function(err) {
    if(err) {
      return callback(err)
    }
    callback(null, connection)
  })
}

function runQuery(sqlquery, callback) {
  if(!for_query_connection) {
    ConnectMsSQL(function(err, conn) {
      if(err) {
        return callback(err)
      }
      for_query_connection = conn
      runQuery(sqlquery,callback)
    })
    return
  }
 
  let request = new mssql.Request(for_query_connection)
  request.query(sqlquery, callback)
}
 
exports.runQuery = runQuery