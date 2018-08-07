'use strict'; 

/* eslint-env node */


const express = require('express');
const router = express.Router();
const env = process.env.NODE_ENV || 'development';
const config = require('../knexfile')[env];
const knex = require('knex')(config);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', error: `Please sign in or create a new account!` });
});

/* GET users listing. */
router.post('/login', function(req, res, next) {
  if (req.body.username && req.body.password) {
    knex('users')
    .where('username', req.body.username)
    .then((user) => {
      if (user[0].password === req.body.password){
        res.render('profile', {user: user, error: `Welcome, ${user[0].first} ${user[0].last}`});
      }
    })
  }
  else {
    res.render('index', {error: "Please enter a username and password!"});
  }
});

/* POST user listing. */
router.post('/', function(req, res, next) {
  const user = {};

  if (req.body.username && req.body.password) {
    knex('users')
    .where('username', req.body.username)
    .then((exists) => {
      console.log(exists);
      if (exists.length > 0) {
        res.render('index', {error: "Username already exists, please sign in or create a new user!"});
      }
      else {
        for (let key in req.body) {
          user[key] = req.body[key];
        }
        return knex('users')
        .insert(user)
        .then((user) => {
          res.redirect('/users');
        });
      }
    });
  }
  else {
    res.render('index', {error: "Please enter a username and password!"});
  }
});

module.exports = router;
