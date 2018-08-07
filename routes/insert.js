let express = require('express'),
    router = express.Router(),

    gm = require('../global/method'),
    go = require('../global/object'),
    gv = require('../global/variable'),
    con = require('../global/conn')


// 새로운 회사 등록
router.post('/new_company', function(req, res, next) {
  let obj = req.body
  let sql
    = "INSERT"
    + " R_COMPANY ("
    + "   rc_company_name, rc_type, rc_channel, rc_business_num, rc_partner_start, rc_partner_end, rc_ceo_name, rc_company_callnum,"
    + "   rc_address, rc_manager_name, rc_manager_position, rc_manager_callnum, rc_partner_status, rc_desc, rc_reg_date"
    + " ) "
    + "VALUES ("
    + "'"+ obj.company_name + "',"
    + "'"+ obj.type + "',"
    + "'"+ obj.channel + "',"
    + "'"+ obj.business_num + "',"
    + "'"+ obj.partner_start + "',"
    + "'"+ obj.partner_end + "',"
    + "'"+ obj.ceo_name + "',"
    + "'"+ obj.company_callnum + "',"
    + "'"+ obj.address + "',"
    + "'"+ obj.manager_name + "',"
    + "'"+ obj.manager_position + "',"
    + "'"+ obj.manager_callnum + "',"
    + "1,"
    + " '"+ obj.desc + "',"
    + " SYSDATETIME()"
    + ")"
  con.runQuery(sql, function(err, result) {
    if (err) gm.dbConnErrProcess(err, res)
    else {
      let sql
        = "INSERT"
        + " R_SERVICE ("
        + "   rs_company_name, rs_type, rs_channel, rs_partner_start, rs_partner_end, rs_partner_status"
        + " ) "
        + "VALUES ("
        + "'"+ obj.company_name + "',"
        + "'"+ obj.type + "',"
        + "'"+ obj.channel + "',"
        + "'"+ obj.partner_start + "',"
        + "'"+ obj.partner_end + "',"
        + "1"
        + ")"
      con.runQuery(sql, function(err, result) {
        if (err) gm.dbConnErrProcess(err, res)
      })

      console.log(result)
      res.send({"result":0, "message":"회사 등록 완료"})
    }
  })
})

module.exports = router