'use strict';

var express = require('express'),
    router = express.Router(),
    appController = require('./controllers/app');

//point to what functions to use based on url pattern
router.get('/', appController.home);
router.get('/about', appController.about);

module.exports = router;
