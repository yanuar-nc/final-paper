var jwt    		 = require( 'jsonwebtoken' );

exports.index = function( req, res ) {

	// console.log( fn.addDay( Date(), 1 ) );
	// console.log( fn.rowCreated( req, res ) );
	// console.log( md5.update( 'greencore' ).digest('hex') );
    db.query('SELECT * FROM publishers ORDER BY id DESC',function(err,rows) {
    	
        if( err ) fn.getResponse( res, { error: err }, 400 );
     	if( rows ) fn.getResponse( res, rows );

    });
}
exports.tester = function( req, res ) {

	// console.log( fn.addDay( Date(), 1 ) );
	// console.log( fn.rowCreated( req, res ) );
	// console.log( md5.update( 'greencore' ).digest('hex') );
    db.query('SELECT * FROM access_tokens ORDER BY id DESC',function(err,rows) {
    	
        if( err ) fn.getResponse( res, { error: err }, 400 );
     	if( rows ) fn.getResponse( res, rows );

    });
}

exports.add = function( req, res ) {
	var token = req.body.token || req.param('token') || req.headers['x-access-token'];

    if ( user_level == 99 ) {
		username = req.body.username;
		password = req.body.password;
		key 	 = md5.update( username + password + Date() ).digest('hex');

		db.query( 
			'INSERT INTO users ( username, password, api_key ) VALUES ( ?, ?, ? )', 
			[ username, password, key ],
			function( err, rows ) {
		        if( err ) fn.getResponse( res, err, 400 );
		     	if( rows ) fn.getResponse( res, {'username': username, 'key': key } );
			}
		 )									
	} else {
		fn.getResponse( res, null, 403, 'You cannot access that request.' );
	}

	return;
}