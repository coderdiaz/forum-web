const express = require('express');
const router = express.Router();
const Validator = require('validatorjs');
const Tag = require('../../models/tag');

/* GET / */
router.post('/', (req, res, next) => {
  const data = req.body;
  const rules = {
    name: 'required|string'
  }
  const validation = new Validator(data, rules)
  if (validation.fails()) {
    return res.json({
      errors: validation.errors.errors
    })
  }
  const {name} = data
  const createdTag = new Tag({name})
  createdTag.save()
  return res.json(createdTag)
})

module.exports = router;