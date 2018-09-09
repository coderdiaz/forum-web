const firebase = require('firebase');

/**
 * Middleware to know if a Firebase Auth user is authenticated
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
const isAuthenticated = (req, res, next) => {
  const user = firebase.auth().currentUser
  if (!user) {
    req.user = user
    return res.redirect('/signin')
  }
  next()
}

module.exports = isAuthenticated;