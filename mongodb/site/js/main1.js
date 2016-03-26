
(function(){
	window.App={
		Models:{},
		Views:{},
		Collections:{}
	};
window.template=function(id){
	return $('#'+id).html();
};

App.Models.Task=Backbone.Model.extend({
	
//	defaults:{
	//	title:"New title",
//		priority:2,
//		id:''
//	},
	
    urlRoot:'/api/tasks/',
	validate:function(attrs){
		if(!$.trim(attrs.title))
			return "NO title";
	},
	parse: function( response ) {
response.id = response._id;
return response;
}
	
});


App.Collections.Tasks=Backbone.Collection.extend({
	model:App.Models.Task,
	url:'/api/tasks'
});


App.Views.Tasks=Backbone.View.extend({
tagName:'ul',
initialize:function(){
	this.collection.on('add',this.addOne,this)
	this.collection.fetch({reset:true});
	this.listenTo(this.collection,'reset',this.render);	
	},

render:function(){
	this.collection.each(this.addOne,this);
	return this;
	},
addOne:function(task){
var taskView=new App.Views.Task({model:task});
	this.$el.append(taskView.render().el);
}
	
	
});


App.Views.Task=Backbone.View.extend({
	tagName:'li',
	template:_.template(template('taskTemplate')), 
	initialize:function(){
		
		this.model.on('destroy',this.remove,this);
	
		this.model.on('change',this.render,this);
	},
	events:{
		'click .edit':'editTask',
		'click .delete':'deleteTask'
	},
	
	render:function(){
	//	console.log(this.template(this.model.toJSON()));
	//this.$el.html(this.model.get('title'));
//	console.log(this);
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},
	deleteTask:function()
	{
		this.model.destroy();
//		console.log(tasksCollection)
	},
	editTask:function(){
//		console.log(this.model);
		var newTitle=prompt('Enter new Title',this.model.get('title'));
		this.model.set('title',newTitle,{validate:true});
		this.model.save();
	},
	remove:function(){
		this.$el.remove();
	}
	
});
App.Views.AddTask=Backbone.View.extend({
	el:'#addTask',
	events:{
		'submit':'submitted'
	},
	initialize:function(){
//		console.log(this.el.innerHTML);
	},
	submitted:function(e){
		e.preventDefault();
		//console.log("submitted");
		var newTitle=$(e.currentTarget).find('input').val();
		//console.log(newTitle);
		var newTask=new App.Models.Task({title:newTitle});
		//console.log(newTask);
		this.collection.create(newTask);
	}
	
});			
			
			
 window.tasksCollection=new App.Collections.Tasks();
var addView=new App.Views.AddTask({collection:tasksCollection});
var tasksView=new App.Views.Tasks({collection:tasksCollection})
//console.log(tasksView.render().el);
$('.tasks').html(tasksView.render().el);
//var taskView=new App.Views.Task({model:task});
//console.log(taskView.render().el);			
})();

