var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  try {
    return res.json({});
  } catch (err) {
    // TODO: Catch exception
  }
});

module.exports = router;
