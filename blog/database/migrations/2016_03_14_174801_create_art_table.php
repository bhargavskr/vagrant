<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateArtTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
		Schema::create('art', function ($table) {
        $table->increments('id');
			$table->string('first_name',200);
			$table->string('last_name',200);
			$table->string('email_address',200)->unique(); 
			$table->text('description')->nullable();
             $table->timestamps();
		}); 
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
          Schema::drop('art');
    }
}
