
var app=app||{};
var ENTER_KEY=13;
$(function(){
	console.log("dasda");
	new app.AppView();
	
//var todo=new app.Todo();
//todo.set('title','My First Task');
//var todo1=new app.Todo({'title':'ssd'});
//var todo2=new app.Todo({'title':'dasas'});
//var todo3=new app.Todo({'title':'adsasd'});
//app.todos.add([{'title':'sss'},{'title':'as'},{'title':'ssss'}]);
console.log(app.todos);
/*_.each([todo1,todo2,todo3],function(todo){
	var todoView=new app.TodoView({model:todo});
$('#todo-list').append(todoView.render().el);
});
app.todos.each(function(todo){
	var todoView=new app.TodoView({model:todo});
$('#todo-list').append(todoView.render().el);});
*/

});