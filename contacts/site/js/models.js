
App.Models.Contact=Backbone.Model.extend({
	validate:function(attrs){
		if(!attrs.first_name ||	!attrs.first_name || !attrs.first_name || !attrs.description){
			return 'One field is empty';
		}
	},
	parse: function( response ) {
response.id = response._id;
return response;
}
	
});