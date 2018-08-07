//	import
let createError = require('http-errors'),
		express = require('express'),
		path = require('path'),
		cookieParser = require('cookie-parser'),
		morgan = require('morgan'),
		fs = require('fs'),
		rfs = require('rotating-file-stream'),

		insertRouter = require('./routes/insert'),
		selectRouter = require('./routes/select'),
		updateRouter = require('./routes/update'),
		deleteRouter = require('./routes/delete')


//	access 로그 설정
var logDirectory = path.join(__dirname, 'log')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
var accessLogStream = rfs('access.log', {
  interval: '1d',
  path: logDirectory
})

var app = express()

//	view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// app.use(morgan('dev'))
app.use(morgan('combined', {stream: accessLogStream}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/i', insertRouter)	//	C
app.use('/s', selectRouter)	//	R
app.use('/u', updateRouter)	//	U
app.use('/d', deleteRouter)	//	D


//	catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
});

//	error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  res.render('error')
});

module.exports = app
