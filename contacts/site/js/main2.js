
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
	 window.vent=_.extend({},Backbone.Events);

})();

