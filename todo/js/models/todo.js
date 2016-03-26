var app=app||{};

app.Todo=Backbone.Model.extend({

defaults:{
	title:'',
	completed:false
},
toggle: function(){
		//this.save({
			this.set('completed',!this.get('completed'));
		//});
console.log("2");
		}	
});	