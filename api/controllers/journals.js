var validation = require( '../services/validations' )();
var modelInstance = require( '../models/journals-model' );

var total_pages, conditions;
limit = 10;

exports.index = function( req, res ) {

	// console.log( fn.addDay( Date(), 1 ) );
	// console.log( fn.rowCreated( req, res ) );
	// console.log( md5.update( 'greencore' ).digest('hex') );

	var  count, 
		 total_pages,
		 conditions = 'journal.row_status = 1 ',
		 page  	= 1,
		 offset = 0,
		 order  = 'journal.id DESC'; 

	// Jika search
	// if ( req.param( 'query' ) != undefined ) conditions += ' AND title LIKE "%' + req.param( 'query' ) + '%" ';

	// condition untuk kategori tipe buku
	// if( req.params.type != undefined ) conditions += ' AND journal.journal_type = "' + req.params.type + '" ';

	if( req.query.limit != undefined ) {limit = req.query.limit;}

	// Menghitung banyak buku
	db.query( modelInstance.getCount(conditions), function( err, rows ){
		count = rows[0].count;
		total_pages  =  Math.ceil( count/limit );
	} );

	// Untuk paging
	if ( req.query.page )
	{
		page   = req.query.page - 1;
		offset = page*limit;
		page   += 1;
	}

	// Bila ingin menambahkan sorting
	if ( req.query.sort )
	{
		order = req.query.sort
		if ( req.query.direction ) 
		{
			order += ' ' + req.query.direction
		}
	}

	// parameter untuk sebuah conditions query
	var options = {
		order: order,
		offset: offset,
		limit: limit
	}

	// Query
    db.query( modelInstance.getList( conditions, options ), null, function(err,rows) {
    	
        if( err ) fn.getResponse( res, { error: err }, 422 );
     	if( rows ) fn.getResponse( res, { 
     		count: count, 
     		total_pages: total_pages, 
     		current_page: page,
     		total_rows: rows.length, 
     		journals: rows
     	} );

    });
}

exports.detail = function( req, res ) {
	
	var id = req.params.id;
	if ( validation.checkInt( id ) ) {
			
		var conditions = [ 'journal.id', 'journal.row_status' ];
		var query = modelInstance.getDetail( conditions, null );
		console.log( query );
	    db.query( query , [id, 1], function(err,rows) {
	    	
	        if( err ) fn.getResponse( res, { error: err }, 422 );
	     	if( rows && rows.length > 0 ) fn.getResponse( res, { journal: rows[0] } );
	     	else fn.getResponse( res, null, 404, 'Data is not found' );

	    });
		return
	}
	fn.getResponse( res, { error: 'ID must integer' }, 422 );
}

exports.search = function( req, res ) {

	var  count, 
		 total_pages,
		 conditions = 'journal.row_status = 1 ',
		 page  	= 1,
		 offset = 0,
		 order  = 'journal.id DESC'; 

		console.log(req.params);
	// Jika search
	if ( req.param( 'query' ) != undefined ) conditions += ' AND title LIKE "%' + req.param( 'query' ) + '%" ';

	// condition untuk kategori tipe buku
	if( req.params.type != undefined ) conditions += ' AND journal.journal_type = "' + req.params.type + '" ';

	// Menghitung banyak buku
	db.query( modelInstance.getCount(conditions), function( err, rows ){
		count = rows[0].count;
		total_pages  =  Math.ceil( count/limit );
	} );

	// Untuk paging
	if ( req.param( 'page' ) )
	{
		page   = req.param( 'page' ) - 1;
		offset = page*limit;
		page   += 1;
	}

	// Bila ingin menambahkan sorting
	if ( req.param( 'sort' ) )
	{
		order = req.param( 'sort' )
		if ( req.param( 'direction' ) ) 
		{
			order += ' ' + req.param( 'direction' )
		}
	}

	// parameter untuk sebuah conditions query
	var options = {
		order: order,
		offset: offset,
		limit: limit
	}

	// Query
    db.query( modelInstance.getList( conditions, options ), null, function(err,rows) {
    	
        if( err ) fn.getResponse( res, { error: err }, 422 );
     	if( rows ) fn.getResponse( res, { 
     		count: count, 
     		total_pages: total_pages, 
     		current_page: page,
     		journals: rows
     	} );

    });
}

exports.add = function( req, res ) {

	// if ( user_level == 99 ) {

		var post  = req.body;
		
		// delete post.token;
		db.query( 
			buildQuery.insert( 'journals' ), 
			post,
			function( err, rows ) {
		        if( err ) fn.getResponse( res, { error: err }, 400 );
		     	if( rows ) fn.getResponse( res, { 'message': 'Berhasil di simpan' } );
			}
		)
				 								
	// } else {
	// 	fn.getResponse( res, null, 403, 'You cannot access that request.' );
	// }

}

exports.edit = function( req, res ) {

// console.log(res)
	// if ( user_level == 99 ) {
	
		var id = req.params.id;

		// if ( validation.checkInt( id ) ) {
	

			var post  = req.body;

			db.query( 
				modelInstance.updateData( id ), 
				post,
				function( err, rows ) {
					post.id = id;
			        if( err ) fn.getResponse( res, { error: err, post: post }, 400 );
			     	if( rows ) fn.getResponse( res, { post, 'message': 'Berhasil di update' } )
				}
			)

		// }
		// fn.getResponse( { error: 'ID must integer' }, 400 );
		// next()
	// } else {
	// 	return fn.getResponse( res, null, 403, 'You cannot access that request.' )
	// }

}