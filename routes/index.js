var express = require('express');
var router = express.Router();
var config = require('../src/config');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: config.title,
      welcome: 'შეიყვანეთ მეტსახელი',
      enter_game: 'შესვლა'
  });
});

module.exports = router;
