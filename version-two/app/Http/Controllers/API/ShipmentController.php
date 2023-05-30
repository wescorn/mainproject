<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\ModelDTOs\ShipmentDTO;
use App\Models\Order;
use App\Models\OrderLine;
use App\Models\Shipment;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Http;
use Log;

class ShipmentController extends Controller
{

    private $endpoint;

    public function __construct() {
        $this->endpoint = config('app.apigateway')."/shipments/shipments";
    }

    /**
     * Display a listing of the resource.
     *
     * @return array<\App\ModelDTOs\ShipmentDTO>
     */
    public function index()
    {
        Log::channel('seq')->info("Requesting All Shipments (Laravel) from {$this->endpoint}");
        $response = guzzle()->get($this->endpoint);
        $shipments = ShipmentDTO::fromArray(json_decode($response->getBody(), true));
        return $shipments;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $response = guzzle()->post($this->endpoint, $request->body());
        //dd($response->getBody());
        return $response->getBody();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        Log::channel('seq')->debug("works in laravel...!");
        $response = Http::get($this->endpoint."/{$id}");
        $orders = Shipment::fromArray(json_decode($response->body(), true));
        return response()->json($orders);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'customer_name' => 'required|string',
            'total_amount' => 'required|numeric',
        ]);

        $order = Order::findOrFail($id);
        $order->update($data);
        return response()->json($order);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $order = Order::findOrFail($id);
        $order->delete();
        return response()->json(null, 204);
    }
}

