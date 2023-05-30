<?php

namespace App\Http\Controllers;

use App\Models\Carrier;
use App\Models\Order;
use App\Models\OrderLine;
use App\Models\Product;
use App\Models\Shipment;
use Illuminate\Http\Request;

class DevController extends Controller
{
    public function test(){
        Carrier::firstOrCreate(['name' => 'DHL']);


        $products = [
            Product::firstOrCreate(['name' => 'Saw', 'price' => 100, 'stock' => 20]),
            Product::firstOrCreate(['name' => 'Duct Tape', 'price' => 60, 'stock' => 15]),
            Product::firstOrCreate(['name' => 'Bags', 'price' => 10, 'stock' => 44]),
            Product::firstOrCreate(['name' => 'Hammer', 'price' => 120, 'stock' => 6]),
            Product::firstOrCreate(['name' => 'Wrench', 'price' => 80, 'stock' => 12]),
            Product::firstOrCreate(['name' => 'Screwdriver Set', 'price' => 40, 'stock' => 25]),
            Product::firstOrCreate(['name' => 'Paint Brush', 'price' => 15, 'stock' => 30]),
            Product::firstOrCreate(['name' => 'Measuring Tape', 'price' => 20, 'stock' => 18]),
            Product::firstOrCreate(['name' => 'Drill', 'price' => 200, 'stock' => 8]),
            Product::firstOrCreate(['name' => 'Nails', 'price' => 5, 'stock' => 100]),
            Product::firstOrCreate(['name' => 'Screw Assortment', 'price' => 12, 'stock' => 50]),
            Product::firstOrCreate(['name' => 'Power Drill', 'price' => 150, 'stock' => 10]),
            Product::firstOrCreate(['name' => 'Safety Goggles', 'price' => 25, 'stock' => 30]),
            Product::firstOrCreate(['name' => 'Sanding Block', 'price' => 8, 'stock' => 50]),
            Product::firstOrCreate(['name' => 'Cordless Screwdriver', 'price' => 75, 'stock' => 15]),
            Product::firstOrCreate(['name' => 'Paint Roller', 'price' => 12, 'stock' => 40]),
            Product::firstOrCreate(['name' => 'Extension Cord', 'price' => 20, 'stock' => 20]),
            Product::firstOrCreate(['name' => 'Carpenter Pencil', 'price' => 2, 'stock' => 100]),
            Product::firstOrCreate(['name' => 'Tape Measure', 'price' => 15, 'stock' => 35]),
            Product::firstOrCreate(['name' => 'Plastic Storage Bin', 'price' => 18, 'stock' => 22]),
            Product::firstOrCreate(['name' => 'Caulking Gun', 'price' => 30, 'stock' => 12]),
            Product::firstOrCreate(['name' => 'Screw Assortment Kit', 'price' => 20, 'stock' => 25]),
            Product::firstOrCreate(['name' => 'Paint Brushes Set', 'price' => 15, 'stock' => 18]),
            Product::firstOrCreate(['name' => 'Hacksaw', 'price' => 40, 'stock' => 8]),
            Product::firstOrCreate(['name' => 'Work Gloves', 'price' => 10, 'stock' => 30]),
            Product::firstOrCreate(['name' => 'Level Tool', 'price' => 25, 'stock' => 20]),
            Product::firstOrCreate(['name' => 'Tile Cutter', 'price' => 80, 'stock' => 5]),
            Product::firstOrCreate(['name' => 'Paint Roller Tray', 'price' => 10, 'stock' => 25]),
            Product::firstOrCreate(['name' => 'Sanding Discs Pack', 'price' => 8, 'stock' => 40]),
            Product::firstOrCreate(['name' => 'Wire Cutters', 'price' => 15, 'stock' => 15]),
            Product::firstOrCreate(['name' => 'Drill Set', 'price' => 80, 'stock' => 10]),
            Product::firstOrCreate(['name' => 'Carpenter Pencil', 'price' => 2, 'stock' => 100]),
            Product::firstOrCreate(['name' => 'Tape Measure', 'price' => 15, 'stock' => 20]),
            Product::firstOrCreate(['name' => 'Nail Assortment', 'price' => 5, 'stock' => 50]),
            Product::firstOrCreate(['name' => 'Utility Knife', 'price' => 12, 'stock' => 15]),
            Product::firstOrCreate(['name' => 'Sanding Block', 'price' => 6, 'stock' => 30]),
            Product::firstOrCreate(['name' => 'Safety Glasses', 'price' => 8, 'stock' => 25]),
            Product::firstOrCreate(['name' => 'Measuring Tape', 'price' => 10, 'stock' => 20]),
            Product::firstOrCreate(['name' => 'Screwdriver Set', 'price' => 25, 'stock' => 10]),
            Product::firstOrCreate(['name' => 'Claw Hammer', 'price' => 15, 'stock' => 8]),
            Product::firstOrCreate(['name' => 'Paintbrush Set', 'price' => 18, 'stock' => 12]),
            Product::firstOrCreate(['name' => 'Screw Assortment', 'price' => 7, 'stock' => 30]),
            Product::firstOrCreate(['name' => 'Cordless Drill', 'price' => 120, 'stock' => 5]),
            Product::firstOrCreate(['name' => 'Gloves', 'price' => 6, 'stock' => 20]),
            Product::firstOrCreate(['name' => 'Level', 'price' => 14, 'stock' => 15]),
            Product::firstOrCreate(['name' => 'Caulk Gun', 'price' => 8, 'stock' => 25]),
            Product::firstOrCreate(['name' => 'Paint Roller', 'price' => 5, 'stock' => 50]),
            Product::firstOrCreate(['name' => 'Hacksaw', 'price' => 15, 'stock' => 10]),
            Product::firstOrCreate(['name' => 'Chisel Set', 'price' => 25, 'stock' => 8]),
            Product::firstOrCreate(['name' => 'Wire Cutter', 'price' => 12, 'stock' => 15]),
            Product::firstOrCreate(['name' => 'Angle Grinder', 'price' => 80, 'stock' => 10]),
            Product::firstOrCreate(['name' => 'Sanding Discs', 'price' => 6, 'stock' => 30]),
            Product::firstOrCreate(['name' => 'Safety Helmet', 'price' => 10, 'stock' => 20]),
            Product::firstOrCreate(['name' => 'Pliers Set', 'price' => 25, 'stock' => 10]),
            Product::firstOrCreate(['name' => 'Sledgehammer', 'price' => 30, 'stock' => 5]),
            Product::firstOrCreate(['name' => 'Toolbox', 'price' => 20, 'stock' => 15]),
            Product::firstOrCreate(['name' => 'Cordless Screwdriver', 'price' => 50, 'stock' => 8]),
            Product::firstOrCreate(['name' => 'Step Ladder', 'price' => 40, 'stock' => 5]),
            Product::firstOrCreate(['name' => 'Trowel', 'price' => 8, 'stock' => 20]),
            Product::firstOrCreate(['name' => 'Staple Gun', 'price' => 15, 'stock' => 12])
        ];


        $shipments = [];
        for ($i=0; $i < 100; $i++) { 
            array_push($shipments, $this->generate_orders_and_shipments($products));
        }
        
        return $shipments;
        
        
    }

    public function generate_orders_and_shipments($products) {
        $randomOrdersCount = rand(1, 10);
        $randomOrderLinesCount = rand(1, 10);

        $orders = [];
        for ($i = 1; $i <= $randomOrdersCount; $i++) {
            $order = Order::create(['status' => 'CREATED']);
            $orders[] = $order;
        
            for ($j = 1; $j <= $randomOrderLinesCount; $j++) {
                $randomProduct = $products[rand(0, count($products)-1)];
                OrderLine::firstOrCreate([
                    'order_id' => $order->id,
                    'product_id' => $randomProduct->id,
                    'quantity' => rand(1, 10),
                ]);
            }
        }

        $randomStreetNames = ['Main Street', 'Oak Avenue', 'Maple Lane', 'Cedar Road', 'Pine Street', 'Elm Street', 'Willow Lane', 'Cedar Avenue', 'Maple Court', 'Pine Drive', 'Oak Terrace', 'Birch Road', 'Chestnut Lane', 'Spruce Avenue', 'Walnut Street', 'Poplar Circle', 'Hawthorn Lane', 'Juniper Court', 'Magnolia Drive', 'Sycamore Lane', 'Ash Street', 'Cypress Road', 'Alder Avenue', 'Beech Court', 'Fir Lane'];
        $randomCities = ['New York', 'Los Angeles', 'London', 'Paris', 'Tokyo', 'San Francisco', 'Sydney', 'Amsterdam', 'Toronto', 'Berlin', 'Barcelona', 'Rome', 'Cape Town', 'Rio de Janeiro', 'Buenos Aires', 'Moscow', 'Dubai', 'Singapore', 'Mumbai', 'New Delhi', 'Vancouver', 'New Orleans'];
        $randomTracking = bin2hex(random_bytes(8));
        $randomZipCode = str_pad(rand(0, 9999), 4, '0', STR_PAD_LEFT);

        $shipment = Shipment::firstOrCreate([
            'carrier_id' => 1,
            'status' => 'CREATED',
            'delivery_address' => $randomStreetNames[rand(0, 24)] . ' ' . rand(1, 100) . ', ' . $randomCities[rand(0, 20)] . ' ' . $randomZipCode,
            'pickup_address' => $randomStreetNames[rand(0, 24)] . ' ' . rand(1, 100) . ', ' . $randomCities[rand(0, 20)] . ' ' . $randomZipCode,
            'tracking' => $randomTracking,
        ]);


        $shipment->orders()->attach(collect($orders)->pluck('id'));
        return $shipment;
    }
}
