'use strict';

var table 	   = 'journals AS journal'; 
var listfields = 'journal.*';
var detailfields = 'journal.*';
var joins 	   = 'INNER JOIN publishers AS Publisher ON journal.publisher_id = Publisher.id';
var conditions = 'journal.row_status = 1';
var journal = function () {

	return {
		getCount: function( conditions ) {
			conditions = conditions == null ? 'journal.row_status = 1' : conditions;
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
			var result = buildQuery.update( table, 'journal.id = ' + id );
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

module.exports = new journal();
