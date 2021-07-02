const express = require('express');
const router = express.Router();
const operation = require('../services/operation');

/* GET operations. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await operation.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting operations`, err.message);
    next(err);
  }
});

/* POST operation */
router.post('/', async function(req, res, next) {
  try {
    res.status(200).json(await operation.create(req.body));
  } catch (err) {
    console.error(`Error while creating operation `, err.message);
    next(err);
  }
});

module.exports = router;