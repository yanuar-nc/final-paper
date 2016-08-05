var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database    : 'nodejs_db'
});

connection.connect(function(err) {
    if (err) {
    console.error('error connecting: ' + err.stack);
    return;
}});

module.exports = connection;

// 'use strict';

// module.exports = {

// 	'host': 'localhost',
// 	'user': 'root',
// 	'password': null,
// 	'database': 'nodejs_db'

// }
// module.exports = new Connection();
