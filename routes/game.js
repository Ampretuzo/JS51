/**
 * Created by aro on 7/26/17.
 */
var express = require('express');
var router = express.Router();
var config = require('../src/config');

/* GET users listing. */
router.get('/', function(req, res, next) {
    var nickname = req.query.nickname;
    var gameConfig = config;
    var styleFile;
    if(Math.random() > 0.5)
        styleFile = '/stylesheets/game.css';
    else
        styleFile = '/stylesheets/game2.css';
    gameConfig.style = styleFile;
    res.render('game', gameConfig);
});

module.exports = router;