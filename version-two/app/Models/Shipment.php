<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shipment extends Model
{
    use HasFactory;

    protected $fillable = [
        'carrier_id',
        'tracking',
        'delivery_address',
        'pickup_address',
        'status'
    ];

    public function carrier()
    {
        return $this->belongsTo(Carrier::class);
    }

    public function orders()
    {
        return $this->belongsToMany(Order::class, 'shipment_order');
    }
}
