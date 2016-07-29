
module.exports = function() {
	
	return {
		'checkInt': function( id ) {
			return !isNaN( parseFloat( id ) );
		}
	}
}