const express = require('express');
const router = express.Router();
const Validator = require('validatorjs');
const Comment = require('../models/comment');

/* POST / */
router.post('/', (req, res, next) => {
  const data = req.body;
  const rules = {
    content: 'required|string|max:120',
    slug: 'required|string'
  };
  const {slug, content} = data;
  const validation = new Validator(data, rules);
  if (validation.fails()) {
    req.session.errors = validation.errors.errors;
    return res.redirect(`/forum/${slug}`);
  }
  const comment = new Comment({
    content,
    parentId: slug,
    author: {
      name: req.session.user.name,
      providerId: req.session.user.providerId,
      github: req.session.user.social.github
    }
  });
  comment.save();
  return res.redirect(`/forum/${slug}`);
});

module.exports = router;