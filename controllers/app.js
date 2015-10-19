'use strict';

var https = require('https'),
    mysql = require('mysql'),
    config = require('../config');

module.exports = {

    home: function (req, res) {
        var plant_name = req.query.plantSearch,
            state = req.query.stateSearch,
            mysql_connection = mysql.createConnection({
                host: config.MYSQL.HOST,
                port: config.MYSQL.PORT,
                user: config.MYSQL.USER,
                password: config.MYSQL.PASS,
                //database: config.MYSQL.DATABASE
            });
            
        mysql_connection.connect(function(err){
            if( err ){
                console.error( 'error connecting: ' + err.stack );
                return;
            }
            console.log( 'connected as id ' + mysql_connection.threadId );
        });
            
        //plant/state query to db
        //if someone tries to be smart and input both params, we prefer plant
        //connection.escape(value) to avoid SQL injection
        //alternatively (preferred) 
        //connection.query('SELECT * FROM users WHERE id = ?', [userId], function(err, results) {
            // ... 
        //});
        if( plant_name ){
            //query plant name
            /*mysql_connection.query('SELECT plant_name FROM plant WHERE plant.plant_name like \'%?%\'', [plant_name], function(err, results){
                
            });*/
        }else if( state ){
            //query state name
            /*mysql_connection.query('SELECT plant_name FROM plant as p, location as l WHERE p.plantID = (SELECT locationID FROM location WHERE location.name like ?)', [state], function(err, results){
                
            });*/
        }else{
            /*mysql_connection.query('SELECT plant_name FROM plant', function(err, rows, fields){
               if( err ) throw err; //should find more elegant way to handle these
               
               console.log( 'query successful' );
               
            });*/
        }
        res.render('index', {plant_name: plant_name, state: state});
    },

    about: function (req, res) {
        res.render('about');
    }
	
}