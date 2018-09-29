const firebase = require('firebase');

/**
 * Middleware to know if a Firebase Auth user is authenticated
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
const isAuthenticated = (req, res, next) => {
  const user = req.session.user
  if (!user) {
    return res.redirect('/signin')
  }
  req.user = user;
  next()
}

module.exports = isAuthenticated;