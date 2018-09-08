var express = require('express');
var router = express.Router();
var Publication = require('../models/publication');
var isAuthenticated = require('../middlewares/isAuthenticated');

/* GET home page. */
router.get('/', async (req, res, next) => {
  const publications = await Publication.find().exec()
  res.render('index', { publications });
});

/* GET publication page */
router.get('/forum/:slug', async (req, res, next) => {
  const slug = req.params.slug
  const publication = await Publication.findOne({ slug }).exec()
  if (!publication) {
    res.redirect('/')
  }
  res.render('publication', { publication });
});

/* GET login page */
router.get('/signin', (req, res, next) => {
  res.render('login');
});

/* GET register page */
router.get('/signup', (req, res, next) => {
  res.render('register');
});

/* GET create page */
router.get('/create', isAuthenticated, (req, res, next) => {
  res.render('create');
})

module.exports = router;
