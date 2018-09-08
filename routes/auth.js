const express = require('express');
const router = express.Router();
const Validator = require('validatorjs');
const firebase = require('firebase');
const User = require('../models/user');

/* POST login */
router.post('/login', (req, res, next) => {
  const data = req.body;
  const rules = {
    email: 'required|string|email',
    password: 'required'
  };
  const validation = new Validator(data, rules);
  if (validation.fails()) {
    req.session.error = 'Wrong credentials!';
    return res.redirect('/signin');
  }
  const {email, password} = data;
  firebase.auth().signInWithEmailAndPassword(email, password).then(async auth => {
    const user = await User.findOne({email}).exec();
    req.session.regenerate(() => {
      req.session.user = user;
      return res.redirect('/');
    })
  }).catch(err => {
    req.session.error = 'Wrong credentials!';
    return res.redirect('/signin');
  });
});

/* POST signup */
router.post('/signup', (req, res, next) => {
  const data = req.body;
  const rules = {
    email: 'required|string|email',
    fullName: 'required|string',
    github: 'required|string',
    password: 'required|string'
  };
  const validation = new Validator(data, rules);
  if (validation.fails()) {
    req.session.errors = validation.errors.errors;
    return res.redirect('/signup');
  }
  const {email, fullName, github, password} = data
  firebase.auth().createUserWithEmailAndPassword(email, password).then(account => {
    const user = new User({
      email,
      name: fullName,
      social: {
        github
      },
      providerId: account.user.uid
    });
    user.save();
    req.session.regenerate(() => {
      req.session.user = user;
      req.session.info = 'Cool! You\'r account is ready! Post your first thread now.'
      return res.redirect('/');
    })
  }).catch(err => {
    req.session.error = err.message;
    return res.redirect('/signup');
  });
});

/* GET logout */
router.get('/logout', (req, res, next) => {
  req.session.destroy(() => {
    firebase.auth().signOut().then(() => {
      res.redirect('/');
    }).catch(err => {
      res.redirect('/')
    });
  });
});

module.exports = router;