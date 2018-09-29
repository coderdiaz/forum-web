const express = require('express');
const router = express.Router();
const firebase = require('firebase');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');

router.post('/login', (req, res, next) => {
  const { email, password } = req.body
  firebase.auth().signInWithEmailAndPassword(email, password).then(async auth => {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: 3600000
    });
    return res.status(200).json({
      token
    });
  }).catch(err => {
    return res.status(401).json({
      code: 401,
      message: 'Unauthorized'
    })
  });
})

module.exports = router;