<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Charge;
use App\Models\Archive;
use Carbon\Carbon;

class ChargeFactory extends Factory
{
    protected $model = Charge::class;

    public function definition()
    {
        return [
            'id_file' => Archive::factory(),
            'user_name' => $this->faker->name,
            'government_id' => $this->faker->numerify('##########'),
            'email' => $this->faker->email,
            'amount' => $this->faker->randomFloat(2, 10, 1000),
            'due_date' => $this->faker->date(),
            'debt_id' => $this->faker->numerify('###'),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
