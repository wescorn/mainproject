<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Order;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OrderLine>
 */
class OrderLineFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            // Define any attributes you want to set for the OrderLine model here
            // For example:
            'id' => $this->faker->unique()->randomNumber(),
            'order_id' => Order::factory()->make(),
            'product_id' => $this->faker->randomNumber(),
            'quantity' => $this->faker->randomNumber(),
        ];
    }
}
