var app=app||{}

app.TodoList=Backbone.Collection.extend({
	model:app.Todo,
	//localStorage: new Backbone.LocalStroage('todos-backbone'),
	completed: function(){
		console.log(this.filter(function(todo){
			return todo.get('completed');
		}));
		return this.filter(function(todo){
			return todo.get('completed');
		});
		
	},
	remaining:function(){
		console.log(this.without.apply(this, this.completed()));
		
		return this.without.apply(this, this.completed());
	},
	
	nextOrder:function(){
		console.log(this);
		if(!this.length){
			return 1;
		}
		console.log("order"+this.last().get('order'));
		return this.last().get('order')+1;
	}/*,
	comparator:function(todo){
		return todo.get('order');
	}*/
	});
	
	app.todos=new app.TodoList();
	
	
