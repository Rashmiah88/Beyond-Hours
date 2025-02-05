var createError = require('http-errors'); // Module for creating HTTP errors
var express = require('express'); // Main express module for handling HTTP requests
var session = require('express-session');
var path = require('path'); // Module for handling file and directory paths
var cookieParser = require('cookie-parser'); // Middleware for parsing cookies
var logger = require('morgan');// HTTP request logger middleware


//importing the route handlers
var indexRouter = require('./routes/index'); // Router for handling index-related routes
var usersRouter = require('./models/users'); // Router for handling user-related routes
// const { Session } = require('inspector');

var app = express();// Crate an Express application

app.use(session ({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false}
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
