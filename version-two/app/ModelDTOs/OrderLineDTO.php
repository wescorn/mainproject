<?php

namespace App\ModelDTOs;
use Illuminate\Support\Arr;

class OrderLineDTO extends BaseDTO
{
    public int $id;
    public int $order_id;
    public int $product_id;
    public int $quantity;
    public $product;

    public function __construct($id = null, $order_id = null, $product_id = null, $quantity = null, $product = null)
    {
        $this->id = $id;
        $this->order_id = $order_id;
        $this->product_id = $product_id;
        $this->quantity = $quantity;
        $this->product = $product;
    }

    protected static function MakeFromArray(array $array, array $options = []) : static
    {
        return new \App\ModelDTOs\OrderLineDTO(Arr::get($array, 'id'), Arr::get($array, 'order_id'), Arr::get($array, 'product_id'), Arr::get($array, 'quantity'), Arr::get($array, 'product'));
    }
}
