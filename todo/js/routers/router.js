var app=app||{}
console.log("adshgas");
 app.TodoRouter=Backbone.Router.extend({
	
routes:{
	'*id':'allTodo'
	
},
allTodo:function(id){
	
	console.log("adshgas");
/*if(id==='completed'){
	app.TodoFilter='completed';
}else if(id==='active'){
	app.TodoFilter='active';
}else{
		
}*/
app.TodoFilter=id||'';
app.todos.trigger('filter');		
}
	
	
	
	
});
new app.TodoRouter();
Backbone.history.start();