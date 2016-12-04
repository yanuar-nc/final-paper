var merge = require( 'merge' ), original, cloned;
module.exports = function() {


	return{
		getResponse: function( res, data, code, description ) {
			var code = code !== undefined ? code : 200;
			var message = {
				'200': 'Success',
				'201': 'Created',
				'400': 'Bad Request',
				'401': 'Unauthorized',
				'403': 'Forbidden',
				'404': 'Not Found',
				'405': 'Method Not Allowed',
				'409': 'Conflict',
				'422': 'Unprocessable Entity',
				'500': 'Internal Server Error'

			};
			var description = description !== undefined ? description :'';

			var statusData = {
				'code': code,
				'message': message[code],
				'description': description,
				'time':  ( new Date() - start) / 1000 + 'ms'
			};

			var result = {
				'status': statusData,
				'data': data
			}	
			// console.log(JSON.stringify({ uno: 1, dos: 2 }, null, '\t'))
			// console.log(JSON.stringify(result, null, '\t'))
			return res.status( code ).send( JSON.stringify(data, null, '\t') )
		},
		merge: function( obj1, obj2 ) {

		},
		addDay: function( date, day ) {
			var today = new Date();
			var tomorrow = new Date( today.setDate( today.getDate() + day ) );
			var y = tomorrow.getFullYear();
			var m = tomorrow.getMonth() + 1;
			var d = tomorrow.getDate();
			var h = tomorrow.getHours();
			var i = tomorrow.getMinutes();
			var s = tomorrow.getSeconds();
			var result = tomorrow.toISOString().replace(/T/, ' ').replace(/\..+/, '');
			return result;
		},
		rowCreated: function( req, res ) {
			var ip = req.connection.remoteAddress;

			if (ip.length < 15) {
				if ( ip == '::1' ) ip = '127.0.0.1';
				else ip = ip;
			} 
			else ip = ip.slice(7);

			var result = {
				'ip': ip,
				'created': this.addDay( new Date, 0 )
			}
			return JSON.stringify(result);
		},
		getValue: function( data ) {
			var post  = data;
			var value = [];
			for( k in post ) {
				if ( k != 'token' ) {
					value.push( post[ k ]);
				}
			}
			return value;

		}
	}
}
