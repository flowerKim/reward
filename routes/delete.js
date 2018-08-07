let express = require('express'),
    router = express.Router(),

    gm = require('../global/method'),
    go = require('../global/object'),
    gv = require('../global/variable'),
    con = require('../global/conn')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('index root')
})

module.exports = router