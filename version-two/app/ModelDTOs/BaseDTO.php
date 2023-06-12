<?php

namespace App\ModelDTOs;
use InvalidArgumentException;

abstract class BaseDTO
{
    /**
     * Create one or multiple instances of this class from an associative array, or an array of associative arrays.
     *
     * @param array $array
     * @return static[]|static
     */
    public static function fromArray($array, $options = []) : static|array
    {
        if($array !== null) {
            if(array_is_list($array)) {
                return array_map(function($arr) use($options) {
                    return static::MakeFromArray($arr, $options);
                }, $array);
            } else {
                return static::MakeFromArray($array, $options);
            }
        }
        throw new InvalidArgumentException('input $array cannot be null');
    }

    /**
     * Create an instance of this class from an array.
     *
     * @param array $array
     * @param array $options
     * @return static
     */
    abstract protected static function MakeFromArray(array $array, array $options = []) : static;
}