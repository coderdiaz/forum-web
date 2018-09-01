var express = require('express');
var router = express.Router();
var Publication = require('../models/publication');

/* GET home page. */
router.get('/', async (req, res, next) => {
  const publications = await Publication.find().exec()
  res.render('index', { publications });
});

/* GET publication page */
router.get('/forum/create', (req, res, next) => {
  res.render('publication/create', {});
});

/* GET publication page */
router.get('/forum/:slug', (req, res, next) => {
  res.render('publication', {});
});

module.exports = router;
