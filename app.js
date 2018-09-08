const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const expressSession = require('express-session');
const firebase = require('firebase');
require('firebase/auth');

// Firebase config
const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.FIREBASE_DATABASEURL,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_SENDERID
}

// Initialized firebase
firebase.initializeApp(firebaseConfig);

// Pages
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const publicationRouter = require('./routes/publication');

// API
const usersApiRouter = require('./routes/api/users');
const publicationsApiRouter = require('./routes/api/publications');

const app = express();

// Locals
app.locals.moment = require('moment');
app.locals.truncate = (text) => {
  return (text.length < 180) ? text.substring(0, 180) : text.substring(0,180) + '...' 
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// Session
app.use(expressSession({
  secret: process.env.SESSION_KEY || 'secret',
  resave: false,
  saveUninitialized: false,
}))

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

// Session-persisted message middleware
app.use((req, res, next) => {
  const err = req.session.error;
  const msg = req.session.notice;
  const success = req.session.success;
  const info = req.session.info;
  const errors = req.session.errors;
  const user = req.session.user;

  delete req.session.error;
  delete req.session.success;
  delete req.session.notice;
  delete req.session.info;
  delete req.session.errors;

  if (err) res.locals.error = err;
  if (msg) res.locals.notice = msg;
  if (success) res.locals.success = success;
  if (info) res.locals.info = info;
  if (errors) res.locals.errors = errors;
  if (user) res.locals.user = user;
  next();
});

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/publication', publicationRouter)
app.use('/api/users', usersApiRouter);
app.use('/api/publications', publicationsApiRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
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
