'use strict';

var https = require('https'); 

module.exports = {

    home: function (req, res) {
        var plant_name = req.query.plantSearch,
            state = req.query.stateSearch;
            
        //plant/state query to db
        res.render('index', {plant_name: plant_name, state: state});
    },

    about: function (req, res) {
        res.render('about');
    }
	
}