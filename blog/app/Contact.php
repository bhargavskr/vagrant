<?php

namespace Blog;

use Illuminate\Database\Eloquent;
//use Illuminate\Foundation\Auth\User as Authenticatable;
//use Illuminate\Database\Query\Builder as QueryBuilder;
class Contact extends Eloquent
{
	public $table='contacts';
     protected $fillable = [
        'first_name', 'last_name','email_address', 'description',
    ];
}
