	// var timeStart = Date.now();
	// var token = req.body.access_token || req.param('access_token') || req.headers['x-access-token'];
	// if (token == undefined ) {
	// 	res.status(401).send(fn.getResponse( null, 401, 'No token provided.'));		
	// 	console.log(res.get('X-Response-Time')); 
	// 	return;
	// 	next()
	// } else if ( token == 420 ) {
	// 	next()
	// 	return;
	// } else {
	// 	// var token = jwt.sign( 'mysecret', app.get('superSecret'), {
	// 	// 	expiresInMinutes: 1440 // expires in 24 hours
	// 	// });
	// 	// verifies secret and checks exp
	// 	jwt.verify(token, app.get('superSecret'), function(err, decoded) {			
	// 		if (err) {
	// 			return res.json({ success: false, message: 'Failed to authenticate token.', err });		
	// 		} else {
	// 			// if everything is good, save to request for use in other routes
	// 			req.decoded = decoded;	
	// 			next();
	// 		}
	// 	});
	// 	next()		
	// 	return
	// }
	// return res.status(200).send({ 
	// 	success: false, 
	// 	message: token
	// });	

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});


var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'nodejs_db'
});

connection.connect( function( err ) {
	if ( err ) 
	{
		console.log( err );
	} else {
		console.log( 'Koneksi dengan id ' + connection.threadId );
	}
});

connection.query('SELECT * from users', function(err, rows, fields) {
  if (!err)
    console.log('The solution is: ', rows);
  else
    console.log('Error while performing Query.');
});

connection.end();

app.get( '/users/add', function( req, res ) {
	
	var users = {
		id: '',
		username: 'yanuar',
		password: 'nurcahyo',
		status: 1
	}

	var insert_sql = 'INSERT INTO users SET ? ';

	connection.query( insert_sql, users, function( err, result ) {
		err ? console.log( err ) : console.log( result ); 
	});
});