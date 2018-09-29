const express = require('express');
const router = express.Router();
const Publication = require('../models/publication');
const Tag = require('../models/tag');
const Comment = require('../models/comment');
const isAuthenticated = require('../middlewares/isAuthenticated');

/* GET home page. */
router.get('/', async (req, res, next) => {
  const filters = {}
  if (req.query.tag) {
    filters['tags'] = { $in: req.query.tag }
  }
  if (req.query.search) {
    filters['$text'] = { $search: req.query.search }
  }

  const publications = await Publication.find(filters).exec()
  const tags = await Tag.find().exec();
  res.render('index', {
    publications,
    tags,
    currentTag: (req.query.tag) ? req.query.tag : '',
    query: (req.query.search) ? req.query.search : '' 
  });
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
  const comments = await Comment.find({ parentId: slug }).exec()
  res.render('forum/slug', { publication, comments });
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
