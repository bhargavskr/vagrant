var Quiz=function(title){
	this.title=title;
};
(function(){
	window.App={
		Models:{},
		Views:{},
		Collections:{}
	};
window.template=function(id){
	return $('#'+id).html();
};
			
})();



//Person Model
App.Models.Person=Backbone.Model.extend({

defaults:{
	name:'Bhargav',
	age:25,
occupation:'job'
},
validate:function(attrs){
	if(attrs.age<0)
		return "age cannot be negative";
	if(!attrs.name)
	{
		return "person must have name";
	}
}, 

work:function()
{
return this.get('name')+' is working';
}


});

// list of persons

App.Collections.People=Backbone.Collection.extend({
	model:App.Models.Person
	
});
// View for for all people

 App.Views.People=Backbone.View.extend({
	tagName:'ul',
	render: function(){
		//console.log(this.collection.each);
		this.collection.each(function(person){
		//	console.log(person);
			var personView=new App.Views.Person({model:person});
		//	console.log(personView.el);
		//personView.render();	
	this.$el.append(personView.render().el);
		},this);
		return this;
	}
	
	});


//A view of person
 App.Views.Person = Backbone.View.extend({
tagName:'li',	
className:'person',	
template:_.template(template('personTemplate')), 
initialize: function(){
//	console.log(this.model);
//	this.render();	
	},
render:function(){
	this.$el.html(this.template(this.model.toJSON()));
	return this;
	}
});

var person=new App.Models.Person();
var pview=new App.Views.Person({model:person});



var person2=new App.Models.Person();
var pview2=new App.Views.Person({model:person2});

[pview,pview2]

var peopleCollection=new App.Collections.People([{name:'ddb'},{name:'advb'}]);
peopleCollection.add(person);
peopleCollection.add(person2);

var peopleView=new App.Views.People({collection:peopleCollection});
$(document.body).append(peopleView.render().el);

console.log(App.Collections);






/*var Person=function(config){
	
	this.name=config.name;
	this.age=config.age;
	this.occupation=config.occupation;
	
	};

Person.prototype.work=function(){
	return this.name+' is working';
};	
*/