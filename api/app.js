
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
var books 		 = require( './controllers/books' );
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

	// check header or url parameters or post parameters for token
	// var token = req.body.token || req.param('token') || req.headers['x-access-token'];

	// decode token
	// if (token) {

	// 	var user;
	//     db.query(
	// 		'SELECT b.* FROM access_tokens a INNER JOIN users b ON a.user_id = b.id WHERE a.token = ? LIMIT 1', 
	// 		token, 
	// 		function(err,rows) {
	// 			if ( rows.length > 0 ){
					
	// 				var row     = rows[0];
	// 				user_data	= row;
	// 				user_level  = row.level;

					// verifies secret and checks exp
					// jwt.verify(token, row.api_key, function(err, decoded) {			
					// 	if (err) {
						// 	return fn.getResponse( res, err, 401, 'Failed to authentiace token.' );
						// 	return;
						// } else {
							// if everything is good, save to request for use in other routes
	// 						return;
	// 					}
	// 				});

	// 			}
	// 		}
	// 	)			

	// } else {

		// if there is no token
		// return an error
	// 	if( req.url != '/authenticate' ){

	// 		if( req.url == '/' ) {
	// 			fn.getResponse( res, 'welcome, the API' ,200 )
	// 		}
	// 		return res.status(401).send({ 
	// 			success: false, 
	// 			message: 'No token provided.' + req.url
	// 		});
	// 	} else {

	// 	}
		
	// }

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

// == Book Functions ==
app.get ( '/books', 			  books.index );
app.get ( '/books/:type', 		  books.index );
// app.get ( '/books/journal',       books.journal );
app.post( '/books/add', 		  books.add );
app.put ( '/books/edit/:id', 	  books.edit );
app.get ( '/books/search/:query', books.search );
app.get ( '/books/detail/:id', 	  books.detail );

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






