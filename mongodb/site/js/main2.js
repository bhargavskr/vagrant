
(function(){
	window.App={
		Models:{},
		Views:{},
		Collections:{},
		Router:{}
	};
window.template=function(id){
	return $('#'+id).html();
};
var vents=_.extend({},Backbone.Events);
console.log(vents);
App.Router=Backbone.Router.extend({
		routes:{
			'':'index',	
			'appointment/:id': 'showAppointment'
		},
		index:function(){
			console.log("Logged ");
		},
		showAppointment:function(id){
			console.log(id);
		}
});

new App.Router();
Backbone.history.start();
})();

