let express = require('express'),
    router = express.Router(),

    gm = require('../global/method'),
    go = require('../global/object'),
    gv = require('../global/variable'),
    con = require('../global/conn')


//  회사 정보 수정
router.post('/company_info_update', function(req, res, next) {
  let obj = req.body
  let sql
    = "UPDATE R_COMPANY SET "
      + "rc_company_name='"+ obj.c_name + "',"
      + "rc_type='"+ obj.type + "',"
      + "rc_channel='"+ obj.channel + "',"
      + "rc_business_num='"+ obj.b_num + "',"
      + "rc_partner_start='"+ obj.partner_start + "',"
      + "rc_partner_end='"+ obj.partner_end + "',"
      + "rc_ceo_name='"+ obj.ceo_name + "',"
      + "rc_company_callnum='"+ obj.company_callnum + "',"
      + "rc_address='"+ obj.address + "',"
      + "rc_manager_name='"+ obj.manager_name + "',"
      + "rc_manager_position='"+ obj.manager_position + "',"
      + "rc_manager_callnum='"+ obj.manager_callnum + "',"
      + "rc_desc='"+ obj._desc + "' "
    + "WHERE rc_code = " + Number(obj.code)
  con.runQuery(sql, function(err, result) {
    if (err) gm.dbConnErrProcess(err, res)
    else {
      console.log(result)
      res.send({"result":0, "message":"회사 정보 수정완료"})
    }
  })
})

// 제휴해지
router.post('/partnership_termination', function(req, res, next) {
  let sql
    = "UPDATE R_COMPANY SET rc_partner_status = 0"
    + " WHERE rc_code = " + Number(req.body.code)
  con.runQuery(sql, function(err, result) {
    if (err) gm.dbConnErrProcess(err, res)
    else {
      let sql
      = "UPDATE R_SERVICE SET rs_partner_status = 0"
      + " WHERE rs_code = " + Number(req.body.code)
      con.runQuery(sql, function(err, result) {
        if (err) gm.dbConnErrProcess(err, res)
      })
      res.send({"result":0, "message":"제휴 해지 완료"})
    }
  })
})

module.exports = router