'use strict';

var table 	   = 'publishers AS Publisher'; 
var listfields = 'Publisher.id, Publisher.name';
var detailfields = 'Publisher.*';
var conditions = 'Publisher.row_status = 1';
var Publisher = function () {

	return {
		getCount: function( conditions ) {
			conditions = conditions == null ? 'Publisher.row_status = 1' : conditions;
			return buildQuery.count( table, conditions );	
		},
		getList: function( conditions, options ) {
			// options = options.join( { jaja: 'fun' } );
			// return options;
			// var fruits = ["Banana", "Orange", "Apple", "Mango"];
			// var energy = fruits.concat(['sadasd']); 			
			var options = merge( options  );
			var result  = buildQuery.list( listfields, table, conditions, options );
			return result;
		},
		updateData: function( id ) {
			var result = buildQuery.update( table, 'Publisher.id = ' + id );
			return result;
		},
		getDetail: function( conditions, options ) {
			// options = options.join( { jaja: 'fun' } );
			// return options;
			// var fruits = ["Banana", "Orange", "Apple", "Mango"];
			// var energy = fruits.concat(['sadasd']); 			
			var options = merge( options, { joins: joins } );
			var result  = buildQuery.list( detailfields, table, conditions, options );
			return result;
		}
	}
}

module.exports = new Publisher();
