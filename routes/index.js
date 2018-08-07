const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', error: `Please sign in or create a new account!` });
});

module.exports = router;
