<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Service>
 */
class ServiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'title'=>$this->faker->sentence(),
            'device'=>$this->faker->randomElement(['PS4 FAT','PS4 SLIM','PS4 PRO','PS5','XBOX', 'XBOX X']),
            'description'=>$this->faker->paragraph(),
            'prise'=>$this->faker->randomElement(['300.25','60.00','100.10']),
            'waranty'=>$this->faker->randomElement(['3','6']),
            'foto'=>$this->faker->image('public/storage/images',640,480, null, false),

        ];
    }
}
