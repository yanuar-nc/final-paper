var jwt    		 = require( 'jsonwebtoken' );
var secretKey 	 = require( '../config/secret-keys.js' );
var expired      = 86400; // second
exports.create = function( req, res, next ) {

	    db.query(
    		'SELECT * FROM users WHERE username = ? AND api_key = ? LIMIT 1', 
    		[ req.body.username, req.body.key ], 
    		function(err,rows) {

		        if( err ) fn.getResponse( res, { error: err }, 422 );

		     	if( rows.length > 0 ) {
		     		// res.json( fn.getResponse( rows ) );
		     		var user  = rows[0];
					var token = jwt.sign( { user: user }, user.api_key, {
						expiresIn : expired // expires in 24 hours
					});
					// console.log( rows[0].id );
					db.query( 
						'INSERT INTO access_tokens ( user_id, token, expired, row_created ) VALUES ( ?, ?, ?, ? )', 
						[ user.id, token, fn.addDay( Date(), 1 ), fn.rowCreated(req) ],
						function( err, result ) {
					        if( err ) console.log( err );
					     	if( result ) console.log( result );
						}
					 )
					var data = 
					{
						success: true,
						message: 'Enjoy your token!',
						expires: expired + ' second',
						token: token
					};

					fn.getResponse( res, data, 200 )
		     	} else {
		     		fn.getResponse( res, { error: req.body }, 401, 'Your password is wrong' );
		     	}
		     	next()
			}
		)
	// next()	
}

exports.getUserByToken = function ( req, res, token ) {

	var user;
    db.query(
		'SELECT b.* FROM access_tokens a INNER JOIN users b ON a.user_id = b.id AND b.level = 99 WHERE a.token = ? LIMIT 1', 
		token, 
		function(err,rows) {
			if ( rows.length > 0 ){
				// console.log( rows );
				return rows;
			}
		}
	)			
}