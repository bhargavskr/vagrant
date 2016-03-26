 App.Views.App=Backbone.View.extend({
 initialize:function(){
	 vent.on('contact:edit',this.editContact,this)
	 console.log(this.collection.toJSON());
	 var addContactView=new App.Views.AddContact({collection:App.contacts});
	var allContactsView=new App.Views.AllContacts({collection:App.contacts}).render(); 
	$('#tableC').append(allContactsView.el);
	},		
	 
	editContact:function(contact){
		var editView=new App.Views.EditContact({model:contact});
		$('#edit_contact').html(editView.el);

	console.log("jbn");	
	}
 
	 
	 
 });
 
 App.Views.AddContact=Backbone.View.extend({
	 el:'#contact_form',
	 events:{
		 'submit':'addContact'
	 },
	 addContact:function(e){
		 e.preventDefault();
		 
		this.collection.create({first_name:this.$('#first_name').val(),
					last_name:this.$('#last_name').val(),
					email_address:this.$('#email_address').val(),
					description:this.$('#description').val()
					},{wait:true});
		this.clearForm();
		console.log(this.collection);			
	 },
	 clearForm:function()
	 {
				this.$('#first_name').val(''),
					this.$('#last_name').val(''),
					this.$('#email_address').val(''),
					this.$('#description').val('')
		 
	 }
	 
	 
 });
 
 App.Views.AllContacts=Backbone.View.extend({
 tagName:'tbody',
 initialize:function(){
	 this.collection.on('add',this.addOne,this);
		
 },
 render: function(){
	this.collection.each(this.addOne,this);
	return this;
 },
 addOne:function(contact){
	var contactView=new App.Views.Contact({model:contact});
	console.log(contactView.render().el);
  	this.$el.append(contactView.render().el);
 }
 });
 
 App.Views.EditContact=Backbone.View.extend({
 template:_.template(template('t1')), 
	initialize:function(){
		this.render();
	

		},
events:{
'submit form':'submit',
'click button.cancel':'cancel'
},
submit:function(e){
	e.preventDefault();
	this.model.save({
					first_name:this.$('#edit_first_name').val(),
					last_name:this.$('#edit_last_name').val(),
					email_address:this.$('#edit_email_address').val(),
					description:this.$('#edit_description').val()
	},{wait:true});
	this.remove();
	
	
	},
cancel:function(){
	this.remove();
	
	
},	
 render:function(){
 this.$el.html(this.template(this.model.toJSON()));
 return this;
 }
 
 
 
 
 
 
 });
 
 
 
 
 
 
 App.Views.Contact=Backbone.View.extend({
 tagName:'tr',
 initialize:function(){
	 this.model.on('destroy',this.unrender,this);
	 this.model.on('change',this.render,this);	
 },
 events:{
	'click a.delete':'deleteContact', 
		'click a.edit':'editContact' 

	}, 
	editContact:function()
	{
		vent.trigger('contact:edit',this.model);
		//console.log(editView.el);
		},
deleteContact:function(){

			this.model.destroy();


		},

 template:_.template(template('t')), 
	 render:function(){
	this.$el.html(this.template(this.model.toJSON()));
	return this;
	},
unrender:function(){
	this.remove();
}	
 });