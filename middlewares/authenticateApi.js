const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const { authorization } = req.headers;
  jwt.verify(authorization, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: 'Unauthorized'
      })
    }
    next();
  })
}

module.exports = authenticate;