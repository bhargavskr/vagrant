var app=app||{};

app.AppView = Backbone.View.extend({
	
	el:'#todoapp',
	statsTemplate: _.template($('#stats-template').html()),
	events: {
		'keypress #new-todo': 'createOnEnter',
		'click #clear-completed': 'clearCompleted',
		'click #toggle-all':'toggleAllComplete'
	},
	initialize: function(){
			this.allCheckbox=this.$('#toggle-all')[0];
			console.log(this.$('#toggle-all'));
			this.$input=this.$('#new-todo');
			console.log(this.$('#new-todo'));
			this.$footer=this.$('#footer');
			this.$main=this.$('#main');
			this.listenTo(app.todos,'add', this.addOne);
		//	this.listenTo(app.Todos,'reset', this.addAll);
			this.listenTo(app.todos,'change:completed', this.filterOne);
			this.listenTo(app.todos,'filter', this.filterAll);
			this.listenTo(app.todos,'all',this.render);
		//	app.todos.fetch();
			this.render();
	},

	render:function(){
		var completed=app.todos.completed().length;
		var remaining=app.todos.remaining().length;
		console.log("App View ");
		console.log(app.todos.length);
		
		if(app.todos.length){
			this.$main.show();
			this.$footer.show();
			this.$footer.html(this.statsTemplate({completed:completed,remaining:remaining}));
			//this.$('#filters li a')
				//.removeClass('selected')
				//.filter('[href="#/'+(app.TodoFilter||'')+'"]')
				//.addClass('selected');
		}
		else{
			this.$main.hide();
			this.$footer.hide();
			
		}	
		this.allCheckbox.checked=!remaining; 
		
	},
	addOne: function(todo){
		var view=new app.TodoView({model:todo});
		$('#todo-list').append(view.render().el); 
	},
/*	addAll: function(){
		this.$('#todo-list').html('');
		app.todos.each(this.addOne,this);
	},*/
	filterOne:function(todo){
		todo.trigger('visible');
	},
	filterAll:function(){
		app.todos.each(this.filterOne,this);
	},
	newAttributes:function(){
		var new_todo=	{
			title:this.$input.val().trim(),
			order:app.todos.nextOrder(),
			completed:false 
		}
		console.log(new_todo);
		return new_todo;
		
	},
	createOnEnter:function(event){
		if(event.which!==ENTER_KEY||!this.$input.val().trim()){
			console.log(event.which);
			console.log(this.$input.val().trim());
			
			return;}
		console.log("1")
		app.todos.add(this.newAttributes());
		console.log(app.todos.toJSON());
		this.$input.val('');	
	},
	clearCompleted:function(){
		_.invoke(app.todos.completed(),'destroy');
		return false;
	},
	toggleAllComplete:function(){
	
		var completed=this.allCheckbox.checked;
		console.log("toggle all "+completed);
		app.todos.each(function(todo){
	//	todo.save({
			todo.set('completed',completed); 
	//	});
		});
		
		
	}
	
});
	