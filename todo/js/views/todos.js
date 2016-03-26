var app=app||{};

app.TodoView = Backbone.View.extend({
	tagName:'li',
	template:_.template($('#item-template').html()),
	events:{
		'click .toggle':'toggleCompleted', 
		'dbclick label':'edit',
		'keypress .edit':'updateOnEnter',
		'blur .edit':'close',
		'click .destroy':'clear'
		
	},
	initialize: function(){
		this.listenTo(this.model,'change',this.render);
		this.listenTo(this.model,'destroy',this.remove);
		this.listenTo(this.model,'visible',this.toggleVisible);


		},
	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
	//	this.$el.toggleClass('completed',this.model.get('completed'));
		this.toggleVisible();
		
		this.$input=this.$('.edit');
		return this;
	},
	edit: function(){
		console.log(this.model);
		this.$el.addClass('editing');
	this.$input.focus();
	},
	updateOnEnter: function(e){
		console.log(this.model.toJSON());
		if(e.which==ENTER_KEY){
			this.close();
		}
		
	},
	close:function(){
		var value=this.$input.val().trim();
		if(value){
		console.log(this.model.toJSON());		
						//this.modal.save({title:value})
						this.model.set('title',value);
		}
		else
		{
			this.clear();
		}
		this.$el.removeClass('editing');
		
	},
	clear:function(){
		 
		this.model.destroy();
	},
	toggleCompleted:function(){
		this.model.toggle();
		console.log("bmb");
		
		console.log(this.model.toJSON());
	},
	isHidden:function(){
	 var isCompleted=this.model.get('completed');
return ((!isCompleted && app.TodoFilter==='completed')||(isCompleted && app.TodoFilter==='active'));
		
	},
	toggleVisible:function(){
		this.$el.toggleClass('hidden',this.isHidden());
	}
	
	
});	