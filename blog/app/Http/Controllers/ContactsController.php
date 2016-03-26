<?php

namespace Blog\Http\Controllers;

use Illuminate\Http\Request;

use Blog\Http\Requests;

class ContactsController extends Controller
{
    public function index()
	{
		return Contact::all();
		
	}
	
	public function create()
	{
	}
	
	public function store()
	{
		$input=Input::json();
		Contact::create(array(
		'first_name'=>$input->first_name,
		'last_name'=>$input->last_name,
		'email_address'=>$input->email_address,
		'description'=>$input->description
		));
	}
	public function show($id)
	{
		
		return Contact::find($id) 
	}
		public function update($id)
	{
		
		$contact=Contact::find($id); 
		$input=Input::json();
		$contact->first_name=$input->first_name,
		$contact->last_name=$input->last_name,
		$contact->email_address=$input->email_address,
		$contact->description=$input->description
		$contact->save();
	
	}
	public function destroy($id)
	{
		
		return Contact::find($id)->delete(); 
	}

		
}
