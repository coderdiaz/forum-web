const firebase = require('firebase');

const isAuthenticated = (req, res, next) => {
  const user = firebase.auth().currentUser
  console.log(user)
  if (!user) {
    req.user = user
    return res.redirect('/signin')
  }
  next()
}

module.exports = isAuthenticated