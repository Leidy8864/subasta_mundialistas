var createError     = require('http-errors');
var express         = require('express');
var path            = require('path');
var cookieParser    = require('cookie-parser');
var logger          = require('morgan');
var mongoose        = require('mongoose');
var multer          = require('multer');
var upload          = multer({dest:'uploads/'});
var fs              = require('fs');
var session         = require('express-session');
var morgan          = require('morgan');
var bodyParser      = require('body-parser');
var passport        = require('passport');
var flash           = require('connect-flash');

require('./models/user');
require('./models/Subastas');
require('./models/Pujas');
require('./models/Comentarios');
require('./models/Boletas');

mongoose.connect('mongodb://<leidy8864>:<leidy123>@ds125041.mlab.com:25041/bda');
require('./config/passport')(passport);

var passRouter          = require('./routes/pass');
var indexRouter         = require('./routes/index');
var pujasRouter         = require('./routes/pujas');
var comentariosRouter   = require('./routes/comentarios');
var boletasRouter   = require('./routes/boletas');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({secret: 'anystringoftext',
				 saveUninitialized: true,
				 resave: true}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/' , passRouter);
app.use('/s', indexRouter);
app.use('/p', pujasRouter);
app.use('/c', comentariosRouter);
app.use('/b', boletasRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
