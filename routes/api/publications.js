const express = require('express');
const router = express.Router();

/* GET / */
router.get('/', (req, res, next) => {
  try {
    return res.json({});
  } catch (err) {
    // TODO: Cath exception
  }
});

/* POST / */
router.post('/', (req, res, next) => {
  try {
    return res.json({});
  } catch (err) {
    // TODO: Cath exception
  }
});

/* PUT /:id */
router.put('/:id', (req, res, next) => {
  try {
    return res.json({});
  } catch (err) {
    // TODO: Cath exception
  }
});

/* DELETE /:id */
router.delete('/:id', (req, res, next) => {
  try {
    return res.json({});
  } catch (err) {
    // TODO: Cath exception
  }
});

module.exports = router;