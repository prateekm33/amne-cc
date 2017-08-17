const router = require('express').Router();
const controller = require('./searchController');

router.route('/')
  .post(controller.fetchResults);

module.exports = router;