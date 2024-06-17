<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Archive;

class ArchiveFactory extends Factory
{
    protected $model = Archive::class;

    public function definition()
    {
        return [
            'file_name' => $this->faker->word . '.csv',
            'size' => $this->faker->numberBetween(1000, 2000),
            'charges_count' => 0,
            'amount_total' => 0.0,
        ];
    }
}
