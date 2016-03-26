var app=app||{};

app.BookCollectionView=Backbone.View.extend({
	el:'#books',
	
	initialize:function(){
//		this.collection=new app.BooksCollection(books);
		this.render();
	this.listenTo(this.collection,'add',this.addBook)
	this.listenTo(this.collection,'reset',this.render)
	this.listenTo(this.collection,'destroy',function(book){console.log(this.collection);})
	},
	events:{
		'click #add':'submitBook'
	},
	render:function(){
		
	this.collection.each(this.addBook,this);		
		
	return this;
	},
	addBook:function(book){
		var newBookView=new app.BookView({model:book})
		
		this.$el.append(newBookView.render().el);
	},
	submitBook:function(e){
		e.preventDefault();
			console.log('awd');
	
		var formdata={};
		$('#addBook div').children('input').each(function(l,el){
			console.log($(el).val());
			console.log($(el.id));
	       	
if($(el).val()!='')
{
		if(el.id==='coverImage'){
			console.log($(el).val());
		//	if()
		}
		if(el.id==='keywords')
		{
				formdata[el.id]=[];
				_.each($(el).val().split(' '),function(keyword){
				formdata[el.id].push({'keyword':keyword});
				});
		}	
	/*	else if(el.id=='releaseDate')
		{
			formdata[el.id]=$('#releaseDate').datepicker('getDate').getTime();
		}
	*/	else
		{
				formdata[el.id]=$(el).val();
		}
}
		$(el).val('');
		}	);
		
		this.collection.create(new app.BookModel(formdata));
		console.log(this.collection.toJSON());
	}
	
	
	
});