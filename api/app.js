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

/**
 * Mendapatkan beberapa module untuk mendukung fungsi Web Service API
 * @return functions
 */
var express 	 = require( 'express' );
var http 		 = require( 'http' );
var path 		 = require( 'path' );
var mysql 	     = require( 'mysql' );
var bodyParser   = require( 'body-parser' );
var responseTime = require( 'response-time' )
var crypto 		 = require( 'crypto' );
var jwt    		 = require( 'jsonwebtoken' );

/**
 * Konfigurasi database
 * @return objects
 */
db      	 = require( './config/database.js' );
secretKey 	 = require( './config/secret-keys.js' );

/**
 * start <mendapatkan waktu awal pertama kali client merequest web service>
 * @return datetime
 */
start = new Date();
app   = express();

/**
 * modules <mendapatkan function pada setiap resouces yand direquest oleh client>
 * @return objects
 */
var users 		 = require( './controllers/users' );
var journals     = require( './controllers/journals' );
var publishers   = require( './controllers/publishers' );
var authenticate = require( './controllers/authenticate' );


/**
 * globalFunction <function dibawah ini berfungsi sebagai pendukung untuk web services>
 * @return getResponse <mendapatkan status kode HTTP Method>
 * @return buildQuery <mendapatkan output untuk mengenerate Query
 * @return md5 <function Hash Enceryption>
 */
merge 	   = require( 'merge' );
fn 		   = require( './services/global-functions.js' )();
buildQuery = require( './services/build-query.js' )();
md5 	   = crypto.createHash( 'md5' );

/**
 * Default Variables
 */
user_data  = null;
user_level = null;

/**
 * Setting Environtment <untuk memberikan port pada web service>
 */
app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );
app.use( responseTime() );

/**
 * Header Configuration
 */
app.use( function(req, res, next) {
	res.header( "Access-Control-Allow-Origin", "*" );
	res.header( "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" );
	res.header( 'Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header( 'Content-Type', 'text/json' );
	next();
});

/**
 * responseTime <untuk mendapatkan waktu pada setiap client merequest web service>
 */
app.use( function( req, res, next ) {
	start 		 = new Date()
	responsetime = (new Date() - start) / 1000;
	next()	
});

/**
 * resources <function dibawah berfungsi sebagai 
 * 			 pembuatan URI pada resources di web services
 * 			 beserta HTTP Method yang dibutuhkan>
 */
app.get ( '/journals', 			  	journals.index );
app.get ( '/journals/:type',        journals.index );
app.post( '/journals/add', 		    journals.add );
app.put ( '/journals/edit/:id', 	journals.edit );
app.get ( '/journals/search/:query',journals.search );
app.get ( '/journals/detail/:id', 	journals.detail );
app.get ( '/publishers', 		  	publishers.index );
app.post( '/publishers/add',      	publishers.add );
app.put ( '/publishers/edit/:id', 	publishers.edit );
app.get ( '*', 						function(req, res){ fn.getResponse(res, 'Url is not found' ,404) });

/**
 * createServer <fungsional ini yang akan menjalankan seluruh kebutuhan web services>
 */
app.set( 'port', process.env.PORT || 2000 );
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});