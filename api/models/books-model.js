'use strict';

var table 	   = 'books AS Book'; 
var listfields = 'Book.*';
var detailfields = 'Book.*';
var joins 	   = 'INNER JOIN publishers AS Publisher ON Book.publisher_id = Publisher.id';
var conditions = 'Book.row_status = 1';
var Book = function () {

	return {
		getCount: function( conditions ) {
			conditions = conditions == null ? 'Book.row_status = 1' : conditions;
			return buildQuery.count( table, conditions );	
		},
		getList: function( conditions, options ) {
			// options = options.join( { jaja: 'fun' } );
			// return options;
			// var fruits = ["Banana", "Orange", "Apple", "Mango"];
			// var energy = fruits.concat(['sadasd']); 			
			// var options = merge( options, { joins: joins } );
			var result  = buildQuery.list( listfields, table, conditions, options );
			return result;
		},
		updateData: function( id ) {
			var result = buildQuery.update( table, 'Book.id = ' + id );
			return result;
		},
		getDetail: function( conditions, options ) {
			// options = options.join( { jaja: 'fun' } );
			// return options;
			// var fruits = ["Banana", "Orange", "Apple", "Mango"];
			// var energy = fruits.concat(['sadasd']); 			
			// var options = merge( options, { joins: joins } );
			var result  = buildQuery.list( detailfields, table, conditions, options );
			return result;
		}
	}
}

module.exports = new Book();
