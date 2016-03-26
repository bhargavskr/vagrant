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
mongoose.connect( 'mongodb://localhost/contacts_database' );
//Schemas
var Contact = new mongoose.Schema({
first_name: String,
last_name: String,
email_address:String,
description:String
});
//Models
var ContactModel = mongoose.model( 'Contact', Contact );
//Get
app.get( '/api/contacts', function( request, response ) {
return ContactModel.find( function( err, contacts ) {
if( !err ) {
return response.send( contacts );
} else {
return console.log( err );
}
});
});
//Post
app.post( '/api/contacts', function( request, response ) {
var contact = new ContactModel({
first_name: request.body.first_name,
last_name: request.body.last_name,
email_address: request.body.email_address,
description: request.body.description

});
contact.save( function( err ) {
if( !err ) {
return console.log( 'created' );
} else {
return console.log( err );
}
});
return response.send( contact );
});

//Get a single Contact by id
app.get( '/api/contacts/:id', function( request, response ) {
return ContactModel.findById( request.params.id, function( err, contact ) {
if( !err ) {
return response.send( contact );
} else {
return console.log( err );
}
});
});

//Update a contact
app.put( '/api/contacts/:id', function( request, response ) {
console.log( 'Updating contact ' + request.body.first_name );
return ContactModel.findById( request.params.id, function( err, contact ) {
contact.first_name = request.body.first_name;
contact.last_name = request.body.last_name;
contact.email_address = request.body.email_address;
contact.description = request.body.description;
return contact.save( function( err ) {
if( !err ) {
console.log( 'contact updated' );
} else {
console.log( err );
}
return response.send( contact );
});
});
});


//Delete a book
app.delete( '/api/contacts/:_id', function( request, response ) {
console.log( 'Deleting Contact with id: ' + request.params._id );
return ContactModel.findBy_Id( request.params.id, function( err, contact ) {
return contact.remove( function( err ) {
	if( !err ) {
console.log( 'Contact removed' );
return response.send( '' );
} else {
console.log( err );
}
});
});
});
