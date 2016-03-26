var app=app||{}
app.BooksCollection=Backbone.Collection.extend({
model:app.BookModel,	
	url:'/api/books'
	
});

var Books=new app.BooksCollection();
