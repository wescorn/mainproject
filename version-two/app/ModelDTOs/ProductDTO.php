<?php

namespace App\ModelDTOs;
use Illuminate\Support\Arr;



class ProductDTO extends BaseDTO
{
    public $id;
    public $name;
    public $price;
    public $stock;

    public function __construct($id = null, $name = null, $price = null, $stock = null)
    {
        $this->id = $id;
        $this->name = $name;
        $this->price = $price;
        $this->stock = $stock;
    }


    protected static function MakeFromArray(array $array, array $options = []) : static
    {
        return new \App\ModelDTOs\ProductDTO(Arr::get($array, 'id'), Arr::get($array, 'name'), Arr::get($array, 'price'), Arr::get($array, 'stock'));
    }
}
