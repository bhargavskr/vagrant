var application_root = __dirname,
express = require( 'express' ), //Web framework
path = require( 'path' ), //Utilities for dealing with file paths
mongoose = require( 'mongoose' ); //MongoDB integration
//Create server
var app = express();
// Configure server
app.configure( function() {
//parses request body and populates request.body
app.use( express.bodyParser() );
//checks request.body for HTTP method overrides
app.use( express.methodOverride() );
//perform route lookup based on URL and HTTP method
app.use( app.router );
//Where to serve static content
app.use( express.static( path.join( application_root, 'site') ) );
//Show all errors in development
app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));
});
//Start server
var port = 4711;
app.listen( port, function() {
console.log( 'Express server listening on port %d in %s mode',
port, app.settings.env );
});
app.get( '/api', function( request, response ) {
response.send( 'Library API is running' );
});
mongoose.connect( 'mongodb://localhost/tasks_database' );
//Schemas
var Task = new mongoose.Schema({
title: String,
priority: Number
});
//Models
var TaskModel = mongoose.model( 'Task', Task );
//Get
app.get( '/api/tasks', function( request, response ) {
return TaskModel.find( function( err, tasks ) {
if( !err ) {
return response.send( tasks );
} else {
return console.log( err );
}
});
});
//Post
app.post( '/api/tasks', function( request, response ) {
var task = new TaskModel({
title: request.body.title,
priority: request.body.priority
});
task.save( function( err ) {
if( !err ) {
return console.log( 'created' );
} else {
return console.log( err );
}
});
return response.send( task );
});

//Get a single book by id
app.get( '/api/tasks/:id', function( request, response ) {
return TaskModel.findById( request.params.id, function( err, task ) {
if( !err ) {
return response.send( task );
} else {
return console.log( err );
}
});
});

//Update a task
app.put( '/api/tasks/:id', function( request, response ) {
console.log( 'Updating task ' + request.body.title );
return TaskModel.findById( request.params.id, function( err, task ) {
task.title = request.body.title;
task.priority = request.body.priority;
return task.save( function( err ) {
if( !err ) {
console.log( 'task updated' );
} else {
console.log( err );
}
return response.send( task );
});
});
});


//Delete a book
app.delete( '/api/tasks/:id', function( request, response ) {
console.log( 'Deleting Task with id: ' + request.params.id );
return TaskModel.findById( request.params.id, function( err, task ) {
return task.remove( function( err ) {
	if( !err ) {
console.log( 'Task removed' );
return response.send( '' );
} else {
console.log( err );
}
});
});
});
