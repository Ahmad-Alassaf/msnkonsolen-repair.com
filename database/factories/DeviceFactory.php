<?php

namespace Database\Factories;

use App\Models\Platform;
use App\Models\Service;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Device>
 */
class DeviceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [           
            'platform_id'=>Platform::all()->random()->id,
            'title'=>$this->faker->randomElement(['PS4 FAT','PS4 SLIM','PS4 PRO',
                                                    'XBOX ONE FAT','XBOX ONE SLIM','XBOX ONE X',
                                                     'Nintendow Switch ','Nintendow Switch Lite']),
        ];
    }
}
