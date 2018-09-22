const firebase = require('firebase');
const debug = require('debug')('nodejs-fsbt-04-2018:server');

/**
 * Middleware to know if a Firebase Auth user is authenticated
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
const isAuthenticated = (req, res, next) => {
  debug(req.session.user);
  const user = firebase.auth().currentUser
  debug(user);
  if (!user) {
    return res.redirect('/signin')
  }
  req.user = user;
  next()
}

module.exports = isAuthenticated;