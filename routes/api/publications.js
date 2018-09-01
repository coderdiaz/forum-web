const express = require('express');
const router = express.Router();
const Validator = require('validatorjs');
const Publication = require('../../models/publication');

/* GET / */
router.get('/', async (req, res, next) => {
  try {
    const publications = await Publication.find().exec()
    return res.json({
      data: publications
    });
  } catch (err) {
    // TODO: Cath exception
  }
});

/* GET /:slug */
router.get('/:slug', async (req, res, next) => {
  try {
    const slug = req.params.slug;
    const publication = await Publication.findOne({ slug }).exec();
    console.log(publication);
    return res.json(publication);
  } catch (err) {
    // TODO: Cath exception
  }
});

/* POST / */
router.post('/', (req, res, next) => {
  try {
    const data = req.body
    const rules = {
      title: 'required|string|max:120',
      content: 'required|string',
      author: {
        name: 'required|string'
      },
      tags: 'required|array'
    };
    data.slug = convertToSlug(data.title)
    const validation = new Validator(data, rules)
    if (validation.fails()) {
      return res.json({
        errors: validation.errors.errors
      });
    }
    const createdPublication = new Publication(data);
    createdPublication.save();
    return res.json({ message: 'Publication created!' });
  } catch (err) {
    // TODO: Cath exception
  }
});

/* PUT /:id */
router.put('/:slug', async (req, res, next) => {
  try {
    const slug = req.params.slug;
    const data = req.body;
    const rules = {
      title: 'required|string|max:120',
      content: 'required|string',
      tags: 'required|array'
    };
    const validation = new Validator(data, rules)
    if (validation.fails()) {
      return res.json({
        errors: validation.errors.errors
      });
    }
    const updatedPublication = await Publication.findOneAndUpdate({ slug }, data, { new: true }).exec()
    return res.json(updatedPublication);
  } catch (err) {
    // TODO: Cath exception
  }
});

/* DELETE /:id */
router.delete('/:slug', async (req, res, next) => {
  try {
    const slug = req.params.slug;
    const deletedPublication = await Publication.findOneAndRemove({ slug }).exec();
    return res.status(204).json();
  } catch (err) {
    // TODO: Cath exception
  }
});

const convertToSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/ /g,'-')
      .replace(/[^\w-]+/g,'');
}

module.exports = router;