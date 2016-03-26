var app=app||{};

app.BookModel=Backbone.Model.extend({
defaults:{
	coverImage:'resources/it4.png',
	title:'No Title',
	author:'No Author',
	releaseDate:'Unknown',
	keywords:[{'keyword':'none'}]
},	
parse: function( response ) {
response.id = response._id;
return response;
}	
	
});
