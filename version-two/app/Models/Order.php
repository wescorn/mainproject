<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;

class Order extends Model
{
    use HasFactory;

     /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id',
    ];

    public static function fromArray($array) {
        if($array !== null) {
            if(array_is_list($array)) {
                collect($array)->map(function ($order) {
                    return Order::MakeFromArray($order);
                })->toArray();
            } else {
                return Order::MakeFromArray($array);
            }
        }
        return $array;
    }
    
    private static function MakeFromArray($array) {
        $order = new Order(["id" => Arr::get($array, 'id')]);
        $lines = [];
        foreach (Arr::get($array, 'orderLines', []) as $index => $line) {
            $mLine = new OrderLine(["order_id" => Arr::get($array, 'id', 1), ...$line]);
            array_push($lines, $mLine);
        }
        $order->orderLines = $lines;
        return $order;
    }

    public function orderLines(){
        return $this->hasMany(OrderLine::class);
    }
}
