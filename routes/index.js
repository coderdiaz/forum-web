var express = require('express');
var router = express.Router();
var Publication = require('../models/publication');
var Tag = require('../models/tag');
var isAuthenticated = require('../middlewares/isAuthenticated');

/* GET home page. */
router.get('/', async (req, res, next) => {
  const publications = await Publication.find().exec()
  const tags = await Tag.find().exec();
  res.render('index', { publications, tags });
});

/* GET create page */
router.get('/forum/create', isAuthenticated, async (req, res, next) => {
  const tags = await Tag.find().exec();
  res.render('forum/create', { tags });
});

/* GET publication page */
router.get('/forum/:slug', async (req, res, next) => {
  const slug = req.params.slug
  const publication = await Publication.findOne({ slug }).exec()
  if (!publication) {
    res.redirect('/')
  }
  console.log(publication)
  res.render('forum/slug', { publication });
});

/* GET login page */
router.get('/signin', (req, res, next) => {
  res.render('login');
});

/* GET register page */
router.get('/signup', (req, res, next) => {
  res.render('register');
});

module.exports = router;
