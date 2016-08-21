/**
 *
 * ███╗   ██╗███████╗██╗   ██╗███████╗██████╗      ██████╗ ██╗██╗   ██╗███████╗    ██╗   ██╗██████╗ 
 * ████╗  ██║██╔════╝██║   ██║██╔════╝██╔══██╗    ██╔════╝ ██║██║   ██║██╔════╝    ██║   ██║██╔══██╗
 * ██╔██╗ ██║█████╗  ██║   ██║█████╗  ██████╔╝    ██║  ███╗██║██║   ██║█████╗      ██║   ██║██████╔╝
 * ██║╚██╗██║██╔══╝  ╚██╗ ██╔╝██╔══╝  ██╔══██╗    ██║   ██║██║╚██╗ ██╔╝██╔══╝      ██║   ██║██╔═══╝ 
 * ██║ ╚████║███████╗ ╚████╔╝ ███████╗██║  ██║    ╚██████╔╝██║ ╚████╔╝ ███████╗    ╚██████╔╝██║     
 * ╚═╝  ╚═══╝╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝     ╚═════╝ ╚═╝  ╚═══╝  ╚══════╝     ╚═════╝ ╚═╝     
 *
 **/
var express 	= require( 'express' );

var http 		 = require( 'http' );
var path 		 = require( 'path' );

var mysql 	     = require( 'mysql' );
// var connection   = require( 'express-myconnection' ); 
var bodyParser   = require( 'body-parser' );
var responseTime = require( 'response-time' )
var crypto 		 = require( 'crypto' );
jwt    		 	 = require( 'jsonwebtoken' ); // used to create, sign, and verify tokens
// var apicache 	 = require( 'apicache').options({ debug: true }).middleware;

db      	 	 = require( './config/database.js' );
var secretKey 	 = require( './config/secret-keys.js' );

start = new Date();

var app 	= express();

/*
 * REQUIRE ROUTES
 */
var users 		 = require( './controllers/users' );
var journals 		 = require( './controllers/journals' );
var publishers   = require( './controllers/publishers' );
authenticate 	 = require( './controllers/authenticate' );


/*
 * GLOBAL FUNCTION 
 */
merge 	   = require( 'merge' );
fn 		   = require( './services/global-functions.js' )();
buildQuery = require( './services/build-query.js' )();
md5 = crypto.createHash( 'md5' );

/**
  * Other variables
  */
user_data  = null;
user_level = null;

/*
 * SETTING ENVIRONTMENT
 */
app.set( 'port', process.env.PORT || 2000 );

app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );
app.use( responseTime() );

/**
  * HEADER CONFIGURATION
  */
app.use( function(req, res, next) {
	// var hash = crypto.createHash('md5').update('name').digest('hex');
	// console.log( hash );
	res.header( "Access-Control-Allow-Origin", "*" );
	res.header( "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" );
	res.header( 'Content-Type', 'text/json' );
	next();
});
/*
 * LIKE AFTER FILTER
 */
app.use( function( req, res, next ) {
	start = new Date()

	responsetime = ( new Date() - start) / 1000;

	next()	
});


/*
 * ALL ROUTES URL
 */
app.post('/authenticate', authenticate.create );

app.get('/welcome', function (req, res) {
  res.send('welcome')
  
})

app.get ( '/users', 	users.index );
app.post( '/users/add', users.add );

// == Journal Functions ==
app.get ( '/journals', 			  journals.index );
app.get ( '/journals/:type', 		  journals.index );
// app.get ( '/journals/journal',       journals.journal );
app.post( '/journals/add', 		  journals.add );
app.put ( '/journals/edit/:id', 	  journals.edit );
app.get ( '/journals/search/:query', journals.search );
app.get ( '/journals/detail/:id', 	  journals.detail );

// == Publisher Functions
app.get ( '/publishers', 		  publishers.index );
app.post( '/publishers/add',      publishers.add );
app.put ( '/publishers/edit/:id', publishers.edit );

app.post( '/profile', function (req, res, next) {
  if (!req.body) return res.sendStatus(400)
  	console.log( req.start );
});

app.get('*', function(req, res){
  fn.getResponse(res, 'Url is not found' ,404 )
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});






