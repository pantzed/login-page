'use strict'; 

/* eslint-env node */


const express = require('express');
const router = express.Router();
const env = process.env.NODE_ENV || 'development';
const config = require('../knexfile')[env];
const knex = require('knex')(config);



router.get('/', function(req, res, next) {
  res.render('profile', {error: 'This is your profile'});
});


module.exports = router;
