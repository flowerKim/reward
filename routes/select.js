let express = require('express'),
    router = express.Router(),

    gm = require('../global/method'),
    go = require('../global/object'),
    gv = require('../global/variable'),
    con = require('../global/conn')

//  제휴회사 목록 뿌려주기
router.get('/company', function(req, res, next) {
  // var page = Number(req.query.p)
  // var startIndex = 1
  // if (page != 1) startIndex = page + ((page - 1) * (gv.boardIndex - 1))

  // var sql
  //   = "SELECT rc_code as code, rc_name as name, rc_callnum as callnum, rc_regdate as regdate, rc_alliance_status as status"
  //   + " FROM R_COMPANY ORDER BY rc_code DESC OFFSET "
  //   + startIndex + " ROWS FETCH NEXT "
  //   + gv.boardIndex + " ROWS ONLY"
    
  var sql
    = "SELECT"
    + " rc_code as code, rc_company_name as c_name, rc_business_num as b_num,"
    + " rc_reg_date as regdate, rc_partner_status as status, rc_type as type"
    + " FROM R_COMPANY ORDER BY rc_code DESC"
  con.runQuery(sql, function(err, result) {
    if (err) gm.dbConnErrProcess(err, res)
    else {
      console.log(result.recordsets[0])
      res.send(result.recordsets[0])
    }
  })
})

//  회사 상세
router.get('/company_detail', function(req, res, next) {
  var code = Number(req.query.code)
  var sql
  = "SELECT"
  + " rc_code as code, rc_company_name as c_name, rc_business_num as b_num, rc_type as type, rc_channel as channel,"
  + " rc_partner_start as partner_start, rc_partner_end as partner_end, rc_ceo_name as ceo_name,"
  + " rc_address as address, rc_manager_name as manager_name, rc_manager_position as manager_position,"
  + " rc_company_callnum as company_callnum, rc_manager_callnum as manager_callnum, rc_desc as _desc"
  + " FROM R_COMPANY WHERE rc_code = " + code

  con.runQuery(sql, function(err, result) {
    if (err) gm.dbConnErrProcess(err, res)
    else {
      console.log(result.recordsets[0][0])
      res.send(result.recordsets[0][0])
    }
  })
})

//  고객 사용 내역 뿌려주기
router.get('/usage_history', function(req, res, next) {
  var sql
    = "SELECT * FROM R_USAGE_HISTORY ORDER BY ruh_code DESC"
  con.runQuery(sql, function(err, result) {
    if (err) gm.dbConnErrProcess(err, res)
    else {
      console.log(result.recordsets[0])
      res.send(result.recordsets[0])
    }
  })
})

router.get('/service', function(req, res, next) {

  var sql
    = "SELECT"
    + " rs_code as code, rs_type as type, rs_channel as channel, rs_company_name as c_name,"
    + " rs_partner_start as partner_start, rs_partner_end as partner_end, rs_partner_status as status"
    +" FROM R_SERVICE ORDER BY rs_code DESC"
  con.runQuery(sql, function(err, result) {
    if (err) gm.dbConnErrProcess(err, res)
    else {
      console.log(result.recordsets[0])
      res.send(result.recordsets[0])
    }
  })
})

module.exports = router