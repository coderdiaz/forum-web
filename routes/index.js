var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET publication page */
router.get('/forum/:slug', (req, res, next) => {
  res.render('publication', {});
});

module.exports = router;
