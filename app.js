var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');

// Pages
var indexRouter = require('./routes/index');

// API
var usersApiRouter = require('./routes/api/users');
var publicationsApiRouter = require('./routes/api/publications');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersApiRouter);
app.use('/api/publications', publicationsApiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  const statusCode = err.status || 500;

  // render the error API
  if (/.api/.test(req.url)) {
    return res.status(statusCode).json({
      code: statusCode,
      message: err.message
    });
  }

  // render the error page
  return res.status(statusCode).render('error');
});

module.exports = app;
