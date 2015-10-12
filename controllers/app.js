'use strict';

var https = require('https'); 

module.exports = {

    home: function (req, res) {
        var arcData = "";
        /*https.get({host:"sampleserver1.arcgisonline.com",path:"/ArcGIS/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer/1"}, function(arcGISRes){
            arcGISRes.setEncoding('utf8');
            arcGISRes.on('data', function(arcChunk) {
                //gather data from response parts
                arcData += arcChunk;
            });
           console.log(arcData);
        }).on('error', function(e) {
        //leaving console log for development purposes
        console.log('Problem with summoner name request: ' + e.message);
        
        });*/
        
        res.render('index');
    },

    about: function (req, res) {
        res.render('about');
    }
	
}