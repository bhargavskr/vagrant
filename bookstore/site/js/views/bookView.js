var app=app||{};
app.BookView=Backbone.View.extend({
	tagName:'div',
	className:'bookContainer',
	template:_.template($('#bookTemplate').html()),
	initialize:function(){
//	this.on('destroy',this.remove());
	
	},	
    events:{
		'click .delete':'removeBook'
	},
	render:function(){
		
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},
	removeBook:function(){
		var h=this.model.destroy();
			    console.log(h);	

		var sd=this.remove();
//	    console.log(sd);	
	}
	
});
