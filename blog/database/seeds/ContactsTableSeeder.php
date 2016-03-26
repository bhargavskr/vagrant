<?php

use Illuminate\Database\Seeder;

class ContactsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
			 DB::table('contacts')->insert([
            'first_name' => str_random(10),
			'last_name'=>str_random(10),
            'email_address' => str_random(10).'@gmail.com',
            'description'=>str_random(30),
			]);
			factory(Blog\Contact::class, 50)->create()->each(function($u) {
        $u->posts()->save(factory(Blog\Posts::class)->make());
    });
    }
}
