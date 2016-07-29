var validation = require( '../services/validations' )();
var modelInstance = require( '../models/publishers-model' );

var total_pages, conditions;
limit = 10;

exports.index = function( req, res ) {

	// console.log( fn.addDay( Date(), 1 ) );
	// console.log( fn.rowCreated( req, res ) );
	// console.log( md5.update( 'greencore' ).digest('hex') );

  		var  count, 
  			 total_pages,
  			 page  	= 1,
  			 offset = 0,
  			 order  = 'Publisher.id DESC'; 
  		var conditions =  req.param( 'query' ) != undefined ? 'name LIKE "%' + req.param( 'query' ) + '%" AND Publisher.row_status = 1': 'Publisher.row_status = 1';
  		console.log(modelInstance.getCount(conditions))
		db.query( modelInstance.getCount(conditions), function( err, rows ){
			count = rows[0].count;
			total_pages  =  Math.ceil( count/limit );
		} );
		
		if ( req.param( 'page' ) )
		{
			page   = req.param( 'page' ) - 1;
			offset = page*limit;
			page   += 1;
		}
		if ( req.param( 'sort' ) )
		{
			order = req.param( 'sort' )
			if ( req.param( 'direction' ) ) 
			{
				order += ' ' + req.param( 'direction' )
			}
		}
		var options = {
			order: order,
			offset: offset,
			limit: limit
		}

	    db.query( modelInstance.getList( conditions, options ), null, function(err,rows) {
	    	
	        if( err ) fn.getResponse( res, { error: err }, 422 );
	     	if( rows ) fn.getResponse( res, { 
	     		count: count, 
	     		total_pages: total_pages, 
	     		current_page: page,
	     		publishers: rows
	     	} );

	    });
}

exports.detail = function( req, res ) {
	
	var id = req.params.id;

	if ( validation.checkInt( id ) ) {
			
		var conditions = [ 'Publisher.id', 'Publisher.row_status' ];
		var query = modelInstance.getDetail( conditions, null );
	    db.query( query , [id, 1], function(err,rows) {
	    	
	        if( err ) fn.getResponse( res, { error: err }, 422 );
	     	if( rows && rows.length > 0 ) fn.getResponse( res, { book: rows[0] } );
	     	else fn.getResponse( res, null, 404, 'Data is not found' );

	    });
		return
	}
	fn.getResponse( res, { error: 'ID must integer' }, 422 );
}

exports.search = function( req, res ) {

	conditions = 'name LIKE "%' + req.param( 'query' ) + '%" AND Publisher.row_status = 1';
		var  count, 
			 total_pages,
			 page  	= 1,
			 offset = 0; 

	db.query( modelInstance.getCount( conditions ), function( err, rows ){
		count = rows[0].count;
		total_pages  =  Math.ceil( count/limit );
	} );

	if ( req.param( 'page' ) )
	{
		page   = req.param( 'page' ) - 1;
		offset = page*limit;
		page   += 1;
	}
	var options = {
		order: 'Publisher.id DESC',
		offset: offset,
		limit: limit
	}

	// console.log( fn.rowCreated( req ) );
    db.query( modelInstance.getList( conditions, options ), function(err,rows) {
    	
        if( err ) fn.getResponse( res, { error: err }, 422 );
     	if( rows ) fn.getResponse( res, { 
     		count: count, 
     		total_pages: total_pages, 
     		current_page: page,
     		books: rows 
     	} );

    });
}

exports.add = function( req, res ) {

	if ( user_level == 99 ) {

		var post  = req.body;
		
		delete post.token;
		console.log(post);
		// return res.json( fn.getResponse( { 'message': 'Berhasil di simpan' } ) );
		db.query( 
			buildQuery.insert( 'publishers' ), 
			post,
			function( err, rows ) {
		        if( err ) fn.getResponse( res, { error: err }, 400 );
		     	if( rows ) fn.getResponse( res, { 'message': 'Berhasil di simpan' } );
			}
		)
				 								
	} else {
		fn.getResponse( res, null, 403, 'You cannot access that request.' );
	}

}

exports.edit = function( req, res,next ) {

	if ( user_level == 99 ) {
	
		var id = req.params.id;

		if ( validation.checkInt( id ) ) {
	

			var post  = req.body;
			delete post.token;

			db.query( 
				modelInstance.updateData( id ), 
				post,
				function( err, rows ) {
			        if( err ) fn.getResponse( { error: err }, 400 );
			     	if( rows ) fn.getResponse( res, { post, 'message': 'Berhasil di update' } )
				}
			)

			return
		}
		fn.getResponse( { error: 'ID must integer' }, 400 );
		next()
	} else {
		return fn.getResponse( res, null, 403, 'You cannot access that request.' )
	}

}