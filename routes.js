'use strict';

var express = require('express'),
    router = express.Router(),
    appController = require('./controllers/app');
    //apiController = require('./controllers/api');

router.get('/', appController.home);
router.get('/about', appController.about);
//router.get('/matches/?', appController.matchHistory);
//router.get('/match/?', appController.match);
//router.get('/api/matches/?', apiController.matchHistory);

module.exports = router;
