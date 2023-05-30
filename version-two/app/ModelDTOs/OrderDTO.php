<?php

namespace App\ModelDTOs;
use Illuminate\Support\Arr;

class OrderDTO extends BaseDTO
{
    public int $id;
    public string $status;
    public array $order_lines;
    public array $shipments;

    public function __construct($id = null, $status = null, $order_lines = null, $shipments = [])
    {
        $this->id = $id;
        $this->status = $status;
        $this->order_lines = $order_lines;
        $this->shipments = $shipments;
    }

    protected static function MakeFromArray(array $array, array $options = []) : static
    {
        return new \App\ModelDTOs\OrderDTO(Arr::get($array, 'id'), Arr::get($array, 'status'), OrderLineDTO::fromArray(Arr::get($array, 'order_lines')), Arr::get($array, 'shipments', []));
    }



}
