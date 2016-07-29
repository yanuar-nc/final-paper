module.exports = function ( req, res ) {
	
	return {
		count: function( table, conditions ) {
			var query = 'SELECT count(*) as count FROM ' + table + ' WHERE 1 = 1' + this.buildConditions( conditions );
			return query;
		},
		list: function( listfields, table, conditions, options ) {
			// var joins = options.joins.count ? options.joins : '';
			var joins = '';
			var query = 'SELECT ' + listfields + ' FROM ' + table + ' ' + joins + ' WHERE 1 = 1' + this.buildConditions( conditions );
			if ( options ) {
				if ( options.order ) {
					query += ' ORDER BY ' + options.order;
				}
				if ( options.limit ) {
					var offset = options.offset ? options.offset : 0;
					query += ' LIMIT ' + offset + ',' + options.limit;
				}
			}
			return query;
		},
		insert: function( table ) {
			var query  = 'INSERT INTO ' + table + ' SET ?';
			return query;
		},
		update: function( table, conditions ) {
			var query = 'UPDATE ' + table + ' SET ? WHERE 1 = 1' + this.buildConditions( conditions );
			return query;
		},
		delete: function( table, conditions ) {
			var query = 'UPDATE ' + table + ' SET row_status = -1 WHERE 1 = 1' + this.buildConditions( conditions );
			return query;
		},	
		buildConditions: function( conditions ) {
			query = '';
			// console.log( conditions );
			if ( conditions != '' && conditions != null ) {
				
				if ( conditions instanceof Array){
					var params = conditions.join( ' =? AND ' );
					query += ' AND ' + params + ' =? ';
				} else if ( conditions instanceof Object) {
					var params = Object.keys( conditions ).join( ' =? AND ' );
					query += ' AND ' + params + ' =? ';
				} else {
					query += ' AND ' + conditions;
				}
			}
			return query;

		}
	}
}