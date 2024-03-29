'use strict';

//main controller
//load node packages
var https = require('https'),
    mysql = require('mysql'),
    config = require('../config');

module.exports = {

    //main handler
    home: function (req, res) {
        var plant_name = req.query.plantSearch,
            state = req.query.stateSearch,
            exact = req.query.exact,
            mysql_connection = mysql.createConnection({
                host: config.MYSQL.HOST,
                port: config.MYSQL.PORT,
                user: config.MYSQL.USER,
                password: config.MYSQL.PASS,
                database: config.MYSQL.DATABASE
            });
            
        mysql_connection.connect(function(err){
            if( err ){
                console.error( 'error connecting: ' + err.stack );
                return;
            }
        });
        
        //use objects for O(1) checking/fetching, and make our lives easier later on
        var usa_val_names = {"Alabama":{},"Alaska":{},"Arizona":{},"Arkansas":{},"California":{},"Colorado":{},"Connecticut":{},"Delaware":{},"Florida":{},"Georgia":{},"Hawaii":{},"Idaho":{},
							"Illinois":{},"Indiana":{},"Iowa":{},"Kansas":{},"Kentucky":{},"Louisiana":{},"Maine":{},"Maryland":{},"Massachusetts":{},"Michigan":{},"Minnesota":{},"Mississippi":{},
							"Missouri":{},"Montana":{},"Nebraska":{},"Nevada":{},"New Hampshire":{},"New Jersey":{},"New Mexico":{},"New York":{},"North Carolina":{},"North Dakota":{},
							"Ohio":{},"Oklahoma":{},"Oregon":{},"Pennsylvania":{},"Rhode Island":{},"South Carolina":{},"South Dakota":{},"Tennessee":{},"Texas":{},"Utah":{},"Vermont":{},
							"Virginia":{},"Washington":{},"West Virginia":{},"Wisconsin":{},"Wyoming":{}},
            can_val_names = {"British Columbia":{},"Yukon":{},"Northwest Territories":{},"Alberta":{},"Saskatchewan":{},"Nunavut":{},"Manitoba":{},"Ontario":{},"Quebec":{},"Newfoundland":{},"Labrador":{},"New Brunswick":{},"Nova Scotia":{}};
            
        //plant/state query to db
        //if someone tries to be smart and input both params, we prefer plant
        //connection.escape(value) to avoid SQL injection
        if( plant_name ){
            var sql_query = '';
            if( exact ){
                //exact string search
                sql_query = 'select p.plant_name, group_concat( s.state_name ) as states from plant as p ' +
	                                       'inner join plant_to_state as ps ' +
		                                      'on p.idPlant = ps.idPlant ' +
	                                       'inner join state as s ' +
		                                      'on ps.idState = s.idState ' +
	                                       'where p.plant_name like ' + mysql_connection.escape( plant_name ) +
                                           ' group by p.plant_name'
            }else{
                //substring search
                sql_query = 'select p.plant_name, group_concat( s.state_name ) as states from plant as p ' +
	                                       'inner join plant_to_state as ps ' +
		                                      'on p.idPlant = ps.idPlant ' +
	                                       'inner join state as s ' +
		                                      'on ps.idState = s.idState ' +
	                                       'where p.plant_name like ' + mysql_connection.escape('%' + plant_name + '%') +
                                           ' group by p.plant_name'
            }
            mysql_connection.query(sql_query, function(err, rows, fields){

                var plant_names = [],
                    usa_active = [],
                    can_active = [],
                    usa_inactive = [],
                    can_inactive = [];

                //mark states as seen, push to active arrays
                for( var i = 0; i < rows.length; i++ ){
                    plant_names.push( rows[i].plant_name );
                    rows[i].states = rows[i].states.split(",");
                    for( var j = 0; j < rows[i].states.length; j++ ){

                        if( rows[i].states[j] in usa_val_names ){
                            if( !( "seen" in usa_val_names[rows[i].states[j]] ) ){
                                usa_val_names[rows[i].states[j]]["seen"] = true;
                                usa_active.push( rows[i].states[j] );
                            }
                        }else if( rows[i].states[j] in can_val_names ){
                            if( !( "seen" in can_val_names[rows[i].states[j]] ) ){
                                can_val_names[rows[i].states[j]]["seen"] = true;
                                //handle Newfoundland/Labrador
                                if( rows[i].states[j] == "Labrador" || rows[i].states[j] == "Newfoundland" ){
                                    can_active.push( "Newfoundland and Labrador" );
                                }else{
                                    can_active.push( rows[i].states[j] );   
                                }
                            }
                        }
                    }
                }
                //handle states that weren't seen in the search
                for( var name in usa_val_names ){
                    if( !( "seen" in usa_val_names[name] ) ){
                        usa_inactive.push( name );
                    }
                }
                for( var name in can_val_names ){
                    if( !( "seen" in can_val_names[name] ) ){
                        if( name == "Labrador" || name == "Newfoundland" ){
                            can_inactive.push( "Newfoundland and Labrador" );
                        }else{
                            can_inactive.push( name );
                        }
                    }
                }
                
                res.render('index',
                    {
                        plant_name: plant_name,
                        plant_names: plant_names,
                        state: '',
                        initial: false,
                        usa_active: usa_active,
                        can_active: can_active,
                        usa_inactive: usa_inactive,
                        can_inactive: can_inactive
                    }
                );
            });
            
            mysql_connection.end(function(err){
                if( err ){
                    console.log(err);
                    throw err;
                }
            });
        }else if( state ){
            //state search
            var sql_query = '';
            //handle newfoundland/labrador case
            if( state.toLowerCase() == "newfoundland and labrador" ){
                sql_query = 'select p.plant_name from plant as p ' + 
	                            'inner join plant_to_state ' +
		                            'on p.idPlant = plant_to_state.idPlant ' +
		                            'and ( plant_to_state.idState = (select idState from state where state_name like "newfoundland") or (plant_to_state.idState = (select idState from state where state_name like "labrador" ) ) ) ' +
	                            'inner join state ' +
		                            'on plant_to_state.idState = state.idState';
            }else{
                sql_query = 'select p.plant_name from plant as p '+
                                'inner join plant_to_state ' +
                                    'on p.idPlant = plant_to_state.idPlant ' +
                                    'and plant_to_state.idState = (select idState from state where state_name like ?) ' +
                                 'inner join state ' +
                                    'on plant_to_state.idState = state.idState';
            }
            //query state name
            mysql_connection.query( sql_query, [state], function(err, rows, fields){
                if( err ) console.log( err );
                var usa_active = [],
                    can_active = [],
                    usa_inactive = [],
                    can_inactive = [],
                    plant_names = [];
                    
                //build plants array
                for( var i = 0; i < rows.length; i++ ){
                    plant_names.push( rows[i].plant_name );
                }
                    
                //handle US active/inactive states
                for( var name in usa_val_names ){
                    if( name == state ){
                        usa_active.push( name );
                    }else{
                        usa_inactive.push( name );
                    }
                }
                
                //handle CA active/inactive states, including newfoundland/labrador case
                for( var name in can_val_names ){
                    if( name == state ){
                        can_active.push( name );
                    }else if( state == "Newfoundland and Labrador" && ( name == "Newfoundland" || name == "Labrador" ) ){
                        can_active.push( "Newfoundland and Labrador" );
                    }else{
                        
                        if( name == "Newfoundland" || name == "Labrador" ){
                            can_inactive.push( "Newfoundland and Labrador" );
                        }else{
                            can_inactive.push( name );
                        }
                    }
                }

                res.render('index',
                    {
                        plant_name: '',
                        plant_names: plant_names,
                        state: state,
                        initial: false,
                        usa_active: usa_active,
                        can_active: can_active,
                        usa_inactive: usa_inactive,
                        can_inactive: can_inactive
                    }
                );
            });
            mysql_connection.end(function(err){
                if( err ){
                    console.log(err);
                    throw err;
                }
            });
        }else{
            //general case, get all plant names
            mysql_connection.query('SELECT plant_name FROM plant', function(err, rows, fields){
                if( err ) console.log(err);
                
                var plant_names = [],
                    usa_active = [],
                    can_active = [];
                //build plants array
                for( var i = 0; i < rows.length; i++ ){
                    plant_names.push( rows[i].plant_name );
                }
                //build US states
                for( var usa_val in usa_val_names ){
                    usa_active.push( usa_val );
                }
                //build CAN states
                for( var can_val in can_val_names ){
                    if( can_val == "Newfoundland" || can_val == "Labrador" ){
                        can_active.push( "Newfoundland and Labrador");
                    }else{
                        can_active.push( can_val );
                    }
                }
                
                res.render('index',
                    {
                        plant_name: '',
                        plant_names: plant_names,
                        state: '',
                        initial: true,
                        usa_active: usa_active,
                        can_active: can_active,
                        usa_inactive: [],
                        can_inactive: []
                    }
                );
            });
            mysql_connection.end(function(err){
                if( err ) {
                    console.log(err);
                    throw err;
                }
            });
        }
    },

    about: function (req, res) {
        res.render('about');
    }
	
}