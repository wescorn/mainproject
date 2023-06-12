<?php

namespace App\Http\Controllers;

use App\Models\Carrier;
use App\Models\Order;
use App\Models\OrderLine;
use App\Models\Product;
use App\Models\Shipment;
use DB;
use Illuminate\Http\Request;

class DevController extends Controller
{
    public function test(){
        //DB::enableQueryLog();
        //return $this->RunDBExample('just_wild_stuff');

        //DB::enableQueryLog();
        //$orders = Order::with(['orderLines.product', 'shipments.carrier'])->get();
        //return $this->convert_to_sql(DB::getQueryLog());

        Carrier::firstOrCreate(['name' => 'DHL']);
        $products = $this->generate_products();
        $shipments = [];
        for ($i=0; $i < 2000; $i++) { 
            array_push($shipments, $this->generate_orders_and_shipments($products));
        }
        
        return count($shipments);
        
        
    }
    public function convert_to_sql($queries) {
        $sqlScript = '';
        foreach ($queries as $query) {
            $sql = $query['query'];
            $bindings = $query['bindings'];
    
            // Replace bindings in the SQL query
            foreach ($bindings as $binding) {
                $value = is_numeric($binding) ? $binding : "'" . addslashes($binding) . "'";
                $sql = preg_replace('/\?/', $value, $sql, 1);
            }
    
            $sqlScript .= $sql . ";";
        }
    
        // Output the SQL script
        return $sqlScript;
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
        $randomZipCode = str_pad(rand(0, 9999), 4, '0', STR_PAD_LEFT);
        $order_ids = collect($orders)->pluck('id');
        $randomInitialAddress = $randomStreetNames[rand(0, 24)] . ' ' . rand(1, 100) . ', ' . $randomCities[rand(0, 20)] . ' ' . $randomZipCode;
        $randomDeliveryAddress = $randomStreetNames[rand(0, 24)] . ' ' . rand(1, 100) . ', ' . $randomCities[rand(0, 20)] . ' ' . $randomZipCode;

        $pickupPoint1 = $randomDeliveryAddress;
        $deliveryPoint1 = $randomStreetNames[rand(0, 24)] . ' ' . rand(1, 100) . ', ' . $randomCities[rand(0, 20)] . ' ' . $randomZipCode;

        $pickupPoint2 = $deliveryPoint1;
        $deliveryPoint2 = $randomStreetNames[rand(0, 24)] . ' ' . rand(1, 100) . ', ' . $randomCities[rand(0, 20)] . ' ' . $randomZipCode;

        $shipment1 = Shipment::Create([
            'carrier_id' => 1,
            'status' => 'CREATED',
            'delivery_address' => $randomDeliveryAddress,
            'pickup_address' => $randomInitialAddress,
            'tracking' => bin2hex(random_bytes(8))
        ])->orders()->attach($order_ids);

        $shipment2 = Shipment::Create([
            'carrier_id' => 1,
            'status' => 'CREATED',
            'delivery_address' => $deliveryPoint1,
            'pickup_address' => $pickupPoint1,
            'tracking' => bin2hex(random_bytes(8))
        ])->orders()->attach($order_ids);

        $shipment3 = Shipment::Create([
            'carrier_id' => 1,
            'status' => 'CREATED',
            'delivery_address' => $deliveryPoint2,
            'pickup_address' => $pickupPoint2,
            'tracking' => bin2hex(random_bytes(8))
        ])->orders()->attach($order_ids);


        return [$shipment1, $shipment2, $shipment3];
    }

    public function generate_products() {
        return [
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
    }


    public function RunDBExample($name, $options = []) {
        DB::enableQueryLog();
        switch ($name) {
            case 'orders_with_specific_product_name_using_join':
                $query = Order::join('order_lines', 'orders.id', '=', 'order_lines.order_id')
                ->join('products', 'order_lines.product_id', '=', 'products.id')
                ->where('products.name', 'like', '%Saw%')->with('orderLines.product', 'shipments.carrier')->take(2);

                $toSql = $query->toSql();
                $res = $query->get();
                $actualSql = $this->convert_to_sql(DB::getQueryLog());
                return [
                    $toSql,
                    $actualSql,
                    $res
                ];
            case 'Shipments_with_2_to_6_orders_etc':
                $query = Shipment::select('shipments.*')
                ->join('shipment_order', 'shipments.id', '=', 'shipment_order.shipment_id')
                ->join('orders', 'shipment_order.order_id', '=', 'orders.id')
                ->whereIn('orders.id', function ($subquery) {
                    $subquery->select('order_lines.order_id')
                        ->from('order_lines')
                        ->whereIn('order_lines.product_id', function ($subsubquery) {
                            $subsubquery->select('products.id')
                                ->from('products')
                                ->where('products.price', '>', 20)
                                ->where('products.price', '<', 50)
                                ->whereNotBetween('products.price', [25, 30]);
                        })
                        ->where('order_lines.quantity', '>=', 5)
                        ->groupBy('order_lines.order_id')
                        ->havingRaw('COUNT(*) BETWEEN 2 AND 4');
                })
                ->groupBy('shipments.id')
                ->havingRaw('COUNT(*) BETWEEN 2 AND 6');
            
                
                

                $toSql = $query->toSql();
                $res = $query->get();
                $actualSql = $this->convert_to_sql(DB::getQueryLog());
                return [
                    $toSql,
                    $actualSql,
                    $res
                ];
            case 'shipments_wherehas_ineffecient':
                $query = Shipment::whereHas('orders.orderLines.product', function ($query) {
                    $query->where('name', 'LIKE', '%specific product%');
                });
                $toSql = $query->toSql();
                $res = $query->get();
                $query_log = DB::getQueryLog();
                $actualSql = $this->convert_to_sql($query_log);
                return [
                    $toSql,
                    $actualSql,
                    $res,
                    $query_log
                ];

            case 'just_wild_stuff':
                $query = Shipment::select('shipments.*')
                ->join('shipment_order', 'shipments.id', '=', 'shipment_order.shipment_id')
                ->join('orders', 'shipment_order.order_id', '=', 'orders.id')
                ->join('shipment_order AS so1', 'orders.id', '=', 'so1.order_id')
                ->join('shipment_order AS so2', 'orders.id', '=', 'so2.order_id')
                ->join('shipments AS s1', function ($join) {
                    $join->on('s1.id', '=', 'so1.shipment_id')
                        ->whereColumn('s1.pickup_address', '!=', 'shipments.pickup_address')
                        ->whereColumn('s1.delivery_address', '!=', 'shipments.pickup_address');
                })
                ->join('shipments AS s2', function ($join) {
                    $join->on('s2.id', '=', 'so2.shipment_id')
                        ->whereColumn('s2.pickup_address', '=', 's1.delivery_address');
                })
                ->join('shipments AS s3', function ($join) {
                    $join->on('s3.id', '=', 'so2.shipment_id')
                        ->whereColumn('s3.pickup_address', '!=', 's2.delivery_address')
                        ->whereColumn('s3.delivery_address', '!=', 's2.delivery_address');
                })
                ->groupBy('shipments.id')
                ->havingRaw('COUNT(DISTINCT orders.id) >= 1');

                $toSql = $query->toSql();
                $res = $query->get();
                $query_log = DB::getQueryLog();
                $actualSql = $this->convert_to_sql($query_log);
                return [
                    $toSql,
                    $actualSql,
                    $res,
                    $query_log
                ];
            default:
                # code...
                break;
        }
    }
}
