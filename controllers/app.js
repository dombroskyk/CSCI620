'use strict';

var https = require('https'),
    mysql = require('mysql'),
    config = require('../config');
    //abbrMap = require('../includes/abbrMap');

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
        
        var usa_val_names = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho",
							"Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi",
							"Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota",
							"Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont",
							"Virginia","Washington","West Virginia","Wisconsin","Wyoming"],
            can_val_names = ["British Columbia","Yukon","Northwest Territories","Alberta","Saskatchewan","Nunavut","Manitoba","Ontario","Quebec","Newfoundland and Labrador","New Brunswick","Nova Scotia"];
            
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
            //there needs to be a better way to do this
            res.render('index',
                {
                    plant_name: plant_name,
                    plant_names: ['test1','test2'],
                    state: '',
                    initial: false,
                    usa_active: usa_val_names,
                    can_active: can_val_names,
                    usa_inactive: [],
                    can_inactive: []
                }
            );
        }else if( state ){
            //query state name
            /*mysql_connection.query('SELECT plant_name FROM plant as p, location as l WHERE p.plantID = (SELECT locationID FROM location WHERE location.name like ?)', [state], function(err, results){
                
            });*/
            var usa_active = [],
                can_active = [],
                usa_inactive = [],
                can_inactive = [];
                
            for( var i = 0; i < usa_val_names.length; i++ ){
                if( usa_val_names[i] == state ){
                    usa_active.push( state );
                }else{
                    usa_inactive.push( usa_val_names[i] );
                }
            }
            for( var i = 0; i < can_val_names.length; i++ ){
                if( can_val_names[i] == state ){
                    can_active.push( state );
                }else{
                    can_inactive.push( can_val_names[i] );
                }
            }
            res.render('index',
                {
                    plant_name: '',
                    plant_names: ['test1','test2'],
                    state: state,
                    initial: false,
                    usa_active: usa_active,
                    can_active: can_active,
                    usa_inactive: usa_inactive,
                    can_inactive: can_inactive
                }
            );
        }else{
            /*mysql_connection.query('SELECT plant_name FROM plant', function(err, rows, fields){
               if( err ) throw err; //should find more elegant way to handle these
               
               console.log( 'query successful' );
            });*/
            res.render('index',
                {
                    plant_name: '',
                    plant_names: ['test1','test2','test2','test2','test2','test2','test2','test2','test2','test2','test2','test2','test2','test2','test2','test2','test2','test2','test2','test2','test2','test2','test2','test2','test2','test3'],
                    state: '',
                    initial: true,
                    usa_active: usa_val_names,
                    can_active: can_val_names,
                    usa_inactive: [],
                    can_inactive: []
                }
            );
        }
    },

    about: function (req, res) {
        res.render('about');
    }
	
}