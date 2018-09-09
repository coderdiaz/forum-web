const express = require('express');
const router = express.Router();
const Validator = require('validatorjs');
const Publication = require('../models/publication');

/* POST / */
router.post('/', (req, res, next) => {
  const data = req.body
  const rules = {
    title: 'required|string|max:120',
    content: 'required|string',
    tags: 'required|array'
  };
  const validation = new Validator(data, rules)
  if (validation.fails()) {
    req.session.errors = validation.errors.errors
  }
  data.slug = convertToSlug(data.title)
  data.author = {}
  data.author.name = req.session.user.name
  data.author.providerId = req.session.user.providerId
  data.author.github = req.session.user.social.github
  const createdPublication = new Publication(data);
  createdPublication.save();
  res.redirect(`/forum/${data.slug}`)
});

const convertToSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/ /g,'-')
    .replace(/[^\w-]+/g,'');
}

module.exports = router;