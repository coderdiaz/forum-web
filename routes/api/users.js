var express = require('express');
var router = express.Router();
const authenticate = require('../../middlewares/authenticateApi')

/* GET users listing. */
router.get('/', authenticate,  function(req, res, next) {
  try {
    return res.json({});
  } catch (err) {
    // TODO: Catch exception
  }
});

module.exports = router;
