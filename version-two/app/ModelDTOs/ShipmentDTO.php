<?php

namespace App\ModelDTOs;
use Illuminate\Support\Arr;



class ShipmentDTO extends BaseDTO
{
    public int $id;
    public int $carrier_id;
    public string $delivery_address;
    public string $pickup_address;
    public string $status;
    public array $order_ids;
    public array $orders;

    public function __construct($id = null, $carrier_id = null, $delivery_address = null, $pickup_address = null, $status = null, $order_ids = [], $orders = null, $carrier = null)
    {
        $this->id = $id;
        $this->carrier_id = $carrier_id;
        $this->delivery_address = $delivery_address;
        $this->pickup_address = $pickup_address;
        $this->status = $status;
        $this->order_ids = $order_ids;
        $this->orders = $orders;
        $this->carrier = $carrier;
    }


    protected static function MakeFromArray(array $array, array $options = []) : static
    {
        return new \App\ModelDTOs\ShipmentDTO(Arr::get($array, 'id'), Arr::get($array, 'carrier_id'), Arr::get($array, 'delivery_address'), Arr::get($array, 'pickup_address'), Arr::get($array, 'status'), Arr::get($array, 'order_ids', []), Arr::get($array, 'orders'), Arr::get($array, 'carrier'));
    }
}
